import { formatDate, type Journey, type Route } from './exploration';
export async function downloadCard(journey: Journey, route: Route) {
  const canvas = document.createElement('canvas'); canvas.width = 1080;
  const ctx = canvas.getContext('2d'); if (!ctx) throw new Error('无法创建图片');
  ctx.font = '31px sans-serif';
  const lines = splitLines(ctx,journey.cardText,815);
  canvas.height = Math.max(1800, 900 + lines.length * 54 + 250);
  const h = canvas.height;
  ctx.fillStyle = '#f5f2e9'; ctx.fillRect(0,0,1080,h);
  ctx.fillStyle = '#28513d'; ctx.fillRect(56,56,968,h-112);
  ctx.fillStyle = '#f7f3e8'; ctx.fillRect(78,78,924,h-156);
  const image = new Image(); image.src = route.image; await image.decode(); ctx.drawImage(image,78,78,924,520);
  ctx.fillStyle = '#254d3a'; ctx.font = '27px sans-serif'; ctx.fillText('梧桐叶盲盒  /  探索纪念卡',125,665);
  ctx.font = 'bold 49px serif'; wrap(ctx,route.title,125,755,820,66,2);
  ctx.fillStyle = '#596257'; ctx.font = '31px sans-serif'; lines.forEach((line,i)=>ctx.fillText(line,125,900+i*54));
  ctx.fillStyle = '#8a7960'; ctx.font = '23px sans-serif'; ctx.fillText(`${formatDate(journey.startedAt)}  ·  ${journey.status==='completed'?'已完成演示':'提前结束'}`,125,h-190);
  ctx.font = '20px sans-serif'; ctx.fillText('演示记录 · 不代表真实到访',125,h-140);
  return canvas.toDataURL('image/png');
}
function splitLines(ctx:CanvasRenderingContext2D,text:string,width:number){
  const lines:string[]=[];let line='';
  for(const char of text){if(char==='\n'||ctx.measureText(line+char).width>width){lines.push(line);line='';}if(char!=='\n')line+=char;}
  lines.push(line);return lines;
}
function wrap(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, width: number, lineHeight: number, maxLines: number) {
  let line = ''; let lines = 0;
  for (const char of text) { if (ctx.measureText(line+char).width > width || char==='\n') { ctx.fillText(line,x,y+lines*lineHeight); line=''; lines++; if(lines>=maxLines) return; } if(char!=='\n') line += char; }
  if(line && lines < maxLines) ctx.fillText(line,x,y+lines*lineHeight);
}
