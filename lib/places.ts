/** 2026-10-30 线上资料核对。位置关系资料不能替代实地核验；不保存未经核验的经纬度。 */
export const SOURCES: Record<string,{title:string;url:string}> = {
  seu:{title:'东南大学｜四牌楼校区与周边道路',url:'https://cis.seu.edu.cn/2024/0630/c54387a495970/page.htm'},
  seuTransit:{title:'东南大学｜校区交通',url:'https://splgwh.seu.edu.cn/25043/list.htm'},
  approach:{title:'南京公安｜鸡鸣寺路、解放门与环湖路的位置关系（2024）',url:'https://gaj.nanjing.gov.cn/njsgaj/202403/t20240329_4199404.html'},
  metro:{title:'南京公安｜鸡鸣寺站 3、4 号线出行提示（2026）',url:'https://gaj.nanjing.gov.cn/jtgl/202603/t20260323_5810104.html'},
  xuanwuTransit:{title:'南京市政府｜玄武湖周边地铁出行提示（2026）',url:'https://www.nanjing.gov.cn/msxx/202609/t20260930_5920084.html'},
  lake:{title:'玄武湖管理处｜环湖路与景区开放服务',url:'https://www.xuanwuhu.net/lyfw/lyfw.aspx'},
  lakeshore:{title:'玄武湖管理处｜环湖路沿线节点',url:'https://www.xuanwuhu.net/lyzn/detail2.aspx?id=72'},
  gulou:{title:'南京地铁集团答复｜鼓楼站与周边广场',url:'https://www.nanjing.gov.cn/xxgkn/jytabljggk/2023njytabl/shirddbjy/202312/t20231205_4115599.html'},
  river:{title:'南京市建委｜珍珠河岸线与道路位置（2018）',url:'https://sjw.nanjing.gov.cn/zthg/2018njcsjxhjs/gzdt/201808/t20180803_492018.html'},
};
export type Place={id:string;name:string;shortName:string;category:'街巷'|'人文'|'湖畔';description:string;query:string;access:string;transport:string;sourceId:string;observation:string};
export const PLACES:Record<string,Place>={
  southgate:{id:'southgate',name:'四牌楼校区南门周边',shortName:'四牌楼南门',category:'人文',description:'以四牌楼校区南门周边为起点，在校园外的公共街道观察校门建筑与树木。',query:'东南大学四牌楼校区南门',access:'请在校园外的公共道路活动；如需进入校园，请另查校方规定。',transport:'可乘地铁 3 / 4 号线到鸡鸣寺站，再查询前往起点的步行路线。',sourceId:'seu',observation:'找一处门楼和树影重叠的地方，留意它们不同的线条。'},
  chengxian:{id:'chengxian',name:'成贤街',shortName:'成贤街',category:'街巷',description:'成贤街位于四牌楼校区东侧。沿公共人行道行走，可以观察沿街建筑、围墙和树木。',query:'南京 成贤街',access:'使用公共人行道，不进入院落或工作区域。',transport:'沿街向北可到北京东路，再查询前往鸡鸣寺站的步行路线。',sourceId:'seu',observation:'找一扇窗、一段围墙或一个路口，比较新旧材质的颜色。'},
  alley:{id:'alley',name:'成贤街北段',shortName:'成贤街北段',category:'街巷',description:'短途路线在成贤街靠近北京东路的一段结束。时间充足时，也可以继续前往鸡鸣寺路和玄武湖方向。',query:'南京 成贤街 北京东路',access:'过路口时走人行横道，注意当天的路面情况。',transport:'可在地图中查询鸡鸣寺地铁站的开放入口。',sourceId:'seu',observation:'在不影响通行的地方，听一听街口与街中段的声音有什么不同。'},
  river:{id:'river',name:'珍珠河 · 四牌楼附近',shortName:'珍珠河',category:'街巷',description:'珍珠河自北向南经过北京东路、四牌楼与文德里桥一带。建议先在地图与现场确认四牌楼附近是否有开放的公共步道，不穿越机关院落。',query:'南京 珍珠河 四牌楼',access:'仅使用开放、有护栏的步道；现场无公开入口时跳过。',transport:'可向成贤街、北京东路方向返回，在地图中查询前往鸡鸣寺站的步行路线。',sourceId:'river',observation:'站在有防护的公共步道上，观察水面的颜色、波纹或倒影。'},
  beijing:{id:'beijing',name:'北京东路 · 四牌楼北侧',shortName:'北京东路',category:'街巷',description:'北京东路位于四牌楼校区北侧。从成贤街走到这里，可以继续前往鸡鸣寺路或鼓楼方向。',query:'南京 北京东路 成贤街',access:'沿公共人行道行走，过路口使用人行横道。',transport:'可查询前往鸡鸣寺站的步行路线，乘坐 3 / 4 号线；向西也可前往鼓楼站。',sourceId:'seu',observation:'比较这段道路与刚才经过的街巷，记录道路宽度或两侧建筑的变化。'},
  jimingroad:{id:'jimingroad',name:'鸡鸣寺路',shortName:'鸡鸣寺路',category:'人文',description:'从北京东路转入鸡鸣寺路，沿道路走向古鸡鸣寺和玄武湖解放门。花期与节假日可能采取临时客流管制措施。',query:'南京 鸡鸣寺路',access:'使用地面道路，遵守现场交通和客流指引。',transport:'附近的鸡鸣寺站有 3 / 4 号线，也可以在这里结束散步。',sourceId:'approach',observation:'在不影响通行的位置停留，找出街景中的三种颜色，记下对应的物体。'},
  temple:{id:'temple',name:'古鸡鸣寺周边',shortName:'鸡鸣寺周边',category:'人文',description:'可从公共道路观察寺院的外观。路线不要求进入寺院，如需入寺，请另行查询开放和购票信息。',query:'南京 古鸡鸣寺',access:'在公共道路上观察，不进入未开放区域。',transport:'鸡鸣寺站 3 / 4 号线，具体入口以地图为准。',sourceId:'approach',observation:'不打扰他人，观察屋檐线与天空组成的形状。'},
  jiefang:{id:'jiefang',name:'玄武湖 · 解放门',shortName:'解放门',category:'湖畔',description:'从鸡鸣寺路可以前往玄武湖解放门一带。到达后可继续沿湖岸散步，也可以在此结束。',query:'玄武湖公园 解放门',access:'出入口可能有临时客流管制，请按照现场指引通行。',transport:'结束后可查前往鸡鸣寺站 3 / 4 号线的步行路线。',sourceId:'approach',observation:'在可停留的湖岸位置，观察湖面的颜色与波纹。'},
  lakewalk:{id:'lakewalk',name:'台城外 · 环湖路',shortName:'台城外湖岸',category:'湖畔',description:'沿解放门与玄武门之间的地面环湖路，观察湖面与城墙轮廓。本路线不要求登城墙。',query:'玄武湖 环湖路 解放门',access:'沿地面湖岸步行。登城墙、游船等项目不包含在路线中。',transport:'可根据体力返回鸡鸣寺方向，或继续前往玄武门。',sourceId:'lakeshore',observation:'比较树木、城墙和湖面的颜色与形状，记录一个你注意到的细节。'},
  xuanwumen:{id:'xuanwumen',name:'玄武湖 · 玄武门',shortName:'玄武门',category:'湖畔',description:'玄武门是本网站湖岸长路线的终点。公园玄武门与玄武门地铁站是两个不同的地点。',query:'玄武湖公园 玄武门',access:'路线只经过部分湖岸，不绕湖一周。',transport:'出园后可步行前往玄武门地铁站，乘坐 1 号线。请另查步行导航。',sourceId:'xuanwuTransit',observation:'可以回顾沿途的笔记，选择想保留的内容写入纪念卡。'},
  gulou:{id:'gulou',name:'鼓楼广场周边',shortName:'鼓楼广场',category:'人文',description:'沿北京东路向西，可走到鼓楼广场周边。可以在开放的公共区域观察附近建筑的高度与外观。',query:'南京 鼓楼广场',access:'停留在公共区域，路线不要求进入场馆或登楼。',transport:'可在这里结束散步，前往鼓楼站乘坐 1 / 4 号线。',sourceId:'gulou',observation:'选择附近两座建筑，比较它们的高度和外观。'},
};
export const TRANSIT=[
  {name:'鸡鸣寺',lines:'3 / 4 号线',description:'前往四牌楼东侧、鸡鸣寺路和解放门，可查询从本站出发的步行路线。也可以在这里结束散步，乘地铁离开。'},
  {name:'玄武门',lines:'1 号线',description:'沿湖走到公园玄武门后，可步行前往本站。公园入口与地铁站入口不在同一位置，请查看导航。'},
  {name:'鼓楼',lines:'1 / 4 号线',description:'前往北京东路西段和鼓楼广场周边，可查询从本站出发的步行路线。1 / 4 号线可在本站换乘。'},
];
