import { z } from 'zod';
import { ROUTES, PLACES } from './exploration.ts';
export const preferencesSchema = z.object({
  minutes: z.number().int().min(5).max(120), mode: z.enum(['wander', 'notice', 'quest']),
  interests: z.array(z.enum(['植物', '建筑', '街巷', '摄影'])).max(4), aiEnabled: z.boolean(),
  favorites: z.array(z.string().refine(v => ROUTES.some(r => r.id === v))).max(ROUTES.length),
});
export const journeySchema = z.object({
  id: z.string().uuid(), routeId: z.string(), routeVersion: z.number().int(), mode: z.enum(['wander', 'notice', 'quest']),
  status: z.enum(['active', 'paused', 'completed', 'ended']), nodeIndex: z.number().int().min(0).max(20),
  visited: z.array(z.string()).max(20), notes: z.record(z.string().max(500)), taskIds: z.record(z.string().max(100)),
  startedAt: z.string().datetime(), updatedAt: z.string().datetime(), finishedAt: z.string().datetime().nullable(),
  cardText: z.string().max(600), demo: z.literal(true), revision: z.number().int().min(0),
}).superRefine((j, ctx) => {
  const route = ROUTES.find(r => r.id === j.routeId);
  if (!route || route.version !== j.routeVersion || j.nodeIndex >= route.places.length) { ctx.addIssue({ code: 'custom', message: 'Invalid route' }); return; }
  if ([...j.visited, ...Object.keys(j.notes), ...Object.keys(j.taskIds)].some(p => !route.places.includes(p) || !PLACES[p])) ctx.addIssue({ code: 'custom', message: 'Invalid place' });
  if (j.status === 'completed' && j.nodeIndex !== route.places.length - 1) ctx.addIssue({ code: 'custom', message: 'Incomplete route' });
});
