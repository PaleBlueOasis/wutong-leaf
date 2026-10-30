'use client';
import { useState } from 'react';
import { ArrowUpRight, MapPin, TrainFront, Footprints, BookOpen } from 'lucide-react';
import { PLACES, SOURCES, TRANSIT, amapSearchUrl } from '@/lib/exploration';
export default function PlacesView(){
  const [filter,setFilter]=useState('全部');
  const visible=Object.values(PLACES).filter(p=>filter==='全部'||p.category===filter);
  return <section className="places-page page-width">
    <div className="page-heading"><div className="eyebrow">NEARBY PLACES</div><h1>从街巷，走到湖边。</h1><p>这里整理了四牌楼、鼓楼和玄武湖周边的地点，以及沿线的交通信息。</p></div>
    <div className="neighborhood-intro"><div><span className="eyebrow">NANJING · ON FOOT</span><h2>出发前查看路线</h2><p>地点与道路位置关系参考官方资料。出发前请打开地图，确认可用入口和步行路线。</p><a className="primary" href={amapSearchUrl('玄武湖公园 解放门')} target="_blank" rel="noopener noreferrer"><MapPin size={17}/>在高德查看玄武湖<ArrowUpRight size={17}/></a></div><img src="/illustrations/route-lake.svg" alt="原创插画：湖水、树影和城墙轮廓"/></div>
    <div className="place-toolbar"><h2>沿线地点</h2><div className="chips" aria-label="地点分类">{['全部','街巷','人文','湖畔'].map(f=><button aria-pressed={filter===f} className={filter===f?'active':''} key={f} onClick={()=>setFilter(f)}>{f}</button>)}</div></div>
    <div className="place-grid">{visible.map((p,i)=><article className="place-card" key={p.id}><div className="place-card-top"><span>{String(i+1).padStart(2,'0')}</span><small>{p.category}</small></div><h3>{p.name}</h3><p>{p.description}</p><div className="place-detail"><Footprints size={15}/><span>{p.access}</span></div><div className="place-detail"><TrainFront size={15}/><span>{p.transport}</span></div><div className="place-card-bottom"><a href={amapSearchUrl(p.query)} target="_blank" rel="noopener noreferrer">在地图中查看<ArrowUpRight size={14}/></a><a href={SOURCES[p.sourceId].url} target="_blank" rel="noopener noreferrer">资料来源<ArrowUpRight size={14}/></a></div></article>)}</div>
    <section className="transit-section"><div className="section-heading"><div><div className="eyebrow">PUBLIC TRANSPORT</div><h2>沿线地铁与返程</h2></div><TrainFront size={30} strokeWidth={1.3}/></div><div className="transit-grid">{TRANSIT.map(t=><article className="transit-card" key={t.name}><span className="transit-line">{t.lines}</span><h3>{t.name}站</h3><p>{t.description}</p><a className="text-button" href={amapSearchUrl(t.name+' 地铁站')} target="_blank" rel="noopener noreferrer">在地图中查看地铁站<ArrowUpRight size={14}/></a></article>)}</div><p className="content-note">路线时长不含前往起点和返程的时间。公交、地铁的首末班时间、临时封站和票价，请以当天官方公告与地图信息为准。此处不提供实时班次。</p></section>
    <details className="sources-note"><summary><BookOpen size={16}/>资料与估算说明 · 2026 年 10 月 30 日核对</summary><p>这些路线根据街区道路与景区入口资料整理，尚未实地核验。距离和时长为估算，时长包含观察停留。节点示意图不按地理比例绘制。路线不要求进入寺院、登城墙或参加园内收费项目。</p><ul>{Object.values(SOURCES).map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}<ArrowUpRight size={12}/></a></li>)}</ul></details>
  </section>;
}
