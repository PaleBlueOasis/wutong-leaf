import { PLACES, type Route } from '@/lib/exploration';
export default function RouteMap({ route, current = -1, visited = [] }: { route: Route; current?: number; visited?: string[] }) {
  const cols=route.places.length>4?4:route.places.length;
  const points=route.places.map((id,i)=>({...PLACES[id],x:70+(i<cols?i:2*cols-i-1)*(360/Math.max(1,cols-1)),y:route.places.length>4?(i<cols?90:230):155}));
  return <div className="route-map" aria-label={`${route.title}节点示意图，不作为导航地图`}>
    <svg viewBox="0 0 500 340" role="img" aria-label="路线节点关系示意">
      <defs><pattern id="map-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M 28 0 L 0 0 0 28" fill="none" stroke="#dce2d6" strokeWidth=".7"/></pattern></defs>
      <rect width="500" height="340" fill="#edf0e5"/><rect width="500" height="340" fill="url(#map-grid)"/>
      <path d="M-30 100 Q 170 170 280 40 T550 10 M-20 270 Q180 220 310 300 T550 260" fill="none" stroke="#fffdf5" strokeWidth="25"/>
      <path d="M350 -10 Q290 100 390 170 T480 360" fill="none" stroke="#c6dcd7" strokeWidth="19"/>
      {[[50,50],[380,60],[420,130],[100,250],[210,290]].map(([x,y],i)=><g key={i}><ellipse cx={x} cy={y} rx="29" ry="23" fill="#d3dfc5"/><ellipse cx={x-8} cy={y-5} rx="19" ry="19" fill="#bdcfae"/></g>)}
      <polyline points={points.map(p=>`${p.x},${p.y}`).join(' ')} fill="none" stroke="#285b46" strokeWidth="3" strokeDasharray="5 7" strokeLinecap="round"/>
      {points.map((p,i)=><g key={p.id} transform={`translate(${p.x} ${p.y})`}>
        {i===current&&<circle r="23" fill="#285b4618"/>}<circle r="14" fill={visited.includes(p.id)||i===current?'#285b46':'#fffdf5'} stroke="#285b46" strokeWidth="2"/>
        <text textAnchor="middle" dy="5" fontSize="13" fontWeight="600" fill={visited.includes(p.id)||i===current?'#fffdf5':'#285b46'}>{i+1}</text>
        <text textAnchor="middle" y="34" fontSize="12" fill="#3f5145">{p.shortName}</text>
      </g>)}
    </svg><span className="map-caption">节点示意 · 非导航地图</span>
  </div>;
}
