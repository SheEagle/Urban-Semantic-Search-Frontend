// 'use client';
//
// import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription} from "@/components/ui/sheet";
// import {Badge} from "@/components/ui/badge";
// import {Copy, MapPin, Image as ImageIcon, FileText, X} from "lucide-react"; // 引入 X 图标
// import {Button} from "@/components/ui/button";
//
// export function LocationDetailsSheet({location, open, onOpenChange}) {
//     if (!location) return null;
//
//     const copyToClipboard = (text) => {
//         navigator.clipboard.writeText(text);
//     };
//
//     const fullMapUrl = "/maps/raw/sample_venice_map_3.jpg";
//
//     return (
//         <Sheet open={open} onOpenChange={onOpenChange}>
//             {/* 1. onInteractOutside: 阻止点击遮罩层关闭
//                 2. onEscapeKeyDown: (可选) 如果你想连按 ESC 都不关闭，可以也加上 e.preventDefault()
//             */}
//             <SheetContent
//                 onInteractOutside={(e) => e.preventDefault()}
//                 className="w-[400px] sm:w-[540px] overflow-y-auto bg-paper z-[2000] border-l-4 border-l-ink/10 shadow-parchment p-0 gap-0 focus-visible:outline-none"
//             >
//                 {/* 头部区域 */}
//                 <div className="p-8 border-b-2 border-double border-ink/10 bg-paper relative overflow-hidden">
//
//                     {/* 背景印章装饰 */}
//                     <div
//                         className="absolute top-[-20px] right-[-20px] w-32 h-32 border-4 border-ink/5 rounded-full opacity-50 pointer-events-none flex items-center justify-center rotate-[-15deg]">
//                         <span className="text-ink/10 font-serif font-bold text-xs uppercase">Archive</span>
//                     </div>
//
//                     {/* ✨✨✨ 自定义关闭按钮 (叉叉) ✨✨✨ */}
//                     <button
//                         onClick={() => onOpenChange(false)}
//                         className="absolute top-6 right-6 z-50 p-2 rounded-sm text-ink/40 hover:text-white hover:bg-wax-red transition-all duration-300 border border-transparent hover:border-wax-red/20"
//                         title="Close Archive"
//                     >
//                         <X size={20}/>
//                     </button>
//
//                     <SheetHeader className="relative z-10 pr-8">
//                         <div className="flex items-center justify-between mb-3">
//                             <Badge variant="outline"
//                                    className="bg-wax-red/10 text-wax-red border-wax-red/30 font-serif rounded-sm px-2">
//                                 Confidence: {(location.score * 100).toFixed(2)}%
//                             </Badge>
//                             <span className="text-[10px] text-ink-faded font-mono tracking-widest">
//                                 REF: {location.id.slice(0, 8)}
//                             </span>
//                         </div>
//                         <SheetTitle className="text-3xl font-serif text-ink italic leading-tight">
//                             Historical Match
//                         </SheetTitle>
//                         <SheetDescription className="text-ink-faded font-serif">
//                             Source: <span
//                             className="font-bold text-ink border-b border-ink/20 pb-0.5">{location.fullData?.image_source || "Unknown Manuscript"}</span>
//                         </SheetDescription>
//                     </SheetHeader>
//                 </div>
//
//                 {/* 内容区域 */}
//                 <div className="p-8 space-y-8 bg-paper">
//
//                     {/* Visual Evidence */}
//                     <div className="space-y-4">
//                         <h4 className="text-xs font-bold text-ink/40 uppercase tracking-[0.2em] flex items-center gap-2 pb-2 border-b border-ink/10">
//                             <ImageIcon size={12}/>
//                             Visual Evidence
//                         </h4>
//
//                         <div
//                             className="relative w-full aspect-[4/3] bg-paper rounded-sm overflow-hidden border-2 border-ink/10 shadow-inner group">
//                             {location.pixel_coords ? (
//                                 <>
//                                     <div
//                                         className="absolute inset-2 border border-ink/5 pointer-events-none z-10"></div>
//                                     <div
//                                         className="absolute inset-0 transition-transform duration-700 group-hover:scale-105 filter sepia-[0.3] contrast-[0.9]"
//                                         style={{
//                                             backgroundRepeat: 'no-repeat',
//                                             backgroundImage: `url(${fullMapUrl})`,
//                                             backgroundPosition: `-${location.pixel_coords[0]}px -${location.pixel_coords[1]}px`,
//                                         }}
//                                     />
//                                     <div
//                                         className="absolute bottom-3 right-3 bg-ink text-paper text-[10px] px-2 py-1 rounded-sm font-mono border border-royal-gold/30 shadow-md">
//                                         PX: {location.pixel_coords.join(', ')}
//                                     </div>
//                                 </>
//                             ) : (
//                                 <div
//                                     className="flex h-full items-center justify-center text-ink-faded italic font-serif">
//                                     No visual fragment available
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//
//                     {/* Coordinates */}
//                     <div className="space-y-4">
//                         <h4 className="text-xs font-bold text-ink/40 uppercase tracking-[0.2em] flex items-center gap-2 pb-2 border-b border-ink/10">
//                             <MapPin size={12}/>
//                             Coordinates
//                         </h4>
//
//                         <div className="grid grid-cols-2 gap-4">
//                             {['Latitude', 'Longitude'].map((label, idx) => {
//                                 const val = idx === 0 ? location.lat : location.lon;
//                                 return (
//                                     <Button
//                                         key={label}
//                                         variant="outline"
//                                         className="h-auto py-3 px-4 flex flex-col items-start gap-1 bg-paper border-ink/20 hover:bg-ink/5 hover:border-wax-red/50 transition-all group rounded-sm shadow-sm"
//                                         onClick={() => copyToClipboard(val)}
//                                     >
//                                         <span
//                                             className="text-[10px] text-ink-faded font-bold uppercase tracking-wider">{label}</span>
//                                         <div className="flex items-center gap-2 w-full">
//                                             <span className="font-mono text-sm text-ink">{val.toFixed(6)}</span>
//                                             <Copy size={12}
//                                                   className="ml-auto opacity-0 group-hover:opacity-100 text-wax-red"/>
//                                         </div>
//                                     </Button>
//                                 )
//                             })}
//                         </div>
//                     </div>
//
//                 </div>
//             </SheetContent>
//         </Sheet>
//     );
// }
// 'use client';
//
// import {Sheet, SheetContent} from "@/components/ui/sheet";
// import {Badge} from "@/components/ui/badge";
// import {Copy, MapPin, Scan, X} from "lucide-react";
// import {Button} from "@/components/ui/button";
//
// export function LocationDetailsSheet({location, open, onOpenChange}) {
//     if (!location) return null;
//     const fullMapUrl = "/maps/raw/sample_venice_map_3.jpg";
//
//     return (
//         <Sheet open={open} onOpenChange={onOpenChange}>
//             <SheetContent
//                 side="right"
//                 className="w-[400px] sm:w-[500px] p-0 border-l border-white/40 shadow-2xl bg-glass backdrop-blur-2xl z-[2000] focus-visible:outline-none"
//             >
//                 {/* 顶部大图区域 (Hero Section) */}
//                 <div className="relative h-48 w-full overflow-hidden bg-slate-100 group">
//                     {/* 背景图：模拟模糊效果 */}
//                     <div
//                         className="absolute inset-0 bg-cover bg-center blur-sm opacity-50 scale-110"
//                         style={{backgroundImage: `url(${fullMapUrl})`}}
//                     />
//
//                     {/* 实际切片高亮 */}
//                     {location.pixel_coords && (
//                         <div className="absolute inset-0 flex items-center justify-center">
//                             <div
//                                 className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl ring-1 ring-black/5 animate-in zoom-in duration-500">
//                                 <div
//                                     className="absolute inset-0 filter contrast-[1.1] sepia-[0.2]"
//                                     style={{
//                                         backgroundRepeat: 'no-repeat',
//                                         backgroundImage: `url(${fullMapUrl})`,
//                                         backgroundPosition: `-${location.pixel_coords[0]}px -${location.pixel_coords[1]}px`,
//                                         backgroundSize: 'auto' // 根据实际情况调整
//                                     }}
//                                 />
//                                 {/* 扫描线动画 */}
//                                 <div
//                                     className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-scan"></div>
//                             </div>
//                         </div>
//                     )}
//
//                     <button
//                         onClick={() => onOpenChange(false)}
//                         className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white text-deep-ocean backdrop-blur-md transition-all"
//                     >
//                         <X size={18}/>
//                     </button>
//                 </div>
//
//                 {/* 内容区域 */}
//                 <div className="p-8 space-y-6">
//                     <div>
//                         <div className="flex items-center justify-between mb-2">
//                             <Badge variant="secondary"
//                                    className="bg-time-gold/10 text-time-gold hover:bg-time-gold/20 font-mono text-[10px] tracking-widest uppercase px-2">
//                                 Match Score: {(location.score * 100).toFixed(1)}%
//                             </Badge>
//                             <span className="font-mono text-[10px] text-mist-blue">ID: {location.id.slice(0, 6)}</span>
//                         </div>
//                         <h2 className="text-3xl font-serif text-deep-ocean font-medium leading-tight mb-2">
//                             {location.fullData?.image_source || "Unknown Chronicle"}
//                         </h2>
//                         <p className="text-sm text-mist-blue font-sans leading-relaxed">
//                             Detected historical fragment aligned with modern cartography.
//                             <br/>Layer analysis indicates high probability of correlation.
//                         </p>
//                     </div>
//
//                     <div className="grid grid-cols-2 gap-3">
//                         {['Latitude', 'Longitude'].map((label, idx) => (
//                             <div key={label}
//                                  className="p-3 rounded-lg bg-white/50 border border-deep-ocean/5 hover:border-time-gold/30 transition-colors group">
//                                 <span
//                                     className="text-[9px] text-mist-blue uppercase tracking-widest font-bold block mb-1">{label}</span>
//                                 <div className="flex items-center justify-between">
//                                     <span className="font-mono text-sm text-deep-ocean">
//                                         {(idx === 0 ? location.lat : location.lon).toFixed(6)}
//                                     </span>
//                                     <Copy
//                                         size={12}
//                                         className="text-mist-blue opacity-0 group-hover:opacity-100 cursor-pointer hover:text-time-gold"
//                                         onClick={() => navigator.clipboard.writeText(idx === 0 ? location.lat : location.lon)}
//                                     />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//
//                     {/* 可视化操作按钮 */}
//                     <Button
//                         className="w-full bg-deep-ocean hover:bg-deep-ocean/90 text-white font-serif tracking-wide shadow-lg shadow-deep-ocean/20">
//                         <MapPin className="mr-2 h-4 w-4"/> Navigate to Location
//                     </Button>
//                 </div>
//
//                 {/* 底部装饰：经纬网格背景 */}
//                 <div className="absolute bottom-0 left-0 w-full h-32 opacity-[0.03] pointer-events-none"
//                      style={{
//                          backgroundImage: 'linear-gradient(0deg, transparent 24%, #000 25%, #000 26%, transparent 27%, transparent 74%, #000 75%, #000 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #000 25%, #000 26%, transparent 27%, transparent 74%, #000 75%, #000 76%, transparent 77%, transparent)',
//                          backgroundSize: '30px 30px'
//                      }}>
//                 </div>
//             </SheetContent>
//         </Sheet>
//     );
// }


// 'use client';
//
// import {Sheet, SheetContent} from "@/components/ui/sheet";
// import {Badge} from "@/components/ui/badge";
// import {Copy, MapPin, Minimize2, Maximize2, X, Compass, Clock, ScanLine} from "lucide-react";
// import {Button} from "@/components/ui/button";
//
// export function LocationDetailsSheet({location, open, onOpenChange}) {
//     if (!location) return null;
//
//     // 假设的大图 (实际项目中替换为真实逻辑)
//     const fullMapUrl = "/maps/raw/sample_venice_map_3.jpg";
//     const scorePercent = (location.score * 100).toFixed(1);
//
//     return (
//         <Sheet open={open} onOpenChange={onOpenChange}>
//             <SheetContent
//                 side="right"
//                 // 宽度增加，背景使用 bg-ceramic (高不透明度)
//                 className="w-[450px] sm:w-[550px] p-0 border-l border-white/60 shadow-2xl bg-ceramic z-[2000] focus-visible:outline-none flex flex-col h-full"
//             >
//                 {/* --- 1. 顶部：视觉证据 (Visual Evidence) --- */}
//                 <div className="relative w-full h-[280px] bg-slate-100 overflow-hidden shrink-0">
//
//                     {/* 背景模糊处理，制造景深 */}
//                     <div
//                         className="absolute inset-0 bg-cover bg-center blur-md opacity-30 scale-110 grayscale-[30%]"
//                         style={{backgroundImage: `url(${fullMapUrl})`}}
//                     />
//
//                     {/* 核心切片展示：模拟 '底片' 或 '幻灯片' 效果 */}
//                     <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
//                         {location.pixel_coords ? (
//                             <div
//                                 className="relative group shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
//                                 {/* 边框 */}
//                                 <div className="absolute -inset-2 border border-white/40 rounded-sm"></div>
//                                 <div className="absolute -inset-1 border border-white/80 rounded-sm"></div>
//
//                                 {/* 图片本体 */}
//                                 <div
//                                     className="relative w-64 h-40 overflow-hidden bg-white border-4 border-white rounded-sm"
//                                     style={{boxShadow: '0 20px 50px -10px rgba(0,0,0,0.3)'}}
//                                 >
//                                     <div
//                                         className="w-full h-full transition-all duration-700 filter contrast-[1.05] sepia-[0.1]"
//                                         style={{
//                                             backgroundRepeat: 'no-repeat',
//                                             backgroundImage: `url(${fullMapUrl})`,
//                                             backgroundPosition: `-${location.pixel_coords[0]}px -${location.pixel_coords[1]}px`,
//                                         }}
//                                     />
//                                     {/* 扫描线动画装饰 */}
//                                     <div
//                                         className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent animate-scan pointer-events-none opacity-50"></div>
//                                 </div>
//
//                                 {/* 图片下方的元数据标签 */}
//                                 <div className="absolute -bottom-8 left-0 flex gap-2">
//                                     <Badge variant="outline"
//                                            className="bg-deep-ocean text-white border-none font-mono text-[10px] h-5 px-1.5 rounded-sm">
//                                         PX: {location.pixel_coords.join(', ')}
//                                     </Badge>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="text-faded-slate italic font-serif">Visual fragment corrupted</div>
//                         )}
//                     </div>
//
//                     {/* 关闭按钮 */}
//                     <button
//                         onClick={() => onOpenChange(false)}
//                         className="absolute top-5 right-5 z-50 p-2 rounded-full bg-white/80 hover:bg-deep-ocean hover:text-white text-deep-ocean shadow-sm transition-all duration-300"
//                     >
//                         <X size={18} strokeWidth={2}/>
//                     </button>
//                 </div>
//
//                 {/* --- 2. 内容滚动区 --- */}
//                 <div className="flex-1 overflow-y-auto custom-scrollbar">
//                     <div className="p-8 space-y-8">
//
//                         {/* 标题部分 */}
//                         <div className="relative">
//                             {/* 左侧装饰竖线 */}
//                             <div className="absolute -left-4 top-1 bottom-1 w-0.5 bg-time-gold/30 rounded-full"></div>
//
//                             <div
//                                 className="flex items-center gap-3 mb-2 text-faded-slate text-[10px] font-mono tracking-widest uppercase">
//                                 <span className="flex items-center gap-1"><Clock size={12}/> Chrono-Archive</span>
//                                 <span className="w-px h-3 bg-faded-slate/30"></span>
//                                 <span>ID: {location.id.substring(0, 8)}</span>
//                             </div>
//
//                             <h2 className="text-3xl font-serif text-deep-ocean font-bold leading-tight text-balance">
//                                 {location.fullData?.image_source || "Unidentified Region"}
//                             </h2>
//                         </div>
//
//                         {/* 数据仪表盘 (Grid Layout) */}
//                         <div className="grid grid-cols-2 gap-4">
//                             {/* 匹配度卡片 */}
//                             <div
//                                 className="p-4 rounded-lg bg-slate-50 border border-slate-100 flex flex-col justify-between group hover:border-time-gold/30 transition-colors">
//                                 <div className="flex justify-between items-start mb-2">
//                                     <ScanLine size={16} className="text-time-gold"/>
//                                     <span className="text-[10px] font-bold text-faded-slate uppercase">Confidence</span>
//                                 </div>
//                                 <div className="flex items-baseline gap-1">
//                                     <span
//                                         className="text-3xl font-mono font-light text-deep-ocean">{scorePercent}</span>
//                                     <span className="text-xs text-faded-slate">%</span>
//                                 </div>
//                                 {/* 简单的进度条 */}
//                                 <div className="w-full h-1 bg-slate-200 rounded-full mt-2 overflow-hidden">
//                                     <div className="h-full bg-time-gold" style={{width: `${scorePercent}%`}}></div>
//                                 </div>
//                             </div>
//
//                             {/* 坐标卡片 */}
//                             <div
//                                 className="p-4 rounded-lg bg-slate-50 border border-slate-100 group hover:border-deep-ocean/20 transition-colors relative overflow-hidden">
//                                 <div className="flex justify-between items-start mb-3">
//                                     <Compass size={16}
//                                              className="text-deep-ocean/60 group-hover:rotate-45 transition-transform duration-700"/>
//                                     <span
//                                         className="text-[10px] font-bold text-faded-slate uppercase">Coordinates</span>
//                                 </div>
//                                 <div className="space-y-1">
//                                     <div
//                                         className="flex justify-between items-center text-xs font-mono text-deep-ocean">
//                                         <span className="text-faded-slate">LAT</span>
//                                         <span>{location.lat.toFixed(5)} N</span>
//                                     </div>
//                                     <div className="w-full h-px bg-slate-200"></div>
//                                     <div
//                                         className="flex justify-between items-center text-xs font-mono text-deep-ocean">
//                                         <span className="text-faded-slate">LON</span>
//                                         <span>{location.lon.toFixed(5)} E</span>
//                                     </div>
//                                 </div>
//                                 <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     className="absolute bottom-1 right-1 h-6 w-6 text-faded-slate hover:text-time-gold"
//                                     onClick={() => navigator.clipboard.writeText(`${location.lat}, ${location.lon}`)}
//                                 >
//                                     <Copy size={12}/>
//                                 </Button>
//                             </div>
//                         </div>
//
//                         {/* 描述/上下文区域 */}
//                         <div className="space-y-3">
//                             <h3 className="text-sm font-bold text-deep-ocean border-b border-slate-100 pb-2 flex items-center gap-2">
//                                 <span className="w-1.5 h-1.5 rounded-full bg-time-gold"></span>
//                                 Historical Context
//                             </h3>
//                             <div className="text-sm text-slate-600 leading-relaxed font-serif text-justify">
//                                 {/* 这里如果有真实的描述数据更好，没有的话用通用文案 */}
//                                 <p>
//                                     This location has been cross-referenced with the 18th-century cartographic archives.
//                                     The visual signature matches typical topological features found in the Ludovico Ughi
//                                     map of Venice.
//                                     Suggested correlation indicates a high probability of historical significance in
//                                     this sector.
//                                 </p>
//                             </div>
//                         </div>
//
//                     </div>
//                 </div>
//
//                 {/* --- 3. 底部操作栏 --- */}
//                 <div className="p-6 border-t border-slate-100 bg-white/50 backdrop-blur-sm">
//                     <Button
//                         className="w-full h-12 bg-deep-ocean hover:bg-deep-ocean/90 text-white font-serif tracking-wide shadow-lg shadow-deep-ocean/20 rounded-md group">
//                         <MapPin className="mr-2 h-4 w-4 group-hover:-translate-y-1 transition-transform"/>
//                         Navigate to Sector
//                     </Button>
//                 </div>
//             </SheetContent>
//         </Sheet>
//     );
// }

// 'use client';
//
// import {Sheet, SheetContent} from "@/components/ui/sheet";
// import {Badge} from "@/components/ui/badge";
// import {Copy, MapPin, Scan, Clock, X} from "lucide-react";
// import {Button} from "@/components/ui/button";
//
// // 用于复制到剪贴板的辅助函数
// const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
// };
//
// // 辅助组件：元数据行
// const MetaRow = ({label, value, icon: Icon}) => {
//     if (!value) return null;
//     return (
//         <div className="flex justify-between items-start py-2 border-b border-border/50 last:border-0">
//             <div className="flex items-center gap-2 text-slate-500">
//                 {Icon && <Icon size={14}/>}
//                 <span className="text-[10px] font-bold uppercase tracking-wide">{label}</span>
//             </div>
//             <span className="text-sm font-serif text-slate-800 text-right max-w-[60%] break-words leading-tight">
//                 {String(value)}
//             </span>
//         </div>
//     );
// };
//
// export function LocationDetailsSheet({location, open, onOpenChange}) {
//     if (!location) return null;
//
//     const fullMapUrl = "/maps/raw/sample_venice_map_3.jpg"; // 假设的底图URL
//     const scorePercent = (location.score * 100).toFixed(1);
//
//     return (
//         <Sheet
//             open={open}
//             onOpenChange={onOpenChange}
//             // 🔥 关键修改 1: 禁用模态模式
//             modal={false}
//         >
//             <SheetContent
//                 // 使用 bg-ceramic (高不透明度，浅色系)
//                 className="w-[450px] sm:w-[550px] p-0 border-l border-border shadow-2xl bg-ceramic z-[2000] focus-visible:outline-none flex flex-col h-full overflow-hidden [&>button]:hidden"
//
//                 // 🔥 关键修改 2: 移除“点击外部关闭”的行为（因为我们要允许点击地图）
//                 // 在 modal={false} 时，这个属性通常是自动生效的，但显式写上更安全
//                 onInteractOutside={(e) => {
//                     // 阻止 Sheet 捕获外部点击事件，让事件穿透到地图上
//                     e.preventDefault();
//                 }}
//             >
//                 {/* --- 1. 顶部：视觉证据 (Visual Evidence) --- */}
//                 <div
//                     className="relative w-full h-[250px] bg-deep-ocean/5 overflow-hidden shrink-0 border-b border-border">
//
//                     {/* 背景模糊处理，制造景深 */}
//                     <div
//                         className="absolute inset-0 bg-cover bg-center blur-md opacity-30 scale-110 grayscale-[30%]"
//                         style={{backgroundImage: `url(${fullMapUrl})`}}
//                     />
//
//                     {/* 核心切片展示：像一个悬浮的精密透镜 */}
//                     <div className="absolute inset-0 flex items-center justify-center">
//                         {location.pixel_coords ? (
//                             <div
//                                 className="relative group shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
//                                 {/* 边框：金属感光环 */}
//                                 <div
//                                     className="absolute -inset-2 border-2 border-time-gold/40 rounded-sm opacity-50"></div>
//
//                                 {/* 图片本体 */}
//                                 <div
//                                     className="relative w-56 h-36 overflow-hidden bg-atlas-paper border-2 border-deep-ocean/10 rounded-sm"
//                                     style={{boxShadow: '0 10px 30px -5px rgba(0,0,0,0.2)'}}
//                                 >
//                                     <div
//                                         className="w-full h-full transition-all duration-700 filter contrast-[1.05] sepia-[0.1]"
//                                         style={{
//                                             backgroundRepeat: 'no-repeat',
//                                             backgroundImage: `url(${fullMapUrl})`,
//                                             backgroundPosition: `-${location.pixel_coords[0]}px -${location.pixel_coords[1]}px`,
//                                         }}
//                                     />
//                                     {/* 扫描线动画装饰 */}
//                                     <div
//                                         className="absolute inset-0 bg-gradient-to-b from-transparent via-time-gold/30 to-transparent animate-scan pointer-events-none opacity-40"></div>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="text-faded-slate italic font-serif">Visual fragment corrupted</div>
//                         )}
//                     </div>
//
//                     {/* 关闭按钮 */}
//                     <button
//                         onClick={() => onOpenChange(false)}
//                         className="absolute top-5 right-5 z-50 p-2 rounded-full bg-atlas-paper/80 hover:bg-deep-ocean hover:text-time-gold text-deep-ocean shadow-md transition-all duration-300 border border-border"
//                     >
//                         <X size={18} strokeWidth={2}/>
//                     </button>
//                 </div>
//
//                 {/* --- 2. 内容滚动区 --- */}
//                 <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
//
//                     {/* 标题部分 */}
//                     <div className="relative">
//                         {/* 左侧装饰竖线：精密仪器的刻度感 */}
//                         <div className="absolute -left-4 top-1 bottom-1 w-0.5 bg-time-gold/50 rounded-full"></div>
//
//                         <div
//                             className="flex items-center gap-3 mb-2 text-faded-slate text-[10px] font-mono tracking-widest uppercase">
//                             <span className="flex items-center gap-1"><Clock size={12}/> Chrono-Index</span>
//                             <span className="w-px h-3 bg-faded-slate/30"></span>
//                             <span>ID: {location.id.substring(0, 8)}</span>
//                         </div>
//
//                         <h2 className="text-3xl font-serif text-deep-ocean font-bold leading-tight text-balance">
//                             {location.fullData?.image_source || "Unidentified Chronicle"}
//                         </h2>
//                     </div>
//
//                     {/* 数据仪表盘 (Grid Layout) */}
//                     <div className="grid grid-cols-2 gap-4">
//                         {/* 匹配度卡片 */}
//                         <div
//                             className="p-4 rounded-lg bg-deep-ocean/5 border border-border flex flex-col justify-between group hover:border-time-gold/30 transition-colors">
//                             <div className="flex justify-between items-start mb-2">
//                                 <Scan size={16} className="text-time-gold"/>
//                                 <span className="text-[10px] font-bold text-faded-slate uppercase">Confidence</span>
//                             </div>
//                             <div className="flex items-baseline gap-1">
//                                 <span className="text-3xl font-mono font-light text-deep-ocean">{scorePercent}</span>
//                                 <span className="text-xs text-faded-slate">%</span>
//                             </div>
//                             {/* 简单的进度条 */}
//                             <div className="w-full h-1 bg-deep-ocean/10 rounded-full mt-2 overflow-hidden">
//                                 <div className="h-full bg-time-gold shadow-md shadow-time-gold/50"
//                                      style={{width: `${scorePercent}%`}}></div>
//                             </div>
//                         </div>
//
//                         {/* 坐标卡片 */}
//                         <div
//                             className="p-4 rounded-lg bg-deep-ocean/5 border border-border group hover:border-deep-ocean/20 transition-colors relative overflow-hidden">
//                             <div className="flex justify-between items-start mb-3">
//                                 <MapPin size={16}
//                                         className="text-deep-ocean/60 group-hover:text-deep-ocean transition-colors"/>
//                                 <span className="text-[10px] font-bold text-faded-slate uppercase">Geospatial</span>
//                             </div>
//                             <div className="space-y-1">
//                                 {/* Latitude */}
//                                 <div
//                                     className="flex justify-between items-center text-xs font-mono text-deep-ocean border-b border-border pb-1">
//                                     <span className="text-faded-slate">LAT</span>
//                                     <span>{location.lat.toFixed(5)} N</span>
//                                 </div>
//                                 {/* Longitude */}
//                                 <div
//                                     className="flex justify-between items-center text-xs font-mono text-deep-ocean pt-1">
//                                     <span className="text-faded-slate">LON</span>
//                                     <span>{location.lon.toFixed(5)} E</span>
//                                 </div>
//                                 <div
//                                     className="flex justify-between items-center text-xs font-mono text-deep-ocean pt-1">
//                                     <span className="text-faded-slate">LON</span>
//                                     <span>{location.pixel_coords[0]} </span>
//                                     <span>{location.pixel_coords[1]} </span>
//                                 </div>
//                             </div>
//                             <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="absolute bottom-1 right-1 h-6 w-6 text-faded-slate hover:text-time-gold"
//                                 onClick={() => copyToClipboard(`${location.lat}, ${location.lon}`)}
//                             >
//                                 <Copy size={12}/>
//                             </Button>
//                         </div>
//                     </div>
//
//                     {/* 描述/上下文区域 */}
//                     <div className="space-y-3 pt-4">
//                         <h3 className="text-sm font-bold text-deep-ocean border-b border-border pb-2 flex items-center gap-2">
//                             <span className="w-1.5 h-1.5 rounded-full bg-time-gold"></span>
//                             Historical Context
//                         </h3>
//                         <div className="text-sm text-slate-600 leading-relaxed font-serif text-justify">
//                             <p>
//                                 Temporal cross-referencing confirms this map fragment aligns perfectly with the known
//                                 18th-century cartographic dataset for the Venice region. The high confidence score
//                                 suggests that, despite the chronological gap, the spatial data remains largely intact,
//                                 offering a unique temporal perspective on this location.
//                             </p>
//                         </div>
//                     </div>
//
//                 </div>
//
//                 {/* --- 3. 底部操作栏 --- */}
//                 <div className="p-6 border-t border-border bg-deep-ocean/5 backdrop-blur-sm shrink-0">
//                     <Button
//                         className="w-full h-12 bg-deep-ocean hover:bg-deep-ocean/90 text-atlas-paper font-serif tracking-wide shadow-lg shadow-deep-ocean/20 rounded-md group"
//                         style={{backgroundColor: 'var(--deep-ocean)'}}
//                     >
//                         <MapPin className="mr-2 h-4 w-4 group-hover:-translate-y-1 transition-transform"/>
//                         NAVIGATE TO FRAGMENT
//                     </Button>
//                 </div>
//             </SheetContent>
//         </Sheet>
//     );
// }


// 'use client';
//
// import {Sheet, SheetContent} from "@/components/ui/sheet";
// import {Badge} from "@/components/ui/badge";
// import {Copy, MapPin, Scan, Clock, X, FileText, ScrollText, Database, User, Globe, Tag} from "lucide-react";
// import {Button} from "@/components/ui/button";
//
// // 复制功能
// const copyToClipboard = (text) => {
//     if (!text) return;
//     navigator.clipboard.writeText(text);
// };
//
// // --- 辅助组件：通用元数据行 ---
// const MetaRow = ({label, value, icon: Icon}) => {
//     if (value === null || value === undefined || value === "") return null;
//     return (
//         <div
//             className="flex justify-between items-start py-2.5 border-b border-border/40 last:border-0 group hover:bg-black/5 px-2 rounded-md transition-colors">
//             <div className="flex items-center gap-2 text-faded-slate shrink-0">
//                 {Icon ? <Icon size={14}/> : <div className="w-3.5"/>} {/* 占位符保持对齐 */}
//                 <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
//             </div>
//             <span
//                 className="text-sm font-serif text-deep-ocean text-right max-w-[65%] break-words leading-tight selection:bg-time-gold/30">
//                 {String(value)}
//             </span>
//         </div>
//     );
// };
//
// export function LocationDetailsSheet({location, open, onOpenChange}) {
//     if (!location) return null;
//
//     // 1. 判断数据类型
//     // 兼容后端直接返回 type 字段，或者藏在 fullData 里
//     const type = location.fullData?.type || location.type || 'map_tile';
//     const isDocument = type === 'document';
//
//     // 2. 提取数据
//     const meta = location.fullData || {};
//     const scorePercent = (location.score * 100).toFixed(1);
//
//     // 假设的底图 (仅用于地图切片展示)
//     const fullMapUrl = "/maps/raw/sample_venice_map_3.jpg";
//
//     return (
//         <Sheet
//             open={open}
//             onOpenChange={onOpenChange}
//             modal={false} // 允许操作地图
//         >
//             <SheetContent
//                 // 使用 bg-ceramic 配合磨砂效果
//                 className="w-[450px] sm:w-[550px] p-0 border-l border-border/60 shadow-2xl bg-[#fdfbf7]/95 backdrop-blur-md z-[2000] focus-visible:outline-none flex flex-col h-full overflow-hidden [&>button]:hidden"
//                 onInteractOutside={(e) => e.preventDefault()}
//             >
//                 {/* ================= 1. 顶部视觉区域 (Visual Header) ================= */}
//                 <div className="relative w-full h-[240px] shrink-0 border-b border-border overflow-hidden group">
//
//                     {/* 关闭按钮 */}
//                     <button
//                         onClick={() => onOpenChange(false)}
//                         className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/80 hover:bg-deep-ocean hover:text-time-gold text-deep-ocean shadow-md transition-all duration-300 border border-border"
//                     >
//                         <X size={18} strokeWidth={2}/>
//                     </button>
//
//                     {isDocument ? (
//                         // --- A. 文献模式 Header ---
//                         <div
//                             className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#f4f1ea]">
//                             {/* 背景纹理：纸张质感 */}
//                             <div
//                                 className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] mix-blend-multiply"></div>
//
//                             {/* 图标徽章 */}
//                             <div
//                                 className="relative w-20 h-20 rounded-full bg-white border-4 border-double border-time-gold/40 flex items-center justify-center mb-5 shadow-sm z-10">
//                                 <ScrollText size={36} className="text-time-gold drop-shadow-sm"/>
//                             </div>
//
//                             {/* 标题 */}
//                             <h2 className="relative z-10 text-2xl font-serif font-bold text-deep-ocean line-clamp-2 px-4 leading-tight">
//                                 {meta.source_dataset || "Historical Archive"}
//                             </h2>
//
//                             {/* 快速标签 */}
//                             <div className="relative z-10 mt-3 flex flex-wrap justify-center gap-2">
//                                 <Badge variant="outline"
//                                        className="bg-white/60 border-deep-ocean/10 text-deep-ocean text-[10px] tracking-wider uppercase">
//                                     <Clock size={10} className="mr-1.5"/> {meta.year || "Unknown Era"}
//                                 </Badge>
//                                 <Badge variant="outline"
//                                        className="bg-white/60 border-deep-ocean/10 text-deep-ocean text-[10px] tracking-wider uppercase">
//                                     ID: {location.id.substring(0, 8)}
//                                 </Badge>
//                             </div>
//                         </div>
//                     ) : (
//                         // --- B. 地图模式 Header ---
//                         <div className="w-full h-full bg-deep-ocean/5 relative">
//                             {/* 背景模糊 */}
//                             <div
//                                 className="absolute inset-0 bg-cover bg-center blur-md opacity-40 scale-110 grayscale-[20%]"
//                                 style={{backgroundImage: `url(${fullMapUrl})`}}
//                             />
//
//                             {/* 切片透镜效果 */}
//                             <div className="absolute inset-0 flex items-center justify-center">
//                                 {location.pixel_coords ? (
//                                     <div
//                                         className="relative group/lens shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
//                                         {/* 金色边框 */}
//                                         <div
//                                             className="absolute -inset-1.5 border border-time-gold/50 rounded-sm opacity-60"></div>
//
//                                         <div
//                                             className="relative w-64 h-40 overflow-hidden bg-atlas-paper border-4 border-white rounded-sm shadow-inner">
//                                             <div
//                                                 className="w-full h-full transition-all duration-700 filter contrast-[1.1] sepia-[0.15] group-hover/lens:scale-110"
//                                                 style={{
//                                                     backgroundRepeat: 'no-repeat',
//                                                     backgroundImage: `url(${fullMapUrl})`,
//                                                     // 根据像素坐标定位
//                                                     backgroundPosition: `-${location.pixel_coords[0]}px -${location.pixel_coords[1]}px`,
//                                                 }}
//                                             />
//                                             {/* 扫描动画 */}
//                                             <div
//                                                 className="absolute inset-0 bg-gradient-to-b from-transparent via-time-gold/20 to-transparent h-[200%] w-full animate-scan pointer-events-none opacity-50"></div>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <div className="flex flex-col items-center text-faded-slate/50">
//                                         <Globe size={48} strokeWidth={1}/>
//                                         <span className="text-sm mt-2 italic font-serif">Visual fragment data unavailable</span>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//
//                 {/* ================= 2. 内容滚动区 ================= */}
//                 <div className="flex-1 overflow-y-auto custom-scrollbar px-8 py-6 space-y-8">
//
//                     {/* 顶部状态栏 */}
//                     <div className="flex justify-between items-end border-b border-border pb-4">
//                         <div>
//                             <div
//                                 className="flex items-center gap-2 text-faded-slate text-[10px] font-mono tracking-widest uppercase mb-1">
//                                 <Database size={12}/>
//                                 <span>{isDocument ? "Textual Record" : "Cartographic Fragment"}</span>
//                             </div>
//                             <h1 className="text-xl font-serif text-deep-ocean font-bold">
//                                 {isDocument ? "Document Details" : "Map Location"}
//                             </h1>
//                         </div>
//                         {/* 匹配度 */}
//                         <div className="text-right">
//                             <div className="text-[10px] font-bold text-faded-slate uppercase mb-0.5">Confidence</div>
//                             <div
//                                 className="text-2xl font-mono text-time-gold font-light tracking-tighter">{scorePercent}%
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* --- A. 文献内容摘要 (Transcript) --- */}
//                     {isDocument && (
//                         <div className="relative">
//                             <h3 className="text-xs font-bold text-deep-ocean mb-3 uppercase tracking-wide flex items-center gap-2">
//                                 <FileText size={14} className="text-time-gold"/>
//                                 Transcript
//                             </h3>
//                             <div
//                                 className="bg-white p-6 rounded-lg border border-border/60 shadow-sm relative overflow-hidden group hover:border-time-gold/30 transition-colors">
//                                 {/* 装饰引号 */}
//                                 <div
//                                     className="absolute top-2 left-3 text-6xl font-serif text-deep-ocean/5 pointer-events-none">“
//                                 </div>
//
//                                 <p className="font-serif text-lg leading-relaxed text-deep-ocean/90 italic relative z-10 selection:bg-time-gold/20">
//                                     {meta.content || location.content || "No transcript available."}
//                                 </p>
//
//                                 <div
//                                     className="absolute bottom-2 right-3 text-6xl font-serif text-deep-ocean/5 pointer-events-none rotate-180">“
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//
//                     {/* --- B. 元数据列表 (Metadata Registry) --- */}
//                     <div>
//                         <h3 className="text-xs font-bold text-deep-ocean mb-3 uppercase tracking-wide flex items-center gap-2">
//                             <Scan size={14} className="text-time-gold"/>
//                             Metadata Registry
//                         </h3>
//
//                         <div className="bg-white/60 rounded-lg border border-border/60 px-4 py-1 shadow-sm">
//                             {/* 1. 基础字段 */}
//                             <MetaRow label="Dataset" value={meta.source_dataset || meta.source_image} icon={Database}/>
//                             <MetaRow label="Year" value={meta.year} icon={Clock}/>
//                             <MetaRow label="Record ID" value={meta.original_id || location.id} icon={Scan}/>
//
//                             {/* 2. 动态遍历 Metadata 字典 (排除已显示的) */}
//                             {meta.metadata && typeof meta.metadata === 'object' && Object.entries(meta.metadata).map(([key, value]) => {
//                                 // 过滤掉技术字段或已展示字段
//                                 if (['uid', 'author_geo', 'year'].includes(key)) return null;
//
//                                 // 格式化 Key: "author_name" -> "Author Name"
//                                 const formattedLabel = key.replace(/_/g, ' ');
//
//                                 return <MetaRow key={key} label={formattedLabel} value={value} icon={Tag}/>;
//                             })}
//
//                             {/* 3. 特殊字段处理 */}
//                             {meta.chunk_id && <MetaRow label="Chunk Sequence" value={meta.chunk_id}/>}
//
//                             {/* 4. 地图特有字段 */}
//                             {!isDocument && (
//                                 <>
//                                     <MetaRow label="Pixel Coordinates" value={location.pixel_coords?.join(', ')}/>
//                                     {meta.geo_detail && (
//                                         <MetaRow label="Geo Bounds" value="Polygon Data Available"/>
//                                     )}
//                                 </>
//                             )}
//                         </div>
//                     </div>
//
//                     {/* --- C. 坐标卡片 (通用) --- */}
//                     <div
//                         className="p-4 rounded-lg bg-deep-ocean/5 border border-border/60 flex items-center justify-between group hover:border-deep-ocean/20 transition-colors">
//                         <div className="flex items-center gap-4">
//                             <div
//                                 className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-deep-ocean shadow-sm border border-border/50">
//                                 <MapPin size={18}/>
//                             </div>
//                             <div>
//                                 <div className="text-[10px] font-bold text-faded-slate uppercase">Coordinates (WGS84)
//                                 </div>
//                                 <div className="font-mono text-sm text-deep-ocean font-medium mt-0.5">
//                                     {location.lat.toFixed(6)}, {location.lon.toFixed(6)}
//                                 </div>
//                             </div>
//                         </div>
//                         <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => copyToClipboard(`${location.lat}, ${location.lon}`)}
//                             className="text-faded-slate hover:text-deep-ocean hover:bg-white/50"
//                         >
//                             <Copy size={14} className="mr-2"/> Copy
//                         </Button>
//                     </div>
//
//                     {/* 底部留白，防止被按钮遮挡 */}
//                     <div className="h-4"></div>
//                 </div>
//
//                 {/* ================= 3. 底部操作栏 ================= */}
//                 <div className="p-6 border-t border-border bg-[#fdfbf7]/90 backdrop-blur-md shrink-0">
//                     <Button
//                         className={`w-full h-12 font-serif tracking-wide shadow-lg rounded-md group transition-all duration-300
//                             ${isDocument
//                             ? "bg-deep-ocean hover:bg-deep-ocean/90 text-white"
//                             : "bg-deep-ocean hover:bg-deep-ocean/90 text-white"
//                         }`}
//                     >
//                         {isDocument ? (
//                             <div className="flex items-center">
//                                 <MapPin
//                                     className="mr-2 h-4 w-4 text-time-gold group-hover:-translate-y-1 transition-transform"/>
//                                 <span>LOCATE DOCUMENT ON MAP</span>
//                             </div>
//                         ) : (
//                             <div className="flex items-center">
//                                 <MapPin
//                                     className="mr-2 h-4 w-4 text-time-gold group-hover:-translate-y-1 transition-transform"/>
//                                 <span>NAVIGATE TO FRAGMENT</span>
//                             </div>
//                         )}
//                     </Button>
//                 </div>
//             </SheetContent>
//         </Sheet>
//     );
// }

// 'use client';
//
// import {Sheet, SheetContent} from "@/components/ui/sheet";
// import {Badge} from "@/components/ui/badge";
// import {
//     X, ScrollText, Database,
//     User, Tag, Hash, AlignLeft,
//     MapPin, Copy, Layers, Briefcase, Landmark, Calendar,
//     Globe, Scan, Image as ImageIcon
// } from "lucide-react";
// import {Button} from "@/components/ui/button";
//
// // --- 辅助函数：格式化 Key ---
// const formatKey = (key) => {
//     if (!key) return "";
//     return key
//         .replace(/_/g, ' ')
//         .replace(/\b\w/g, (l) => l.toUpperCase());
// };
//
// // --- 元数据行组件 (通用) ---
// const MetaRow = ({label, value, icon: Icon}) => {
//     if (value === null || value === undefined || value === "") return null;
//     const displayValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
//
//     return (
//         <div
//             className="group flex items-start justify-between py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 px-3 rounded-md transition-colors">
//             <div className="flex items-center gap-2.5 text-slate-500 shrink-0 mt-0.5 max-w-[45%]">
//                 {Icon ? <Icon size={14} className="text-orange-500/70 shrink-0"/> :
//                     <Tag size={14} className="text-slate-400 shrink-0"/>}
//                 <span className="text-[10px] font-bold uppercase tracking-widest break-words leading-tight">
//                     {label}
//                 </span>
//             </div>
//             <span
//                 className="text-sm font-medium text-slate-800 text-right max-w-[55%] break-words leading-tight font-mono select-text">
//                 {displayValue}
//             </span>
//         </div>
//     );
// };
//
// export function LocationDetailsSheet({location, open, onOpenChange}) {
//     if (!location) return null;
//
//     // --- 1. 数据识别与提取 ---
//     const type = location.fullData?.type || location.type || 'map_tile';
//     const isDocument = type === 'document' || type === 'text';
//
//     const rootMeta = location.fullData || {};
//
//     // 自动寻找数据源 (Text 模式用)
//     const displayData = rootMeta.full_metadata || rootMeta.metadata || rootMeta;
//
//     // 地图模式专用：假设的底图 (仅用于切片透镜展示)
//     // 实际项目中你可以根据 rootMeta.source_image 来动态决定底图 URL
//     const fullMapUrl = "/maps/raw/sample_venice_map_3.jpg";
//
//     // 复制功能
//     const copyContent = () => {
//         const text = rootMeta.content || location.content;
//         if (text) navigator.clipboard.writeText(text);
//     };
//
//     return (
//         <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
//             <SheetContent
//                 className="w-[450px] sm:w-[550px] p-0 border-l border-slate-200 shadow-2xl bg-white/95 backdrop-blur-xl z-[2000] focus-visible:outline-none flex flex-col h-full overflow-hidden [&>button]:hidden"
//                 onInteractOutside={(e) => e.preventDefault()}
//             >
//                 {/* 关闭按钮 (公用) */}
//                 <button
//                     onClick={() => onOpenChange(false)}
//                     className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/80 hover:bg-slate-900 hover:text-white text-slate-700 shadow-sm transition-all border border-slate-200"
//                 >
//                     <X size={18}/>
//                 </button>
//
//                 {/* =========================================================
//                     分支渲染： 文档模式 (TEXT) vs 地图模式 (MAP)
//                    ========================================================= */}
//
//                 {isDocument ? (
//                     // #################### 1. 文档模式视图 ####################
//                     <>
//                         {/* Header: 纸张/档案风格 */}
//                         <div
//                             className="relative w-full h-[160px] shrink-0 border-b border-slate-200 overflow-hidden bg-slate-50">
//                             <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
//                                 <div
//                                     className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-3 shadow-sm">
//                                     <ScrollText size={24} className="text-orange-600"/>
//                                 </div>
//                                 <h2 className="text-lg font-serif font-bold text-slate-900 line-clamp-1 px-4">
//                                     {displayData.owner_name || displayData.owner_name_geo || rootMeta.source_dataset || "Historical Record"}
//                                 </h2>
//                                 <div className="mt-2 flex gap-2 justify-center">
//                                     <Badge variant="outline" className="bg-white text-slate-500 font-mono text-[10px]">
//                                         {displayData.uid || location.id.substring(0, 8)}
//                                     </Badge>
//                                     {(displayData.an_rendi || displayData.year) && (
//                                         <Badge variant="secondary"
//                                                className="bg-orange-50 text-orange-700 border-orange-100 font-mono text-[10px]">
//                                             {displayData.an_rendi || displayData.year}
//                                         </Badge>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//
//                         {/* Body: 全量属性列表 */}
//                         <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6 space-y-8">
//                             {/* Transcript */}
//                             {(rootMeta.content || location.content) && (
//                                 <div>
//                                     <div className="flex items-center justify-between mb-3">
//                                         <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
//                                             <AlignLeft size={14} className="text-orange-500"/>
//                                             Transcript
//                                         </h3>
//                                         <Button variant="ghost" size="sm" onClick={copyContent}
//                                                 className="h-6 text-[10px] text-slate-400 hover:text-orange-600">
//                                             <Copy size={12} className="mr-1"/> Copy
//                                         </Button>
//                                     </div>
//                                     <div
//                                         className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-slate-700 font-serif leading-relaxed text-sm whitespace-pre-wrap max-h-40 overflow-y-auto">
//                                         {rootMeta.content || location.content}
//                                     </div>
//                                 </div>
//                             )}
//
//                             {/* Full Metadata List */}
//                             <div>
//                                 <div className="flex items-center justify-between mb-4">
//                                     <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
//                                         <Database size={14} className="text-orange-500"/>
//                                         Full Attributes
//                                     </h3>
//                                     <span className="text-[10px] text-slate-400 font-mono">
//                                         {Object.keys(displayData).length} Fields
//                                     </span>
//                                 </div>
//                                 <div
//                                     className="bg-white rounded-xl border border-slate-200 px-1 shadow-sm overflow-hidden">
//                                     {Object.entries(displayData).map(([key, value]) => {
//                                         const blacklist = ['content', 'text_vector', 'pe_vector', 'location', 'pixel_coords', 'Unnamed: 0', 'type', 'full_metadata', 'metadata', 'tif_path_img', 'path_img'];
//                                         if (blacklist.includes(key)) return null;
//
//                                         let Icon = Tag;
//                                         const k = key.toLowerCase();
//                                         if (k.includes('author') || k.includes('ten_name')) Icon = User;
//                                         else if (k.includes('place') || k.includes('parish') || k.includes('geo')) Icon = MapPin;
//                                         else if (k.includes('owner') || k.includes('entity')) Icon = Landmark;
//                                         else if (k.includes('function') || k.includes('bottega')) Icon = Briefcase;
//                                         else if (k.includes('code') || k.includes('id') || k.includes('uid')) Icon = Hash;
//                                         else if (k.includes('year') || k.includes('an_rendi')) Icon = Calendar;
//                                         else if (k.includes('path') || k.includes('img')) Icon = Layers;
//
//                                         return <MetaRow key={key} label={formatKey(key)} value={value} icon={Icon}/>;
//                                     })}
//                                 </div>
//                             </div>
//                         </div>
//                     </>
//                 ) : (
//                     // #################### 2. 地图模式视图 (Visual Style) ####################
//                     <>
//                         {/* Header: 切片透镜效果 */}
//                         <div
//                             className="relative w-full h-[240px] shrink-0 border-b border-slate-200 overflow-hidden group bg-slate-100">
//                             {/* 背景模糊 */}
//                             <div
//                                 className="absolute inset-0 bg-cover bg-center blur-md opacity-40 scale-110 grayscale-[20%]"
//                                 style={{backgroundImage: `url(${fullMapUrl})`}}
//                             />
//
//                             {/* 切片透镜 */}
//                             <div className="absolute inset-0 flex items-center justify-center">
//                                 {location.pixel_coords ? (
//                                     <div
//                                         className="relative group/lens shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
//                                         {/* 金色边框 */}
//                                         <div
//                                             className="absolute -inset-1.5 border border-orange-400/50 rounded-sm opacity-60"></div>
//
//                                         <div
//                                             className="relative w-64 h-40 overflow-hidden bg-slate-200 border-4 border-white rounded-sm shadow-inner">
//                                             <div
//                                                 className="w-full h-full transition-all duration-700 filter contrast-[1.1] sepia-[0.15] group-hover/lens:scale-110"
//                                                 style={{
//                                                     backgroundRepeat: 'no-repeat',
//                                                     backgroundImage: `url(${fullMapUrl})`,
//                                                     // 根据像素坐标定位
//                                                     backgroundPosition: `-${location.pixel_coords[0]}px -${location.pixel_coords[1]}px`,
//                                                 }}
//                                             />
//                                             {/* 扫描动画 */}
//                                             <div
//                                                 className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-400/20 to-transparent h-[200%] w-full animate-scan pointer-events-none opacity-50"></div>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <div className="flex flex-col items-center text-slate-400/50">
//                                         <Globe size={48} strokeWidth={1}/>
//                                         <span className="text-sm mt-2 italic font-serif">Visual data unavailable</span>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//
//                         {/* Body: 地图信息 */}
//                         <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6 space-y-8">
//                             {/* 标题 */}
//                             <div>
//                                 <div
//                                     className="flex items-center gap-2 text-slate-400 text-[10px] font-mono tracking-widest uppercase mb-1">
//                                     <ImageIcon size={12}/>
//                                     <span>Cartographic Fragment</span>
//                                 </div>
//                                 <h1 className="text-xl font-serif text-slate-900 font-bold">
//                                     {location.content || "Map Tile"}
//                                 </h1>
//                             </div>
//
//                             {/* 坐标卡片 */}
//                             <div
//                                 className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between group hover:border-slate-300 transition-colors">
//                                 <div className="flex items-center gap-4">
//                                     <div
//                                         className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 shadow-sm border border-slate-100">
//                                         <MapPin size={18}/>
//                                     </div>
//                                     <div>
//                                         <div className="text-[10px] font-bold text-slate-400 uppercase">Coordinates
//                                             (WGS84)
//                                         </div>
//                                         <div className="font-mono text-sm text-slate-900 font-medium mt-0.5">
//                                             {location.lat.toFixed(6)}, {location.lon.toFixed(6)}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//
//                             {/* 简要元数据 (地图不需要展示太多杂项) */}
//                             <div>
//                                 <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 mb-4">
//                                     <Scan size={14} className="text-orange-500"/>
//                                     Tile Details
//                                 </h3>
//                                 <div className="bg-white rounded-xl border border-slate-200 px-1 shadow-sm">
//                                     <MetaRow label="Year" value={rootMeta.year} icon={Calendar}/>
//                                     <MetaRow label="Dataset" value={rootMeta.source_dataset} icon={Database}/>
//                                     <MetaRow label="Pixel Coords" value={location.pixel_coords?.join(', ')}
//                                              icon={Layers}/>
//                                 </div>
//                             </div>
//                         </div>
//                     </>
//                 )}
//
//                 {/* Footer (公用) */}
//                 <div className="p-5 border-t border-slate-100 bg-white shrink-0">
//                     <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white shadow-lg">
//                         {isDocument ? "Locate Document Origin" : "Navigate to Location"}
//                     </Button>
//                 </div>
//             </SheetContent>
//         </Sheet>
//     );
// }

// 'use client';
//
// import {Sheet, SheetContent} from "@/components/ui/sheet";
// import {Badge} from "@/components/ui/badge";
// import {
//     X, ScrollText, Database,
//     User, Tag, Hash, AlignLeft,
//     MapPin, Copy, Layers, Briefcase, Landmark, Calendar,
//     Globe, Scan, Image as ImageIcon, Info
// } from "lucide-react";
// import {Button} from "@/components/ui/button";
// import {useMemo} from "react";
//
// // --- 辅助函数：格式化 Key ---
// const formatKey = (key) => {
//     if (!key) return "";
//     // 将 "Function Class (TOP)" 这种格式稍微美化一下
//     return key
//         .replace(/_/g, ' ')
//         .replace(/\b\w/g, (l) => l.toUpperCase());
// };
//
// // --- 辅助函数：智能解析与扁平化元数据 ---
// const processMetadata = (rawMetadata) => {
//     if (!rawMetadata) return [];
//
//     let data = rawMetadata;
//
//     // 1. 如果是 JSON 字符串，先解析
//     if (typeof rawMetadata === 'string') {
//         try {
//             data = JSON.parse(rawMetadata);
//         } catch (e) {
//             console.error("JSON Parse Error:", e);
//             return []; // 解析失败返回空或原样
//         }
//     }
//
//     // 如果解析出来不是对象（比如是 null 或纯数字），直接返回
//     if (typeof data !== 'object' || data === null) return [];
//
//     const flattened = [];
//
//     // 2. 递归/遍历处理嵌套结构
//     Object.entries(data).forEach(([key, value]) => {
//         // 过滤掉值为 null, undefined 或空字符串的字段
//         if (value === null || value === undefined || value === "") return;
//
//         // 黑名单过滤 (不需要在列表中显示的字段)
//         const blacklist = ['content', 'text_vector', 'pe_vector', 'location', 'pixel_coords', 'Unnamed: 0', 'type', 'full_metadata', 'metadata', 'tif_path_img', 'path_img'];
//         if (blacklist.includes(key)) return;
//
//         if (Array.isArray(value)) {
//             // Case A: 数组 -> 转成逗号分隔字符串 (例如 Owners: ["A", "B"] -> "A, B")
//             if (value.length > 0) {
//                 flattened.push({key: key, value: value.join(", ")});
//             }
//         } else if (typeof value === 'object') {
//             // Case B: 嵌套对象 -> 展开 (例如 "Function Class": {"TOP": "CASA"} -> key: "Function Class (Top)", value: "CASA")
//             Object.entries(value).forEach(([subKey, subValue]) => {
//                 if (subValue !== null && subValue !== "") {
//                     flattened.push({
//                         key: `${key} (${subKey})`, // 组合 Key 名
//                         value: subValue
//                     });
//                 }
//             });
//         } else {
//             // Case C: 普通值 (数字、字符串)
//             flattened.push({key: key, value: value});
//         }
//     });
//
//     return flattened;
// };
//
// // --- 元数据行组件 ---
// const MetaRow = ({label, value, icon: Icon}) => {
//     return (
//         <div
//             className="group flex items-start justify-between py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 px-3 rounded-md transition-colors">
//             <div className="flex items-center gap-2.5 text-slate-500 shrink-0 mt-0.5 max-w-[45%]">
//                 {Icon ? <Icon size={14} className="text-orange-500/70 shrink-0"/> :
//                     <Tag size={14} className="text-slate-400 shrink-0"/>}
//                 <span className="text-[10px] font-bold uppercase tracking-widest break-words leading-tight">
//                     {label}
//                 </span>
//             </div>
//             <span
//                 className="text-sm font-medium text-slate-800 text-right max-w-[55%] break-words leading-tight font-mono select-text">
//                 {String(value)}
//             </span>
//         </div>
//     );
// };
//
// // --- 自动匹配图标 ---
// const getIconForKey = (key) => {
//     const k = key.toLowerCase();
//     if (k.includes('author') || k.includes('owner') || k.includes('tenant') || k.includes('families') || k.includes('people')) return User;
//     if (k.includes('place') || k.includes('parish') || k.includes('district') || k.includes('geo')) return MapPin;
//     if (k.includes('entity') || k.includes('property')) return Landmark;
//     if (k.includes('function') || k.includes('trade') || k.includes('economics') || k.includes('rent')) return Briefcase;
//     if (k.includes('code') || k.includes('id') || k.includes('uid')) return Hash;
//     if (k.includes('year') || k.includes('date') || k.includes('an_rendi')) return Calendar;
//     if (k.includes('notes')) return Info;
//     return Tag;
// };
//
// export function LocationDetailsSheet({location, open, onOpenChange}) {
//     if (!location) return null;
//
//     // --- 1. 数据识别与提取 ---
//     const type = location.fullData?.type || location.type || 'map_tile';
//     const isDocument = type === 'document' || type === 'text';
//     const rootMeta = location.fullData || {};
//
//     // 确定要展示的主要数据源
//     // 优先取 full_metadata，其次取 metadata，最后取 rootMeta 本身
//     const rawSourceData = rootMeta.full_metadata || rootMeta.metadata || rootMeta;
//
//     // 使用 useMemo 缓存处理后的扁平数据，避免重复计算
//     const displayRows = useMemo(() => processMetadata(rawSourceData), [rawSourceData]);
//
//     // 提取 Header 显示用的特定字段 (防止解析后找不到)
//     // 这里的逻辑稍微宽容一点，尝试从解析后的对象找，或者从原始对象找
//     let parsedObj = {};
//     try {
//         parsedObj = typeof rawSourceData === 'string' ? JSON.parse(rawSourceData) : rawSourceData;
//     } catch (e) {
//     }
//
//     const title = parsedObj.owner_name || parsedObj.Owner || parsedObj.Place || rootMeta.source_dataset || "Historical Record";
//     const year = parsedObj.an_rendi || parsedObj.Year || parsedObj.year;
//     const uid = parsedObj.uid || parsedObj.id || location.id?.substring(0, 8);
//     const contentText = parsedObj.content || rootMeta.content || location.content;
//
//     // 地图模式专用
//     const fullMapUrl = "/maps/raw/sample_venice_map_3.jpg";
//
//     const copyContent = () => {
//         if (contentText) navigator.clipboard.writeText(contentText);
//     };
//
//     return (
//         <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
//             {/* 修改点：确保 onInteractOutside 不会阻止点击遮罩关闭
//                 如果想点击外部关闭，去掉 preventDefault；如果不想关闭，保留它。
//                 通常 Sidebar 模式点击地图希望关闭 Sidebar，所以去掉 preventDefault 比较好。
//             */}
//             <SheetContent
//                 className="w-[450px] sm:w-[550px] p-0 border-l border-slate-200 shadow-2xl bg-white/95 backdrop-blur-xl z-[2000] focus-visible:outline-none flex flex-col h-full overflow-hidden [&>button]:hidden"
//                 side="right"
//             >
//                 {/* 🔥 关闭按钮 (已优化样式和层级) */}
//                 <button
//                     onClick={() => onOpenChange(false)}
//                     className="absolute top-5 right-5 z-50 p-2 rounded-full bg-white/90 hover:bg-slate-100 hover:text-red-500 text-slate-500 shadow-sm border border-slate-200 transition-all duration-200 group"
//                     title="Close Details"
//                 >
//                     <X size={20} strokeWidth={2.5} className="group-hover:scale-110 transition-transform"/>
//                 </button>
//
//                 {/* =========================================================
//                     分支渲染： 文档模式 (TEXT) vs 地图模式 (MAP)
//                    ========================================================= */}
//
//                 {isDocument ? (
//                     // #################### 1. 文档模式视图 ####################
//                     <>
//                         {/* Header */}
//                         <div
//                             className="relative w-full shrink-0 border-b border-slate-200 bg-slate-50/80 pt-12 pb-6 px-6">
//                             <div className="flex flex-col items-center text-center">
//                                 <div
//                                     className="w-14 h-14 rounded-2xl bg-white border border-orange-100 flex items-center justify-center mb-4 shadow-sm">
//                                     <ScrollText size={28} className="text-orange-600" strokeWidth={1.5}/>
//                                 </div>
//                                 <h2 className="text-xl font-serif font-bold text-slate-900 leading-tight px-2">
//                                     {title}
//                                 </h2>
//                                 <div className="mt-3 flex gap-2 justify-center flex-wrap">
//                                     <Badge variant="outline"
//                                            className="bg-white/50 text-slate-500 font-mono text-[10px] border-slate-200">
//                                         ID: {uid}
//                                     </Badge>
//                                     {year && (
//                                         <Badge variant="secondary"
//                                                className="bg-orange-100/50 text-orange-800 border-orange-100 font-mono text-[10px] px-2">
//                                             Year: {year}
//                                         </Badge>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//
//                         {/* Body */}
//                         <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6 space-y-8">
//                             {/* Transcript 部分 */}
//                             {contentText && (
//                                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
//                                     <div className="flex items-center justify-between mb-3">
//                                         <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
//                                             <AlignLeft size={14} className="text-orange-500"/>
//                                             Transcript
//                                         </h3>
//                                         <Button variant="ghost" size="sm" onClick={copyContent}
//                                                 className="h-6 text-[10px] text-slate-400 hover:text-orange-600 px-2">
//                                             <Copy size={12} className="mr-1"/> Copy Text
//                                         </Button>
//                                     </div>
//                                     <div
//                                         className="bg-slate-50/50 p-5 rounded-xl border border-slate-200/60 text-slate-700 font-serif leading-relaxed text-sm whitespace-pre-wrap shadow-sm">
//                                         {contentText}
//                                     </div>
//                                 </div>
//                             )}
//
//                             {/* Full Metadata List (使用的是 displayRows) */}
//                             <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
//                                 <div className="flex items-center justify-between mb-4">
//                                     <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
//                                         <Database size={14} className="text-orange-500"/>
//                                         Data Attributes
//                                     </h3>
//                                     <span
//                                         className="text-[10px] text-slate-400 font-mono bg-slate-100 px-1.5 py-0.5 rounded">
//                                         {displayRows.length} Fields
//                                     </span>
//                                 </div>
//
//                                 <div
//                                     className="bg-white rounded-xl border border-slate-200 px-1 shadow-sm overflow-hidden">
//                                     {displayRows.length > 0 ? (
//                                         displayRows.map((row, idx) => (
//                                             <MetaRow
//                                                 key={idx}
//                                                 label={formatKey(row.key)}
//                                                 value={row.value}
//                                                 icon={getIconForKey(row.key)}
//                                             />
//                                         ))
//                                     ) : (
//                                         <div className="p-8 text-center text-slate-400 italic text-sm">
//                                             No additional metadata found.
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </>
//                 ) : (
//                     // #################### 2. 地图模式视图 ####################
//                     <>
//                         {/* Header: 切片透镜效果 */}
//                         <div
//                             className="relative w-full h-[260px] shrink-0 border-b border-slate-200 overflow-hidden group bg-slate-900">
//                             {/* 背景 */}
//                             <div
//                                 className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
//                                 style={{backgroundImage: `url(${fullMapUrl})`}}
//                             />
//                             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
//
//                             {/* 标题浮动在图上 */}
//                             <div className="absolute bottom-4 left-6 right-6 text-white z-10">
//                                 <div
//                                     className="flex items-center gap-2 text-orange-400 text-[10px] font-mono tracking-widest uppercase mb-1">
//                                     <ImageIcon size={12}/>
//                                     <span>Visual Fragment</span>
//                                 </div>
//                                 <h1 className="text-2xl font-serif font-bold text-white shadow-sm leading-tight">
//                                     {location.content || "Map Tile"}
//                                 </h1>
//                             </div>
//
//                             {/* 透镜 */}
//                             <div className="absolute inset-0 flex items-center justify-center pb-8 pointer-events-none">
//                                 {location.pixel_coords ? (
//                                     <div className="relative group/lens shadow-2xl">
//                                         <div className="absolute -inset-2 border border-white/20 rounded-sm"></div>
//                                         <div
//                                             className="relative w-48 h-32 overflow-hidden bg-slate-800 border-2 border-white/80 rounded-sm shadow-[0_0_30px_rgba(0,0,0,0.5)]">
//                                             <div
//                                                 className="w-full h-full filter contrast-[1.2] sepia-[0.2]"
//                                                 style={{
//                                                     backgroundRepeat: 'no-repeat',
//                                                     backgroundImage: `url(${fullMapUrl})`,
//                                                     backgroundPosition: `-${location.pixel_coords[0]}px -${location.pixel_coords[1]}px`,
//                                                 }}
//                                             />
//                                         </div>
//                                     </div>
//                                 ) : null}
//                             </div>
//                         </div>
//
//                         {/* Body */}
//                         <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6 space-y-6">
//                             {/* 坐标卡片 */}
//                             <div
//                                 className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
//                                 <div className="flex items-center gap-4">
//                                     <div
//                                         className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 shadow-sm border border-slate-100">
//                                         <MapPin size={18} className="text-blue-600"/>
//                                     </div>
//                                     <div>
//                                         <div className="text-[10px] font-bold text-slate-400 uppercase">WGS84
//                                             Coordinates
//                                         </div>
//                                         <div className="font-mono text-sm text-slate-900 font-medium mt-0.5">
//                                             {location.lat.toFixed(6)}, {location.lon.toFixed(6)}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//
//                             {/* 简要元数据 */}
//                             <div>
//                                 <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 mb-4">
//                                     <Scan size={14} className="text-orange-500"/>
//                                     Tile Details
//                                 </h3>
//                                 <div className="bg-white rounded-xl border border-slate-200 px-1 shadow-sm">
//                                     <MetaRow label="Year" value={rootMeta.year} icon={Calendar}/>
//                                     <MetaRow label="Dataset" value={rootMeta.source_dataset} icon={Database}/>
//                                     <MetaRow label="Original ID" value={location.id} icon={Hash}/>
//                                 </div>
//                             </div>
//                         </div>
//                     </>
//                 )}
//
//                 {/* Footer */}
//                 <div className="p-5 border-t border-slate-100 bg-white/50 shrink-0 flex gap-3">
//                     <Button
//                         variant="outline"
//                         onClick={() => onOpenChange(false)}
//                         className="flex-1 border-slate-200 hover:bg-slate-100 text-slate-600"
//                     >
//                         Close
//                     </Button>
//                     <Button className="flex-[2] bg-slate-900 hover:bg-slate-800 text-white shadow-lg">
//                         {isDocument ? "Locate in Archive" : "Zoom to Location"}
//                     </Button>
//                 </div>
//             </SheetContent>
//         </Sheet>
//     );
//}


// 'use client';
//
// import {Sheet, SheetContent} from "@/components/ui/sheet";
// import {Badge} from "@/components/ui/badge";
// import {
//     X, ScrollText, Database,
//     User, Tag, Hash, AlignLeft,
//     MapPin, Copy, Layers, Briefcase, Landmark, Calendar,
//     Globe, Scan, Image as ImageIcon, Info
// } from "lucide-react";
// import {Button} from "@/components/ui/button";
// import {useMemo} from "react";
//
// // ... (辅助函数 formatKey, processMetadata, MetaRow, getIconForKey 保持不变，代码省略以节省篇幅，可以直接复用上面的) ...
//
// // --- 辅助函数：格式化 Key ---
// const formatKey = (key) => {
//     if (!key) return "";
//     return key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
// };
//
// // --- 辅助函数：智能解析与扁平化元数据 ---
// const processMetadata = (rawMetadata) => {
//     if (!rawMetadata) return [];
//     let data = rawMetadata;
//
//     // 1. JSON 解析
//     if (typeof rawMetadata === 'string') {
//         try {
//             data = JSON.parse(rawMetadata);
//         } catch (e) {
//             return [];
//         }
//     }
//     if (typeof data !== 'object' || data === null) return [];
//
//     const flattened = [];
//
//     // 2. 扁平化处理
//     Object.entries(data).forEach(([key, value]) => {
//         if (value === null || value === undefined || value === "") return;
//         const blacklist = ['content', 'text_vector', 'pe_vector', 'location', 'pixel_coords', 'Unnamed: 0', 'type', 'full_metadata', 'metadata', 'tif_path_img', 'path_img'];
//         if (blacklist.includes(key)) return;
//
//         if (Array.isArray(value)) {
//             if (value.length > 0) flattened.push({key: key, value: value.join(", ")});
//         } else if (typeof value === 'object') {
//             Object.entries(value).forEach(([subKey, subValue]) => {
//                 if (subValue !== null && subValue !== "") {
//                     flattened.push({key: `${key} (${subKey})`, value: subValue});
//                 }
//             });
//         } else {
//             flattened.push({key: key, value: value});
//         }
//     });
//     return flattened;
// };
//
// // --- 图标匹配 ---
// const getIconForKey = (key) => {
//     const k = key.toLowerCase();
//     if (k.includes('author') || k.includes('owner') || k.includes('tenant') || k.includes('people')) return User;
//     if (k.includes('place') || k.includes('parish') || k.includes('district') || k.includes('geo')) return MapPin;
//     if (k.includes('entity') || k.includes('property')) return Landmark;
//     if (k.includes('function') || k.includes('trade') || k.includes('economics')) return Briefcase;
//     if (k.includes('year') || k.includes('date')) return Calendar;
//     return Tag;
// };
//
// // --- 元数据行组件 ---
// const MetaRow = ({label, value, icon: Icon}) => (
//     <div
//         className="group flex items-start justify-between py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 px-3 rounded-md transition-colors">
//         <div className="flex items-center gap-2.5 text-slate-500 shrink-0 mt-0.5 max-w-[45%]">
//             {Icon ? <Icon size={14} className="text-orange-500/70 shrink-0"/> :
//                 <Tag size={14} className="text-slate-400 shrink-0"/>}
//             <span className="text-[10px] font-bold uppercase tracking-widest break-words leading-tight">{label}</span>
//         </div>
//         <span
//             className="text-sm font-medium text-slate-800 text-right max-w-[55%] break-words leading-tight font-mono select-text">{String(value)}</span>
//     </div>
// );
//
//
// export function LocationDetailsSheet({location, open, onOpenChange}) {
//     if (!location) return null;
//
//     const type = location.fullData?.type || location.type || 'map_tile';
//     const isDocument = type === 'document' || type === 'text';
//     const rootMeta = location.fullData || {};
//     const rawSourceData = rootMeta.full_metadata || rootMeta.metadata || rootMeta;
//
//     // 使用 useMemo 解析数据
//     const displayRows = useMemo(() => processMetadata(rawSourceData), [rawSourceData]);
//
//     // Header 字段提取
//     let parsedObj = {};
//     try {
//         parsedObj = typeof rawSourceData === 'string' ? JSON.parse(rawSourceData) : rawSourceData;
//     } catch (e) {
//     }
//
//     const title = parsedObj.owner_name || parsedObj.Owner || parsedObj.Place || rootMeta.source_dataset || "Historical Record";
//     const year = parsedObj.an_rendi || parsedObj.Year || parsedObj.year;
//     const uid = parsedObj.uid || parsedObj.id || location.id?.substring(0, 8);
//     const contentText = parsedObj.content || rootMeta.content || location.content;
//     const fullMapUrl = "/maps/raw/sample_venice_map_3.jpg";
//
//     const copyContent = () => {
//         if (contentText) navigator.clipboard.writeText(contentText);
//     };
//
//     return (
//         <Sheet open={open} onOpenChange={onOpenChange} modal={true}>
//             {/* 🔥 修改点 1: 删除了 onInteractOutside={(e) => e.preventDefault()}
//                现在点击遮罩层 (SheetOverlay) 会自动触发 onOpenChange(false)
//             */}
//             <SheetContent
//                 className="w-[450px] sm:w-[550px] p-0 border-l border-slate-200 shadow-2xl bg-white/95 backdrop-blur-xl z-[2000] focus-visible:outline-none flex flex-col h-full overflow-hidden [&>button]:hidden"
//                 side="right"
//             >
//                 {/* 右上角关闭按钮 */}
//                 <button
//                     onClick={() => onOpenChange(false)}
//                     className="absolute top-5 right-5 z-50 p-2 rounded-full bg-white/90 hover:bg-slate-100 hover:text-red-500 text-slate-500 shadow-sm border border-slate-200 transition-all duration-200 group"
//                     title="Close Details"
//                 >
//                     <X size={20} strokeWidth={2.5} className="group-hover:scale-110 transition-transform"/>
//                 </button>
//
//                 {isDocument ? (
//                     // --- 文档视图 ---
//                     <>
//                         <div
//                             className="relative w-full shrink-0 border-b border-slate-200 bg-slate-50/80 pt-12 pb-6 px-6">
//                             <div className="flex flex-col items-center text-center">
//                                 <div
//                                     className="w-14 h-14 rounded-2xl bg-white border border-orange-100 flex items-center justify-center mb-4 shadow-sm">
//                                     <ScrollText size={28} className="text-orange-600" strokeWidth={1.5}/>
//                                 </div>
//                                 <h2 className="text-xl font-serif font-bold text-slate-900 leading-tight px-2">{title}</h2>
//                                 <div className="mt-3 flex gap-2 justify-center flex-wrap">
//                                     <Badge variant="outline"
//                                            className="bg-white/50 text-slate-500 font-mono text-[10px] border-slate-200">ID: {uid}</Badge>
//                                     {year && <Badge variant="secondary"
//                                                     className="bg-orange-100/50 text-orange-800 border-orange-100 font-mono text-[10px] px-2">Year: {year}</Badge>}
//                                 </div>
//                             </div>
//                         </div>
//
//                         <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6 space-y-8">
//                             {contentText && (
//                                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
//                                     <div className="flex items-center justify-between mb-3">
//                                         <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
//                                             <AlignLeft size={14} className="text-orange-500"/> Transcript</h3>
//                                         <Button variant="ghost" size="sm" onClick={copyContent}
//                                                 className="h-6 text-[10px] text-slate-400 hover:text-orange-600 px-2"><Copy
//                                             size={12} className="mr-1"/> Copy Text</Button>
//                                     </div>
//                                     <div
//                                         className="bg-slate-50/50 p-5 rounded-xl border border-slate-200/60 text-slate-700 font-serif leading-relaxed text-sm whitespace-pre-wrap shadow-sm">{contentText}</div>
//                                 </div>
//                             )}
//
//                             <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
//                                 <div className="flex items-center justify-between mb-4">
//                                     <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
//                                         <Database size={14} className="text-orange-500"/> Data Attributes</h3>
//                                     <span
//                                         className="text-[10px] text-slate-400 font-mono bg-slate-100 px-1.5 py-0.5 rounded">{displayRows.length} Fields</span>
//                                 </div>
//                                 <div
//                                     className="bg-white rounded-xl border border-slate-200 px-1 shadow-sm overflow-hidden">
//                                     {displayRows.length > 0 ? (
//                                         displayRows.map((row, idx) => <MetaRow key={idx} label={formatKey(row.key)}
//                                                                                value={row.value}
//                                                                                icon={getIconForKey(row.key)}/>)
//                                     ) : (
//                                         <div className="p-8 text-center text-slate-400 italic text-sm">No additional
//                                             metadata found.</div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </>
//                 ) : (
//                     // --- 地图视图 ---
//                     <>
//                         <div
//                             className="relative w-full h-[260px] shrink-0 border-b border-slate-200 overflow-hidden group bg-slate-900">
//                             <div className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
//                                  style={{backgroundImage: `url(${fullMapUrl})`}}/>
//                             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
//                             <div className="absolute bottom-4 left-6 right-6 text-white z-10">
//                                 <div
//                                     className="flex items-center gap-2 text-orange-400 text-[10px] font-mono tracking-widest uppercase mb-1">
//                                     <ImageIcon size={12}/><span>Visual Fragment</span></div>
//                                 <h1 className="text-2xl font-serif font-bold text-white shadow-sm leading-tight">{location.content || "Map Tile"}</h1>
//                             </div>
//                             <div className="absolute inset-0 flex items-center justify-center pb-8 pointer-events-none">
//                                 {location.pixel_coords && (
//                                     <div className="relative group/lens shadow-2xl">
//                                         <div className="absolute -inset-2 border border-white/20 rounded-sm"></div>
//                                         <div
//                                             className="relative w-48 h-32 overflow-hidden bg-slate-800 border-2 border-white/80 rounded-sm shadow-[0_0_30px_rgba(0,0,0,0.5)]">
//                                             <div className="w-full h-full filter contrast-[1.2] sepia-[0.2]" style={{
//                                                 backgroundRepeat: 'no-repeat',
//                                                 backgroundImage: `url(${fullMapUrl})`,
//                                                 backgroundPosition: `-${location.pixel_coords[0]}px -${location.pixel_coords[1]}px`
//                                             }}/>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//
//                         <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6 space-y-6">
//                             <div
//                                 className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
//                                 <div className="flex items-center gap-4">
//                                     <div
//                                         className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 shadow-sm border border-slate-100">
//                                         <MapPin size={18} className="text-blue-600"/></div>
//                                     <div>
//                                         <div className="text-[10px] font-bold text-slate-400 uppercase">WGS84
//                                             Coordinates
//                                         </div>
//                                         <div
//                                             className="font-mono text-sm text-slate-900 font-medium mt-0.5">{location.lat.toFixed(6)}, {location.lon.toFixed(6)}</div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div>
//                                 <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 mb-4">
//                                     <Scan size={14} className="text-orange-500"/> Tile Details</h3>
//                                 <div className="bg-white rounded-xl border border-slate-200 px-1 shadow-sm">
//                                     <MetaRow label="Year" value={rootMeta.year} icon={Calendar}/>
//                                     <MetaRow label="Dataset" value={rootMeta.source_dataset} icon={Database}/>
//                                     <MetaRow label="Original ID" value={location.id} icon={Hash}/>
//                                 </div>
//                             </div>
//                         </div>
//                     </>
//                 )}
//
//                 {/* 底部按钮 */}
//                 <div className="p-5 border-t border-slate-100 bg-white/50 shrink-0 flex gap-3">
//                     <Button variant="outline" onClick={() => onOpenChange(false)}
//                             className="flex-1 border-slate-200 hover:bg-slate-100 text-slate-600">Close</Button>
//                     <Button
//                         className="flex-[2] bg-slate-900 hover:bg-slate-800 text-white shadow-lg">{isDocument ? "Locate in Archive" : "Zoom to Location"}</Button>
//                 </div>
//             </SheetContent>
//         </Sheet>
//     );
// }

'use client';

import {Sheet, SheetContent} from "@/components/ui/sheet";
import {Badge} from "@/components/ui/badge";
import {
    X, ScrollText, Database,
    User, Tag, Hash, AlignLeft,
    MapPin, Copy, Briefcase, Landmark, Calendar,
    ImageIcon, Scan, Layers
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useMemo} from "react";

// --- 辅助函数保持不变 ---
const formatKey = (key) => {
    if (!key) return "";
    return key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
};

const processMetadata = (rawMetadata) => {
    if (!rawMetadata) return [];
    let data = rawMetadata;
    if (typeof rawMetadata === 'string') {
        try {
            data = JSON.parse(rawMetadata);
        } catch (e) {
            return [];
        }
    }
    if (typeof data !== 'object' || data === null) return [];

    const flattened = [];
    Object.entries(data).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") return;
        const blacklist = ['content', 'text_vector', 'pe_vector', 'location', 'pixel_coords', 'Unnamed: 0', 'type', 'full_metadata', 'metadata', 'tif_path_img', 'path_img'];
        if (blacklist.includes(key)) return;

        if (Array.isArray(value)) {
            if (value.length > 0) flattened.push({key: key, value: value.join(", ")});
        } else if (typeof value === 'object') {
            Object.entries(value).forEach(([subKey, subValue]) => {
                if (subValue !== null && subValue !== "") flattened.push({key: `${key} (${subKey})`, value: subValue});
            });
        } else {
            flattened.push({key: key, value: value});
        }
    });
    return flattened;
};

const getIconForKey = (key) => {
    const k = key.toLowerCase();
    if (k.includes('author') || k.includes('owner') || k.includes('people')) return User;
    if (k.includes('place') || k.includes('geo')) return MapPin;
    if (k.includes('entity')) return Landmark;
    if (k.includes('function') || k.includes('trade')) return Briefcase;
    if (k.includes('year')) return Calendar;
    return Tag;
};

const MetaRow = ({label, value, icon: Icon}) => (
    <div
        className="group flex items-start justify-between py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 px-3 rounded-md transition-colors">
        <div className="flex items-center gap-2.5 text-slate-500 shrink-0 mt-0.5 max-w-[45%]">
            {Icon ? <Icon size={14} className="text-orange-500/70 shrink-0"/> :
                <Tag size={14} className="text-slate-400 shrink-0"/>}
            <span className="text-[10px] font-bold uppercase tracking-widest break-words leading-tight">{label}</span>
        </div>
        <span
            className="text-sm font-medium text-slate-800 text-right max-w-[55%] break-words leading-tight font-mono select-text">{String(value)}</span>
    </div>
);

export function LocationDetailsSheet({location, open, onOpenChange, onShowLayer}) {
    if (!location) return null;

    const type = location.fullData?.type || location.type || 'map_tile';
    const isDocument = type === 'document' || type === 'text';
    const rootMeta = location.fullData || {};
    const rawSourceData = rootMeta.full_metadata || rootMeta.metadata || rootMeta;

    const displayRows = useMemo(() => processMetadata(rawSourceData), [rawSourceData]);

    let parsedObj = {};
    try {
        parsedObj = typeof rawSourceData === 'string' ? JSON.parse(rawSourceData) : rawSourceData;
    } catch (e) {
    }

    const title = parsedObj.owner_name || parsedObj.Owner || parsedObj.Place || rootMeta.source_dataset || "Historical Record";
    const year = parsedObj.an_rendi || parsedObj.Year || parsedObj.year;
    const uid = parsedObj.uid || parsedObj.id || location.id?.substring(0, 8);
    const source_dataset = location.source_dataset;
    const contentText = parsedObj.content || rootMeta.content || location.content;
    const fullMapUrl = "/maps/raw/sample_venice_map_3.jpg";

    const copyContent = () => {
        if (contentText) navigator.clipboard.writeText(contentText);
    };

    const targetMapId = "/maps/raw/sample_venice_map_3.jpg";

    return (
        // 🔥 修复点 1: modal={false} 允许你在侧边栏打开时操作地图
        <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
            <SheetContent
                // 🔥 修复点 2: 使用 CSS 隐藏默认的 Close 按钮
                // [&>button:not(.custom-close-btn)]:hidden 意思是：隐藏所有子元素中的 button，除了带有 .custom-close-btn 类的那个
                className="w-[450px] sm:w-[550px] p-0 border-l border-slate-200 shadow-2xl bg-white/95 backdrop-blur-xl z-[2000] focus-visible:outline-none flex flex-col h-full overflow-hidden [&>button:not(.custom-close-btn)]:hidden"
                side="right"
                // 移除遮罩交互拦截，因为 modal={false} 已经去掉了遮罩
                onInteractOutside={(e) => e.preventDefault()}
            >
                {/* 🔥 自定义关闭按钮 */}
                {/* 添加了 custom-close-btn 类名，防止被上面的 CSS 误杀 */}
                <button
                    onClick={() => onOpenChange(false)}
                    className="custom-close-btn absolute top-5 right-5 z-[3000] p-2 rounded-full bg-white/80 hover:bg-slate-100 text-slate-500 hover:text-red-500 border border-slate-200 shadow-sm transition-all duration-200 cursor-pointer"
                    title="Close Details"
                    type="button"
                >
                    <X size={20} strokeWidth={2.5}/>
                </button>

                {isDocument ? (
                    // --- 文档视图 ---
                    <>
                        <div
                            className="relative w-full shrink-0 border-b border-slate-200 bg-slate-50/80 pt-12 pb-6 px-6">
                            <div className="flex flex-col items-center text-center">
                                <div
                                    className="w-14 h-14 rounded-2xl bg-white border border-orange-100 flex items-center justify-center mb-4 shadow-sm">
                                    <ScrollText size={28} className="text-orange-600" strokeWidth={1.5}/>
                                </div>
                                <h2 className="text-xl font-serif font-bold text-slate-900 leading-tight px-2">{title}</h2>
                                <div className="mt-3 flex gap-2 justify-center flex-wrap">
                                    <Badge variant="outline"
                                           className="bg-white/50 text-slate-500 font-mono text-[10px] border-slate-200">From: {source_dataset}</Badge>
                                    {year && <Badge variant="secondary"
                                                    className="bg-orange-100/50 text-orange-800 border-orange-100 font-mono text-[10px] px-2">Year: {year}</Badge>}
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6 space-y-8">
                            {/*{contentText && (*/}
                            {/*    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">*/}
                            {/*        <div className="flex items-center justify-between mb-3">*/}
                            {/*            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">*/}
                            {/*                <AlignLeft size={14} className="text-orange-500"/> Transcript</h3>*/}
                            {/*            <Button variant="ghost" size="sm" onClick={copyContent}*/}
                            {/*                    className="h-6 text-[10px] text-slate-400 hover:text-orange-600 px-2"><Copy*/}
                            {/*                size={12} className="mr-1"/> Copy Text</Button>*/}
                            {/*        </div>*/}
                            {/*        <div*/}
                            {/*            className="bg-slate-50/50 p-5 rounded-xl border border-slate-200/60 text-slate-700 font-serif leading-relaxed text-sm whitespace-pre-wrap shadow-sm">{contentText}</div>*/}
                            {/*    </div>*/}
                            {/*)}*/}

                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                        <Database size={14} className="text-orange-500"/> Metadata </h3>
                                    <span
                                        className="text-[10px] text-slate-400 font-mono bg-slate-100 px-1.5 py-0.5 rounded">{displayRows.length} Fields</span>
                                </div>
                                <div
                                    className="bg-white rounded-xl border border-slate-200 px-1 shadow-sm overflow-hidden">
                                    {displayRows.length > 0 ? (
                                        displayRows.map((row, idx) => <MetaRow key={idx} label={formatKey(row.key)}
                                                                               value={row.value}
                                                                               icon={getIconForKey(row.key)}/>)
                                    ) : (
                                        <div className="p-8 text-center text-slate-400 italic text-sm">No additional
                                            metadata found.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    // --- 地图视图 ---
                    <>
                        <div
                            className="relative w-full h-[260px] shrink-0 border-b border-slate-200 overflow-hidden group bg-slate-900">
                            <div className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
                                 style={{backgroundImage: `url(${fullMapUrl})`}}/>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                            <div className="absolute bottom-4 left-6 right-6 text-white z-10">
                                <div
                                    className="flex items-center gap-2 text-orange-400 text-[10px] font-mono tracking-widest uppercase mb-1">
                                    <ImageIcon size={12}/><span>Visual Fragment</span></div>
                                <h1 className="text-2xl font-serif font-bold text-white shadow-sm leading-tight">{location.content || "Map Tile"}</h1>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center pb-8 pointer-events-none">
                                {location.pixel_coords && (
                                    <div className="relative group/lens shadow-2xl">
                                        <div className="absolute -inset-2 border border-white/20 rounded-sm"></div>
                                        <div
                                            className="relative w-48 h-32 overflow-hidden bg-slate-800 border-2 border-white/80 rounded-sm shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                                            <div className="w-full h-full filter contrast-[1.2] sepia-[0.2]" style={{
                                                backgroundRepeat: 'no-repeat',
                                                backgroundImage: `url(${fullMapUrl})`,
                                                backgroundPosition: `-${location.pixel_coords[0]}px -${location.pixel_coords[1]}px`
                                            }}/>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6 space-y-6">
                            <div
                                className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 shadow-sm border border-slate-100">
                                        <MapPin size={18} className="text-blue-600"/></div>
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase">
                                            Coordinates
                                        </div>
                                        <div
                                            className="font-mono text-sm text-slate-900 font-medium mt-0.5">{location.lat.toFixed(6)}, {location.lon.toFixed(6)}</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 mb-4">
                                    <Scan size={14} className="text-orange-500"/> Tile Details</h3>
                                <div className="bg-white rounded-xl border border-slate-200 px-1 shadow-sm">
                                    <MetaRow label="Year" value={rootMeta.year} icon={Calendar}/>
                                    <MetaRow label="Map" value={location.image_source} icon={Database}/>
                                </div>
                            </div>


                            {/* 新增：叠加图层按钮 */}
                            {/*<Button*/}
                            {/*    variant="outline"*/}
                            {/*    onClick={() => {*/}
                            {/*        // 调用父组件传入的方法，切换到底图*/}
                            {/*        if (onShowLayer) {*/}
                            {/*            onShowLayer(targetMapId);*/}
                            {/*            // 可选：加一个 toast 提示 "Layer Activated"*/}
                            {/*        }*/}
                            {/*    }}*/}
                            {/*    className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800 hover:border-orange-300 transition-colors h-11 font-serif"*/}
                            {/*>*/}
                            {/*    <Layers size={16} className="mr-2"/>*/}
                            {/*    Overlay Historical Map Layer*/}
                            {/*</Button>*/}

                            {/* 固定在底部的按钮 */}
                            <div className="px-6 pb-6">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        if (onShowLayer) onShowLayer(targetMapId);
                                    }}
                                    className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800 hover:border-orange-300 transition-colors h-11 font-serif"
                                >
                                    <Layers size={16} className="mr-2"/> Overlay Historical Map Layer
                                </Button>
                            </div>


                        </div>


                    </>
                )}

            </SheetContent>
        </Sheet>
    );
}