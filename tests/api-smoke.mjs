// Local-only API smoke checks; no real model calls and no personal data.
import assert from 'node:assert/strict';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:5173';
if (!['localhost','127.0.0.1'].includes(new URL(base).hostname)) throw new Error('Only a local preview may be tested by this script.');
let passed=0;
function check(ok,label){assert.ok(ok,label);passed++;console.log(`PASS ${label}`);}
async function req(path,body,headers={}){
 const r=await fetch(base+path,{method:body?'POST':'GET',headers:{'Content-Type':'application/json',...headers},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(10000)});
 const raw=await r.text();let data;try{data=JSON.parse(raw);}catch{data={message:raw};}return{status:r.status,data};
}
const config=await req('/api/ai');
check(config.status===200&&config.data.configured===false,'only non-secret AI availability is returned');
check((await req('/api/archive')).status===404,'cloud archive endpoint is absent in guest edition');
check((await req('/api/ai',{kind:'parse',text:'20 分钟'})).status===400,'explicit consent is required');
check((await req('/api/ai',{kind:'parse',text:'20 分钟',consent:true},{Origin:'https://example.invalid'})).status===403,'foreign origin is rejected');
const parsed=await req('/api/ai',{kind:'parse',text:'20 分钟，安静一点',consent:true});
check(parsed.status===200&&parsed.data.source==='fallback'&&parsed.data.minutes===20&&parsed.data.mode==='wander','guest can use meaningful fallback without a key');
check((await req('/api/ai',{kind:'guide',routeId:'unknown',consent:true})).status===400,'unknown route is rejected');
check((await req('/api/ai',{kind:'observe',routeId:'alley',placeId:'river',consent:true})).status===400,'observation cannot use a different route place');
const observed=await req('/api/ai',{kind:'observe',routeId:'shade',placeId:'southgate',text:'一片叶子',consent:true});
check(observed.status===200&&observed.data.taskId.startsWith('southgate:'),'fallback task remains at the current place');
const recap=await req('/api/ai',{kind:'recap',routeId:'shade',text:'看见树影',endedEarly:true,consent:true});
check(recap.data.text.includes('提前')&&recap.data.text.includes('树影'),'early end and actual observation survive recap fallback');
check((await req('/api/ai',{kind:'parse',text:'a'.repeat(10100),consent:true})).status===413,'oversized requests are rejected');
console.log(`${passed} checks passed. No real provider call was made.`);
