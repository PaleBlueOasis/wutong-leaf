import { PLACES } from './places.ts';
export { PLACES, SOURCES, TRANSIT } from './places.ts';
export type Mode = 'wander' | 'notice' | 'quest';
export type Preferences = { minutes: number; mode: Mode; interests: string[]; aiEnabled: boolean; favorites: string[] };
export type Journey = {
  id: string; routeId: string; routeVersion: number; mode: Mode;
  status: 'active' | 'paused' | 'completed' | 'ended'; nodeIndex: number;
  visited: string[]; notes: Record<string, string>; taskIds: Record<string, string>;
  startedAt: string; updatedAt: string; finishedAt: string | null;
  cardText: string; demo: true; revision: number;
};
export type Route = { id: string; title: string; subtitle: string; duration: number; distance: string; tags: string[]; places: string[]; image: string; color: string; version: number; verified: boolean; scene: string; directions: string; exit: string; conditions: string };
export const DEFAULT_PREFERENCES: Preferences = { minutes: 30, mode: 'notice', interests: ['植物', '街巷'], aiEnabled: false, favorites: [] };
export const MODES: { id: Mode; title: string; short: string; description: string; mark: string }[] = [
  { id: 'wander', title: '随便走走', short: '自由散步', description: '不显示观察任务，可随时记笔记', mark: '01' },
  { id: 'notice', title: '留意身边的细节', short: '观察周边', description: '参考提示，观察周围的景物', mark: '02' },
  { id: 'quest', title: '沿路线探索', short: '沿线探索', description: '按路线顺序，查看各地点的提示', mark: '03' },
];
export const ROUTES: Route[] = [
  { id:'shade',title:'四牌楼周边散步',subtitle:'从校区南门周边走到成贤街北段',duration:30,distance:'约 1–1.5 km',tags:['植物','街巷'],places:['southgate','chengxian','alley'],image:'/illustrations/route-shade.svg',color:'green',version:1,verified:false,scene:'校园周边',directions:'从四牌楼校区南门外的公共街道走向成贤街，沿街向北，在成贤街北段结束。',exit:'到达成贤街北段后，可查询前往鸡鸣寺站的步行路线，乘坐 3 / 4 号线离开。',conditions:'路线不进入校园。时长包含短暂停留，不含前往起点和返程的时间。'},
  { id:'alley',title:'成贤街短途散步',subtitle:'沿街观察建筑与街道细节',duration:20,distance:'约 0.5–1 km',tags:['建筑','街巷'],places:['chengxian','alley'],image:'/illustrations/route-alley.svg',color:'ochre',version:1,verified:false,scene:'街巷观察',directions:'沿成贤街的公共人行道向北走，观察建筑外墙、窗框和街道细节。',exit:'可在成贤街北段结束，在地图中查询前往鸡鸣寺站的步行路线。',conditions:'不需要消费、进入店铺或拍摄他人。步行距离取决于实际起点。'},
  { id:'postcard',title:'四牌楼与珍珠河',subtitle:'从四牌楼周边街巷走向珍珠河',duration:40,distance:'约 1.5–2 km',tags:['摄影','植物'],places:['southgate','chengxian','river'],image:'/illustrations/hero-walk.svg',color:'sage',version:1,verified:false,scene:'街巷与河岸',directions:'从四牌楼周边走到成贤街，再查看地图，寻找珍珠河附近开放的公共步道。',exit:'结束时，可根据所在位置在地图中查询附近的公共交通。',conditions:'仅使用有防护、公开开放的河边步道；找不到合适入口时，请跳过河岸节点。'},
  { id:'lake',title:'从四牌楼走到玄武湖',subtitle:'经过成贤街与鸡鸣寺路，到达解放门湖岸',duration:70,distance:'约 2–3 km',tags:['植物','街巷','摄影'],places:['southgate','chengxian','beijing','jimingroad','jiefang','lakewalk'],image:'/illustrations/route-lake.svg',color:'sage',version:1,verified:false,scene:'前往玄武湖',directions:'四牌楼周边 → 成贤街 → 北京东路 → 鸡鸣寺路 → 解放门 → 台城外地面湖岸。',exit:'可在鸡鸣寺路提前结束；到达湖边后，也可查询返回鸡鸣寺站的步行路线，乘坐 3 / 4 号线离开。',conditions:'路线不包含进入寺院或登城墙，也不需要绕湖一周。出入口的通行安排以现场指引为准。'},
  { id:'lakeshore',title:'沿玄武湖走到玄武门',subtitle:'从四牌楼出发，沿部分湖岸走到玄武门',duration:110,distance:'约 3.5–5 km',tags:['植物','摄影'],places:['southgate','chengxian','beijing','jimingroad','jiefang','lakewalk','xuanwumen'],image:'/illustrations/route-lake.svg',color:'green',version:1,verified:false,scene:'湖岸散步',directions:'到达解放门后，沿地面环湖路向玄武门方向继续。使用实时步行导航，不走城墙收费通道。',exit:'中途可以返回解放门；走到玄武门后，可查询前往玄武门地铁站的步行路线，乘坐 1 号线离开。',conditions:'路线只经过部分湖岸，不绕湖一周。预计用时 110 分钟，包含停留，返程时间另算。'},
  { id:'gulou',title:'从成贤街走到鼓楼',subtitle:'沿北京东路向西，走到鼓楼广场周边',duration:60,distance:'约 2–3 km',tags:['建筑','街巷'],places:['chengxian','beijing','gulou'],image:'/illustrations/route-alley.svg',color:'ochre',version:1,verified:false,scene:'街道与广场',directions:'沿成贤街向北走到北京东路，再向西走到鼓楼广场周边。请参考地图选择步行路线，过路口时遵守交通信号。',exit:'到达鼓楼广场后，可在鼓楼站乘坐 1 / 4 号线。途中也可以在鸡鸣寺站周边结束。',conditions:'以公共街道与广场为主，不要求登楼或进入场馆。'},
];
export type Task = { id: string; placeId: string; theme: string; title: string; prompt: string };
export const TASKS: Task[] = Object.keys(PLACES).flatMap(placeId => [
  { id: `${placeId}:leaf`, placeId, theme: '植物', title: '观察周边细节', prompt: PLACES[placeId].observation },
  { id: `${placeId}:line`, placeId, theme: '建筑', title: '观察窗框或屋檐的线条', prompt: '选择一扇窗、一段屋檐或一个建筑转角，观察它的边缘是直线还是曲线。可以记录一个你注意到的特点。' },
  { id: `${placeId}:color`, placeId, theme: '摄影', title: '记录两种颜色', prompt: '在周围找到两种颜色，记下它们分别来自什么物体。不需要拍照。' },
]);
export function chooseRoute(prefs: Preferences, exclude?: string, random = Math.random): Route | null {
  const eligible = ROUTES.filter(r => r.duration <= prefs.minutes);
  if (!eligible.length) return null;
  const alternatives = eligible.filter(r => r.id !== exclude);
  const pool = alternatives.length ? alternatives : eligible;
  const scores = pool.map(r => ({ route: r, score: r.tags.filter(t => prefs.interests.includes(t)).length }));
  const best = Math.max(...scores.map(s => s.score));
  const matches = scores.filter(s => s.score === best);
  return matches[Math.min(matches.length - 1, Math.floor(random() * matches.length))].route;
}
export function allowedTasks(placeId: string) { return TASKS.filter(t => t.placeId === placeId); }
export function defaultTask(placeId: string, interests: string[]) { const tasks = allowedTasks(placeId); return tasks.find(t => interests.includes(t.theme)) || tasks[0]; }
export function nextTask(placeId: string, observation: string, currentId?: string) {
  const all = allowedTasks(placeId);
  const theme = /窗|屋|墙|建筑|线/.test(observation) ? '建筑' : /色|光|照片/.test(observation) ? '摄影' : '植物';
  return all.find(t => t.theme === theme && t.id !== currentId) || all.find(t => t.id !== currentId) || all[0];
}
export function createJourney(route: Route, mode: Mode, now = new Date().toISOString()): Journey {
  return { id: crypto.randomUUID(), routeId: route.id, routeVersion: route.version, mode, status: 'active', nodeIndex: 0, visited: [], notes: {}, taskIds: {}, startedAt: now, updatedAt: now, finishedAt: null, cardText: '', demo: true, revision: 0 };
}
export function finishJourney(journey: Journey, completed: boolean): Journey {
  const route = ROUTES.find(r => r.id === journey.routeId)!;
  const notes = Object.values(journey.notes).filter(Boolean);
  const text = notes.length ? `${completed ? '' : '本次探索提前结束。'}本次笔记：${notes.join('；')}` : `已${completed ? '完成' : '提前结束'}「${route.title}」的页面体验，未填写笔记。`;
  return { ...journey, status: completed ? 'completed' : 'ended', finishedAt: new Date().toISOString(), updatedAt: new Date().toISOString(), cardText: text.length > 240 ? `${text.slice(0, 239)}…` : text };
}
export function amapSearchUrl(query: string) { return `https://uri.amap.com/search?${new URLSearchParams({ keyword: query, city: '南京', view: 'map', src: 'wutong-leaf', callnative: '0' })}`; }
export function formatDate(value: string) { return new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', month: 'long', day: 'numeric' }).format(new Date(value)); }
