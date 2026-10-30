import { env } from 'cloudflare:workers';
import { z } from 'zod';
import { AI_PROMPTS } from '@/config/ai-prompts';
import { allowedTasks, nextTask, ROUTES, DEFAULT_PREFERENCES } from '@/lib/exploration';
export const dynamic = 'force-dynamic';
export async function GET() { return Response.json({configured:Boolean(env.LLM_API_KEY)}, {headers:{'Cache-Control':'no-store'}}); }
const requestSchema = z.object({ kind: z.enum(['parse', 'guide', 'observe', 'recap']), text: z.string().max(4000).default(''), routeId: z.string().optional(), placeId: z.string().optional(), currentTaskId: z.string().optional(), consent: z.literal(true), minutes: z.number().min(5).max(120).optional(), mode: z.enum(['wander', 'notice', 'quest']).optional(), interests: z.array(z.enum(['植物', '建筑', '街巷', '摄影'])).max(4).optional(), endedEarly: z.boolean().optional() });
type Input = z.infer<typeof requestSchema>;
function fallback(input: Input) {
  if (input.kind === 'parse') {
    const n = input.text.match(/(\d+)\s*(?:分钟|分)/)?.[1];
    return { minutes: n ? Math.max(5, Math.min(120, Number(n))) : input.minutes || 30, mode: /安静|独处|随便/.test(input.text) ? 'wander' : /挑战|探索/.test(input.text) ? 'quest' : input.mode || 'notice', interests: input.interests || DEFAULT_PREFERENCES.interests, reply: '已整理为以下选项，请确认或修改。' };
  }
  if (input.kind === 'observe') return { reply: '可以继续参考下方提示观察，也可以跳过这个任务。', taskId: nextTask(input.placeId || 'southgate', input.text, input.currentTaskId)?.id };
  if (input.kind === 'recap') return { text: `${input.endedEarly ? '本次探索提前结束。' : ''}${input.text ? `本次笔记：${input.text.slice(0, 150)}` : '本次未填写观察笔记。'}` };
  return { reply: '可以按路线顺序查看地点，记录感兴趣的景物或街道细节。每个观察任务都可以跳过。' };
}
export async function POST(request: Request) {
  const reply = (data: unknown, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return reply({ error: '请求来源不匹配' }, 403);
  const raw = await request.text();
  if (raw.length > 10000) return reply({ error: '内容过长。' }, 413);
  let input: Input;
  try { input = requestSchema.parse(JSON.parse(raw)); } catch { return reply({ error: '请求格式不正确。' }, 400); }
  const route = ROUTES.find(r => r.id === input.routeId);
  if (input.kind !== 'parse' && !route) return reply({ error: '路线不存在。' }, 400);
  if (input.kind === 'observe' && (!input.placeId || !route?.places.includes(input.placeId))) return reply({ error: '地点不属于本路线。' }, 400);
  const fixed = (reason: string) => reply({ ...fallback(input), source: 'fallback', reason, promptVersion: AI_PROMPTS.version });
  if (!env.LLM_API_KEY) return fixed('AI 服务尚未启用，已使用预设内容。');
  if (!env.DB) return fixed('AI 服务暂不可用，已使用预设内容。');
  try {
    const day = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    const limit = Math.max(1, Math.min(200, Number(env.LLM_DAILY_LIMIT) || 30));
    const usage = await env.DB.prepare('INSERT INTO ai_usage (user_id, day, count) VALUES (?, ?, 1) ON CONFLICT(user_id, day) DO UPDATE SET count=count+1 WHERE count < ? RETURNING count').bind('site-wide-guest-budget', day, limit).first();
    if (!usage) return fixed('网站今天的 AI 使用次数已达上限，仍可使用预设内容。');
    const context = { text: input.text, defaults: { minutes: input.minutes || 30, mode: input.mode || 'notice', interests: input.interests || DEFAULT_PREFERENCES.interests }, route: route ? { title: route.title, verified: route.verified, directions:route.directions, conditions:route.conditions } : null, allowedTasks: input.placeId ? allowedTasks(input.placeId) : [], currentTaskId: input.currentTaskId, endedEarly: input.endedEarly };
    const base = (env.LLM_BASE_URL || 'https://api.deepseek.com').replace(/\/$/, '');
    const url = new URL(`${base}/chat/completions`);
    if (url.protocol !== 'https:') return fixed('AI 服务配置有误，已使用预设内容。');
    const response = await fetch(url, { method: 'POST', signal: AbortSignal.timeout(18000), headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.LLM_API_KEY}` }, body: JSON.stringify({ model: env.LLM_MODEL || 'deepseek-flash', messages: [{ role: 'system', content: `${AI_PROMPTS.common}\n${AI_PROMPTS[input.kind]}` }, { role: 'user', content: JSON.stringify(context) }], thinking: { type: 'disabled' }, response_format: { type: 'json_object' }, max_tokens: 1000, stream: false }) });
    if (!response.ok) return fixed(response.status === 401 ? 'AI 服务连接失败，已使用预设内容。' : response.status === 402 ? 'AI 服务额度不足，已使用预设内容。' : 'AI 服务暂时繁忙，已使用预设内容。');
    const payload = await response.json() as { choices?: { finish_reason?: string; message?: { content?: string } }[] };
    const choice = payload.choices?.[0];
    if (!choice?.message?.content || choice.finish_reason !== 'stop') return fixed('AI 未返回完整内容，已使用预设内容。');
    const result = JSON.parse(choice.message.content);
    let checked: unknown;
    if (input.kind === 'parse') checked = z.object({ minutes: z.number().int().min(5).max(120), mode: z.enum(['wander', 'notice', 'quest']), interests: z.array(z.enum(['植物', '建筑', '街巷', '摄影'])).max(4), reply: z.string().max(200) }).parse(result);
    else if (input.kind === 'observe') checked = z.object({ reply: z.string().min(1).max(300), taskId: z.string().refine(id => allowedTasks(input.placeId!).some(t => t.id === id)) }).parse(result);
    else if (input.kind === 'recap') checked = z.object({ text: z.string().min(1).max(240) }).parse(result);
    else checked = z.object({ reply: z.string().min(1).max(300) }).parse(result);
    return reply({ ...(checked as Record<string, unknown>), source: 'ai', promptVersion: AI_PROMPTS.version });
  } catch { return fixed('AI 暂未返回可用结果，已使用预设内容。'); }
}
