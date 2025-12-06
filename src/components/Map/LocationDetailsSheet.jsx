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

'use client';

import {Sheet, SheetContent} from "@/components/ui/sheet";
import {Badge} from "@/components/ui/badge";
import {Copy, MapPin, Scan, Clock, X} from "lucide-react";
import {Button} from "@/components/ui/button";

// 用于复制到剪贴板的辅助函数
const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
};

export function LocationDetailsSheet({location, open, onOpenChange}) {
    if (!location) return null;

    const fullMapUrl = "/maps/raw/sample_venice_map_3.jpg"; // 假设的底图URL
    const scorePercent = (location.score * 100).toFixed(1);

    return (
        <Sheet
            open={open}
            onOpenChange={onOpenChange}
            // 🔥 关键修改 1: 禁用模态模式
            modal={false}
        >
            <SheetContent
                // 使用 bg-ceramic (高不透明度，浅色系)
                className="w-[450px] sm:w-[550px] p-0 border-l border-border shadow-2xl bg-ceramic z-[2000] focus-visible:outline-none flex flex-col h-full overflow-hidden [&>button]:hidden"

                // 🔥 关键修改 2: 移除“点击外部关闭”的行为（因为我们要允许点击地图）
                // 在 modal={false} 时，这个属性通常是自动生效的，但显式写上更安全
                onInteractOutside={(e) => {
                    // 阻止 Sheet 捕获外部点击事件，让事件穿透到地图上
                    e.preventDefault();
                }}
            >
                {/* --- 1. 顶部：视觉证据 (Visual Evidence) --- */}
                <div
                    className="relative w-full h-[250px] bg-deep-ocean/5 overflow-hidden shrink-0 border-b border-border">

                    {/* 背景模糊处理，制造景深 */}
                    <div
                        className="absolute inset-0 bg-cover bg-center blur-md opacity-30 scale-110 grayscale-[30%]"
                        style={{backgroundImage: `url(${fullMapUrl})`}}
                    />

                    {/* 核心切片展示：像一个悬浮的精密透镜 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {location.pixel_coords ? (
                            <div
                                className="relative group shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                                {/* 边框：金属感光环 */}
                                <div
                                    className="absolute -inset-2 border-2 border-time-gold/40 rounded-sm opacity-50"></div>

                                {/* 图片本体 */}
                                <div
                                    className="relative w-56 h-36 overflow-hidden bg-atlas-paper border-2 border-deep-ocean/10 rounded-sm"
                                    style={{boxShadow: '0 10px 30px -5px rgba(0,0,0,0.2)'}}
                                >
                                    <div
                                        className="w-full h-full transition-all duration-700 filter contrast-[1.05] sepia-[0.1]"
                                        style={{
                                            backgroundRepeat: 'no-repeat',
                                            backgroundImage: `url(${fullMapUrl})`,
                                            backgroundPosition: `-${location.pixel_coords[0]}px -${location.pixel_coords[1]}px`,
                                        }}
                                    />
                                    {/* 扫描线动画装饰 */}
                                    <div
                                        className="absolute inset-0 bg-gradient-to-b from-transparent via-time-gold/30 to-transparent animate-scan pointer-events-none opacity-40"></div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-faded-slate italic font-serif">Visual fragment corrupted</div>
                        )}
                    </div>

                    {/* 关闭按钮 */}
                    <button
                        onClick={() => onOpenChange(false)}
                        className="absolute top-5 right-5 z-50 p-2 rounded-full bg-atlas-paper/80 hover:bg-deep-ocean hover:text-time-gold text-deep-ocean shadow-md transition-all duration-300 border border-border"
                    >
                        <X size={18} strokeWidth={2}/>
                    </button>
                </div>

                {/* --- 2. 内容滚动区 --- */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">

                    {/* 标题部分 */}
                    <div className="relative">
                        {/* 左侧装饰竖线：精密仪器的刻度感 */}
                        <div className="absolute -left-4 top-1 bottom-1 w-0.5 bg-time-gold/50 rounded-full"></div>

                        <div
                            className="flex items-center gap-3 mb-2 text-faded-slate text-[10px] font-mono tracking-widest uppercase">
                            <span className="flex items-center gap-1"><Clock size={12}/> Chrono-Index</span>
                            <span className="w-px h-3 bg-faded-slate/30"></span>
                            <span>ID: {location.id.substring(0, 8)}</span>
                        </div>

                        <h2 className="text-3xl font-serif text-deep-ocean font-bold leading-tight text-balance">
                            {location.fullData?.image_source || "Unidentified Chronicle"}
                        </h2>
                    </div>

                    {/* 数据仪表盘 (Grid Layout) */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* 匹配度卡片 */}
                        <div
                            className="p-4 rounded-lg bg-deep-ocean/5 border border-border flex flex-col justify-between group hover:border-time-gold/30 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <Scan size={16} className="text-time-gold"/>
                                <span className="text-[10px] font-bold text-faded-slate uppercase">Confidence</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-mono font-light text-deep-ocean">{scorePercent}</span>
                                <span className="text-xs text-faded-slate">%</span>
                            </div>
                            {/* 简单的进度条 */}
                            <div className="w-full h-1 bg-deep-ocean/10 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-time-gold shadow-md shadow-time-gold/50"
                                     style={{width: `${scorePercent}%`}}></div>
                            </div>
                        </div>

                        {/* 坐标卡片 */}
                        <div
                            className="p-4 rounded-lg bg-deep-ocean/5 border border-border group hover:border-deep-ocean/20 transition-colors relative overflow-hidden">
                            <div className="flex justify-between items-start mb-3">
                                <MapPin size={16}
                                        className="text-deep-ocean/60 group-hover:text-deep-ocean transition-colors"/>
                                <span className="text-[10px] font-bold text-faded-slate uppercase">Geospatial</span>
                            </div>
                            <div className="space-y-1">
                                {/* Latitude */}
                                <div
                                    className="flex justify-between items-center text-xs font-mono text-deep-ocean border-b border-border pb-1">
                                    <span className="text-faded-slate">LAT</span>
                                    <span>{location.lat.toFixed(5)} N</span>
                                </div>
                                {/* Longitude */}
                                <div
                                    className="flex justify-between items-center text-xs font-mono text-deep-ocean pt-1">
                                    <span className="text-faded-slate">LON</span>
                                    <span>{location.lon.toFixed(5)} E</span>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute bottom-1 right-1 h-6 w-6 text-faded-slate hover:text-time-gold"
                                onClick={() => copyToClipboard(`${location.lat}, ${location.lon}`)}
                            >
                                <Copy size={12}/>
                            </Button>
                        </div>
                    </div>

                    {/* 描述/上下文区域 */}
                    <div className="space-y-3 pt-4">
                        <h3 className="text-sm font-bold text-deep-ocean border-b border-border pb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-time-gold"></span>
                            Historical Context
                        </h3>
                        <div className="text-sm text-slate-600 leading-relaxed font-serif text-justify">
                            <p>
                                Temporal cross-referencing confirms this map fragment aligns perfectly with the known
                                18th-century cartographic dataset for the Venice region. The high confidence score
                                suggests that, despite the chronological gap, the spatial data remains largely intact,
                                offering a unique temporal perspective on this location.
                            </p>
                        </div>
                    </div>

                </div>

                {/* --- 3. 底部操作栏 --- */}
                <div className="p-6 border-t border-border bg-deep-ocean/5 backdrop-blur-sm shrink-0">
                    <Button
                        className="w-full h-12 bg-deep-ocean hover:bg-deep-ocean/90 text-atlas-paper font-serif tracking-wide shadow-lg shadow-deep-ocean/20 rounded-md group"
                        style={{backgroundColor: 'var(--deep-ocean)'}}
                    >
                        <MapPin className="mr-2 h-4 w-4 group-hover:-translate-y-1 transition-transform"/>
                        NAVIGATE TO FRAGMENT
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}