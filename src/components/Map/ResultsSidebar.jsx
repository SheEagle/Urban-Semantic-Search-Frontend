// 'use client';
//
// import {Card} from "@/components/ui/card";
// import {Scroll, ArrowRight, Image as ImageIcon} from "lucide-react";
//
// export function ResultsSidebar({results, onSelect, activeId}) {
//     if (!results || results.length === 0) return null;
//
//     return (
//         <Card
//             className="absolute top-28 left-6 z-[900] w-80 max-h-[calc(100vh-200px)] bg-paper shadow-2xl border border-ink/10 border-r-4 border-r-ink/10 rounded-sm overflow-hidden flex flex-col animate-in slide-in-from-left-5">
//
//             {/* 标题栏 (保持不变) */}
//             <div className="p-4 border-b-2 border-ink/10 bg-paper text-center relative z-10 shrink-0">
//                 <div className="absolute top-0 bottom-0 left-3 w-px bg-wax-red/20"></div>
//                 <h3 className="font-serif text-xl font-bold text-ink flex items-center justify-center gap-2">
//                     <Scroll size={18} className="text-wax-red"/>
//                     <span>Index Locorum</span>
//                 </h3>
//                 <span className="text-[10px] text-ink-faded font-mono uppercase tracking-widest mt-1 block">
//                     {results.length} Records Found
//                 </span>
//             </div>
//
//             {/* 📜 列表区域修复重点：
//                1. min-h-0: 关键！防止 flex 子元素溢出父容器而不滚动。
//                2. custom-scrollbar: 使用我们新写的细滚动条样式。
//                3. overflow-y-auto: 让浏览器决定何时显示滚动条。
//             */}
//             <div
//                 className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar w-full p-0 space-y-0 bg-paper bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:100%_32px]">
//                 {results.map((item, index) => {
//                     const isActive = activeId === item.id;
//                     return (
//                         <div
//                             key={item.id}
//                             onClick={() => onSelect(item)}
//                             className={`
//                                 group relative p-3 pl-6 cursor-pointer transition-all duration-300 border-b border-dashed border-ink/10 w-full
//                                 ${isActive
//                                 ? 'bg-ink text-white shadow-md scale-[1.02] -rotate-1 z-10 mx-[-4px] rounded-sm'
//                                 : 'hover:bg-ink/5 bg-transparent'}
//                             `}
//                         >
//                             <div className="flex items-start gap-3 w-full">
//                                 {/* 序号 */}
//                                 <div className={`
//                                     mt-0.5 w-5 h-5 flex items-center justify-center text-[12px] font-serif font-bold italic shrink-0
//                                     ${isActive ? 'text-royal-gold' : 'text-ink/40'}
//                                 `}>
//                                     {index + 1}.
//                                 </div>
//
//                                 {/* 内容 */}
//                                 <div className="flex-1 min-w-0">
//                                     <h4 className={`text-sm font-serif font-bold truncate ${isActive ? 'text-paper' : 'text-ink'}`}>
//                                         {item.fullData?.image_source || "Terra Incognita"}
//                                     </h4>
//
//                                     <div className="flex items-center gap-2 mt-1 flex-wrap">
//                                         <span
//                                             className={`text-[10px] font-mono truncate max-w-[80px] ${isActive ? 'text-white/60' : 'text-ink-faded'}`}>
//                                             {item.id.split('-')[0]}
//                                         </span>
//                                         <span
//                                             className={`text-[9px] px-1.5 py-0.5 rounded-sm font-bold border whitespace-nowrap ${
//                                                 isActive
//                                                     ? 'bg-wax-red text-white border-wax-red'
//                                                     : item.score > 0.8
//                                                         ? 'bg-wax-red/10 text-wax-red border-wax-red/20'
//                                                         : 'bg-transparent text-ink-faded border-ink/20'
//                                             }`}>
//                                             {(item.score * 100).toFixed(0)}% Match
//                                         </span>
//                                     </div>
//
//                                     {item.fullData?.pixel_coords && (
//                                         <div
//                                             className={`flex items-center gap-1 mt-1 text-[9px] ${isActive ? 'text-white/50' : 'text-ink/40'}`}>
//                                             <ImageIcon size={9}/>
//                                             <span className="italic">Visual Fragment</span>
//                                         </div>
//                                     )}
//                                 </div>
//
//                                 {/* 箭头 */}
//                                 <div className={`
//                                     self-center shrink-0 transition-all duration-300
//                                     ${isActive ? 'text-royal-gold opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-50 text-ink'}
//                                 `}>
//                                     <ArrowRight size={14}/>
//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </Card>
//     );
// }

'use client';

import {Card} from "@/components/ui/card";
import {List, ArrowRight, Map} from "lucide-react";

export function ResultsSidebar({results, onSelect, activeId}) {
    if (!results || results.length === 0) return null;

    return (
        <Card
            className="absolute top-24 left-6 z-[900] w-80 max-h-[calc(100vh-140px)] bg-ceramic shadow-ceramic border border-border rounded-xl overflow-hidden flex flex-col animate-in slide-in-from-left-5">

            {/* 标题栏 */}
            <div className="p-4 border-b border-border bg-deep-ocean/5 text-center relative z-10 shrink-0">
                <h3 className="font-serif text-xl font-bold text-deep-ocean flex items-center justify-center gap-2">
                    <List size={18} className="text-time-gold"/>
                    <span>Temporal Index</span>
                </h3>
                <span className="text-[10px] text-faded-slate font-mono uppercase tracking-widest mt-1 block">
                    {results.length} Records Found
                </span>
            </div>

            {/* 列表区域 */}
            <div
                className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar w-full p-1 space-y-0 bg-atlas-paper">
                {results.map((item, index) => {
                    const isActive = activeId === item.id;
                    return (
                        <div
                            key={item.id}
                            onClick={() => onSelect(item)}
                            className={`
                                group relative p-3 cursor-pointer transition-all duration-300 rounded-lg mx-1
                                ${isActive
                                ? 'bg-deep-ocean text-white shadow-md' // 激活状态：深蓝背景，白字
                                : 'hover:bg-deep-ocean/5 bg-transparent'} 
                            `}
                        >
                            {/* 激活状态装饰线 */}
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-time-gold rounded-l-lg"></div>
                            )}

                            <div className="flex items-start gap-3 w-full">
                                {/* 序号 */}
                                <div className={`
                                    mt-0.5 w-5 h-5 flex items-center justify-center text-[12px] font-serif font-bold italic shrink-0
                                    ${isActive ? 'text-time-gold' : 'text-faded-slate'}
                                `}>
                                    {(index + 1).toString().padStart(2, '0')}.
                                </div>

                                {/* 内容 */}
                                <div className="flex-1 min-w-0">
                                    <h4 className={`text-sm font-serif font-medium truncate ${isActive ? 'text-atlas-paper' : 'text-deep-ocean'}`}>
                                        {item.fullData?.image_source || "Uncharted Location"}
                                    </h4>

                                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                                        <span
                                            className={`text-[10px] font-mono truncate max-w-[80px] ${isActive ? 'text-white/60' : 'text-faded-slate'}`}>
                                            {item.id.split('-')[0]}
                                        </span>
                                        <span
                                            className={`text-[9px] px-1.5 py-0.5 rounded-sm font-bold border whitespace-nowrap ${
                                                isActive
                                                    ? 'bg-time-gold/80 text-white border-time-gold/90'
                                                    : item.score > 0.8
                                                        ? 'bg-time-gold/10 text-time-gold border-time-gold/20'
                                                        : 'bg-transparent text-faded-slate border-border'
                                            }`}>
                                            {(item.score * 100).toFixed(0)}% Match
                                        </span>
                                    </div>
                                </div>

                                {/* 箭头 */}
                                <div className={`
                                    self-center shrink-0 transition-all duration-300
                                    ${isActive ? 'text-time-gold opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-50 text-faded-slate'}
                                `}>
                                    <ArrowRight size={14}/>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}
