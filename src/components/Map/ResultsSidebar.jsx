'use client';

import {useState, useEffect} from 'react';
import {
    Library,
    ChevronLeft,
    ChevronRight,
    ArrowRight,
    ScrollText,
    Map as MapIcon,
} from 'lucide-react';

export function ResultsSidebar({results, onSelect, activeId}) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        if (results && results.length > 0) {
            setIsCollapsed(false);
        }
    }, [results]);

    if (!results || results.length === 0) return null;

    return (
        <div
            className={`
                absolute top-24 left-6 z-[900] h-[calc(100vh-140px)] flex items-start 
                transition-all duration-500 ease-in-out
                ${isCollapsed ? '-translate-x-[calc(100%+24px)]' : 'translate-x-0'}
            `}
        >
            {/* 📜 主体卡片 */}
            <div
                className="w-80 h-full bg-[#fdfbf7]/95 backdrop-blur-md shadow-2xl shadow-deep-ocean/30 border border-slate-200 rounded-xl overflow-hidden flex flex-col relative">

                {/* Header */}
                <div className="px-5 py-4 border-b border-slate-200 bg-white/50 shrink-0">
                    <div className="flex items-end justify-between">
                        <h3 className="font-serif text-lg font-bold text-slate-800 tracking-wide flex items-center gap-2">
                            <Library size={18} className="text-orange-600"/>
                            SEARCH RESULTS
                        </h3>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
                            FOUND {String(results.length).padStart(2, '0')} MATCHES
                        </span>
                    </div>
                </div>

                {/* List Area */}
                <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-3 space-y-2">
                    {results.map((item, index) => {
                        const isActive = activeId === item.id;
                        const score = (item.score * 100).toFixed(0);

                        // 🔥 1. 判断类型
                        const isDoc = item.fullData?.type === 'document' || item.type === 'document';
                        const TypeIcon = isDoc ? ScrollText : MapIcon;

                        // 🔥 2. 计算标题显示逻辑 (新增)
                        let displayTitle = "Uncharted Fragment";

                        if (isDoc) {
                            // 尝试获取元数据
                            let meta = item.fullData?.full_metadata || item.fullData?.metadata;

                            // 如果是字符串，先解析 JSON
                            if (typeof meta === 'string') {
                                try {
                                    meta = JSON.parse(meta);
                                } catch (e) {
                                    meta = {};
                                }
                            }

                            // 确保它是对象
                            if (!meta || typeof meta !== 'object') meta = {};

                            // 规则：有 Place 显示 Place，否则显示 "无名氏"
                            if (meta.Place && meta.Place.trim() !== "") {
                                displayTitle = meta.Place;
                            } else {
                                displayTitle = "Anonymous Location";
                            }
                        } else {
                            // 地图类型的默认逻辑
                            displayTitle = item.content || item.fullData?.image_source || "Uncharted Fragment";
                        }

                        return (
                            <div
                                key={item.id}
                                onClick={() => onSelect(item)}
                                className={`
                                    group relative p-3 cursor-pointer transition-all duration-300 rounded-lg border
                                    ${isActive
                                    ? 'bg-[#1a2c42] border-[#1a2c42] shadow-lg scale-[1.02] z-10'
                                    : 'bg-white border-transparent hover:border-orange-200 hover:shadow-md z-0'}
                                `}
                            >
                                <div className="flex flex-col gap-1 relative z-10">
                                    {/* Top Row: Title & Arrow */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0 flex items-start gap-2">
                                            {/* 序号 */}
                                            <span
                                                className={`font-mono text-[10px] mt-1 ${isActive ? 'text-orange-400' : 'text-slate-300'}`}>
                                                {String(index + 1).padStart(2, '0')}
                                            </span>

                                            {/* 🔥 3. 使用计算好的 displayTitle */}
                                            <h4 className={`text-sm font-serif font-bold leading-tight line-clamp-2 ${isActive ? 'text-white' : 'text-slate-700'}`}>
                                                {displayTitle}
                                            </h4>
                                        </div>

                                        <ArrowRight
                                            size={14}
                                            className={`transition-all duration-300 shrink-0 mt-1
                                                ${isActive
                                                ? 'text-orange-400 translate-x-0 opacity-100'
                                                : 'text-slate-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}
                                            `}
                                        />
                                    </div>

                                    {/* Bottom Row: Type, Coords, Score */}
                                    <div className="flex items-center justify-between mt-3 pl-6">
                                        <div
                                            className={`flex items-center gap-2 text-[10px] ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
                                            <div className="flex items-center gap-1"
                                                 title={isDoc ? "Document" : "Map Tile"}>
                                                <TypeIcon size={12}
                                                          className={isActive ? 'text-orange-400' : isDoc ? 'text-orange-500' : 'text-blue-500'}/>
                                                <span className="font-mono uppercase tracking-tight">
                                                    {isDoc ? "DOC" : "MAP"}
                                                </span>
                                            </div>
                                            <span className="opacity-50">|</span>
                                            <span className="font-mono truncate max-w-[60px]">
                                                {item.year}
                                            </span>
                                        </div>

                                        <div className={`
                                            text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border 
                                            ${isActive
                                            ? 'bg-orange-500/20 text-orange-300 border-orange-500/30'
                                            : 'bg-slate-100 text-slate-500 border-slate-200'} 
                                        `}>
                                            {score}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Handle */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={`
                    absolute top-8 left-full ml-[-1px]
                    h-16 w-6
                    bg-[#fdfbf7] border-y border-r border-slate-300
                    rounded-r-md shadow-lg cursor-pointer
                    flex items-center justify-center
                    text-slate-500 hover:text-orange-600 hover:bg-white
                    transition-all duration-300
                `}
                title={isCollapsed ? "Expand Results" : "Collapse Results"}
            >
                {isCollapsed ? <ChevronRight size={16}/> : <ChevronLeft size={16}/>}
                {isCollapsed && results.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                        <span
                            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                    </span>
                )}
            </button>
        </div>
    );
}

// export function ResultsSidebar({results, onSelect, activeId}) {
//     // 控制折叠状态，默认展开
//     const [isCollapsed, setIsCollapsed] = useState(false);
//
//     // 当有新结果搜索出来时，自动展开侧边栏
//     useEffect(() => {
//         if (results && results.length > 0) {
//             setIsCollapsed(false);
//         }
//     }, [results]);
//
//     // 如果没有结果，完全不渲染
//     if (!results || results.length === 0) return null;
//
//     // 辅助函数：格式化坐标
//     const formatCoord = (val, type) => {
//         if (!val) return '';
//         const dir = type === 'lat' ? (val > 0 ? 'N' : 'S') : (val > 0 ? 'E' : 'W');
//         return `${Math.abs(val).toFixed(3)}° ${dir}`;
//     };
//
//     return (
//         <div
//             // ✨ 容器层：负责定位和动画
//             className={`
//                 absolute top-24 z-[900] h-[calc(100vh-140px)] flex items-start transition-transform duration-500 ease-in-out
//                 ${isCollapsed ? '-translate-x-[calc(100%-12px)]' : 'translate-x-6'}
//             `}
//         >
//             {/* 📜 侧边栏主体卡片 */}
//             <Card
//                 className="w-80 h-full bg-ceramic shadow-2xl shadow-deep-ocean/20 border border-border/60 rounded-xl overflow-hidden flex flex-col backdrop-blur-sm relative"
//             >
//                 {/* Header: 档案头 */}
//                 <div
//                     className="px-5 py-4 border-b border-border/40 bg-atlas-paper/50 backdrop-blur-md relative z-10 shrink-0">
//                     <div className="flex items-end justify-between">
//                         <h3 className="font-serif text-lg font-bold text-deep-ocean tracking-wide flex items-center gap-2">
//                             <Library size={18} className="text-time-gold"/>
//                             ARCHIVE INDEX
//                         </h3>
//                         {/* 移动端收起按钮 */}
//                         <button
//                             onClick={() => setIsCollapsed(true)}
//                             className="text-faded-slate hover:text-deep-ocean transition-colors md:hidden"
//                         >
//                             <ChevronLeft size={16}/>
//                         </button>
//                     </div>
//                     <span
//                         className="text-[10px] text-faded-slate font-mono uppercase tracking-widest mt-1 block opacity-70">
//                         VOL. {String(results.length).padStart(2, '0')}
//                     </span>
//                     {/* 装饰线条 */}
//                     <div className="absolute bottom-0 left-0 right-0 h-[3px] border-t border-border/30"></div>
//                 </div>
//
//                 {/* List Area */}
//                 <div
//                     className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar w-full p-2 space-y-1 bg-[#fdfbf7]">
//                     {results.map((item, index) => {
//                         const isActive = activeId === item.id;
//                         const score = (item.score * 100).toFixed(0);
//
//                         return (
//                             <div
//                                 key={item.id}
//                                 onClick={() => onSelect(item)}
//                                 className={`
//                                     group relative p-3 pl-4 cursor-pointer transition-all duration-300 rounded-lg border
//                                     ${isActive
//                                     ? 'bg-deep-ocean border-deep-ocean shadow-lg scale-[1.02] z-10'
//                                     : 'bg-white border-transparent hover:border-border hover:bg-white hover:shadow-sm z-0'}
//                                 `}
//                             >
//                                 <div className="flex flex-col gap-1 relative z-10">
//                                     <div className="flex items-start justify-between gap-3">
//                                         <div className="flex-1 min-w-0">
//                                             <h4 className={`text-sm font-serif font-bold leading-tight truncate transition-colors ${isActive ? 'text-[#f0f0f0]' : 'text-deep-ocean'}`}>
//                                                 <span
//                                                     className={`inline-block w-6 font-mono font-normal text-[10px] mr-1 ${isActive ? 'text-time-gold' : 'text-faded-slate/60'}`}>
//                                                     {String(index + 1).padStart(2, '0')}
//                                                 </span>
//                                                 {item.content && item.content !== `Location (ID: ${item.id.slice(0, 8)}...)`
//                                                     ? item.content
//                                                     : item.fullData?.image_source || "Uncharted Fragment"}
//                                             </h4>
//                                         </div>
//                                         <ArrowRight
//                                             size={14}
//                                             className={`transition-all duration-300 shrink-0 mt-0.5
//                                                 ${isActive
//                                                 ? 'text-time-gold translate-x-0 opacity-100'
//                                                 : 'text-faded-slate -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}
//                                             `}
//                                         />
//                                     </div>
//                                     <div className="flex items-center justify-between mt-2 pl-7">
//                                         <div
//                                             className={`flex items-center gap-1.5 text-[10px] font-mono tracking-tight ${isActive ? 'text-white/40' : 'text-faded-slate/70'}`}>
//                                             <MapPin size={10}
//                                                     className={isActive ? 'text-time-gold/70' : 'text-faded-slate/50'}/>
//                                             <span>{formatCoord(item.lat, 'lat')} , {formatCoord(item.lon, 'lon')}</span>
//                                         </div>
//                                         <div
//                                             className={`text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider border transition-colors ${isActive ? 'bg-time-gold/90 text-deep-ocean border-transparent' : score > 80 ? 'bg-stone-100 text-stone-600 border-stone-200' : 'text-transparent border-transparent'} `}>
//                                             {score}% Match
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </Card>
//
//             {/* 🏷️ 侧边把手 (Toggle Handle) */}
//             <button
//                 onClick={() => setIsCollapsed(!isCollapsed)}
//                 className={`
//                     absolute top-6 -right-8
//                     h-12 w-8
//                     bg-ceramic border-y border-r border-border/60
//                     rounded-r-lg shadow-md cursor-pointer
//                     flex items-center justify-center
//                     text-deep-ocean hover:text-time-gold hover:bg-stone-50
//                     transition-all duration-300 z-[-1]
//                 `}
//                 title={isCollapsed ? "Expand Results" : "Collapse Results"}
//             >
//                 {/* 图标：根据状态切换方向 */}
//                 {isCollapsed ? <ChevronRight size={18}/> : <ChevronLeft size={18}/>}
//
//                 {/* 🔴 小红点提示：当折叠且有结果时显示 */}
//                 {isCollapsed && results.length > 0 && (
//                     <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
//                         <span
//                             className="animate-ping absolute inline-flex h-full w-full rounded-full bg-time-gold opacity-75"></span>
//                         <span
//                             className="relative inline-flex rounded-full h-4 w-4 bg-time-gold text-deep-ocean text-[9px] font-bold items-center justify-center border border-white">
//                             {results.length > 9 ? '9+' : results.length}
//                         </span>
//                     </span>
//                 )}
//             </button>
//         </div>
//     );
// }

// 'use client';
//
// import {useState, useEffect} from "react";
// import {Card} from "@/components/ui/card";
// import {ArrowRight, MapPin, ChevronLeft, ChevronRight, Library} from "lucide-react";
//
// export function ResultsSidebar({results, onSelect, activeId}) {
//     // 控制折叠状态，默认展开
//     const [isCollapsed, setIsCollapsed] = useState(false);
//
//     // 当有新结果搜索出来时，自动展开侧边栏
//     useEffect(() => {
//         if (results && results.length > 0) {
//             setIsCollapsed(false);
//         }
//     }, [results]);
//
//     // 如果没有结果，完全不渲染
//     if (!results || results.length === 0) return null;
//
//     // 辅助函数：格式化坐标
//     const formatCoord = (val, type) => {
//         if (!val) return '';
//         const dir = type === 'lat' ? (val > 0 ? 'N' : 'S') : (val > 0 ? 'E' : 'W');
//         return `${Math.abs(val).toFixed(3)}° ${dir}`;
//     };
//
//     return (
//         <div
//             // ✨ 容器层：负责定位和动画
//             className={`
//                 absolute top-24 z-[900] h-[calc(100vh-140px)] flex items-start transition-transform duration-500 ease-in-out
//                 ${isCollapsed ? '-translate-x-[calc(100%-12px)]' : 'translate-x-6'}
//             `}
//         >
//             {/* 📜 侧边栏主体卡片 */}
//             <Card
//                 // 🎨 调整 1: 阴影加深 (shadow-deep-ocean/30)，背景使用实体陶瓷色，去除半透明模糊，增强厚重感
//                 className="w-80 h-full bg-ceramic shadow-2xl shadow-deep-ocean/30 border border-border rounded-xl overflow-hidden flex flex-col relative"
//             >
//                 {/* Header: 档案头 */}
//                 {/* 🎨 调整 2: 背景改为实色 bg-atlas-paper，去除 semi-transparent */}
//                 <div className="px-5 py-4 border-b border-border bg-atlas-paper relative z-10 shrink-0">
//                     <div className="flex items-end justify-between">
//                         {/* 🎨 调整 3: 标题颜色加深，增加投影 */}
//                         <h3 className="font-serif text-lg font-bold text-deep-ocean tracking-wide flex items-center gap-2">
//                             <Library size={18} className="text-time-gold drop-shadow-sm"/>
//                             ARCHIVE INDEX
//                         </h3>
//                         <button
//                             onClick={() => setIsCollapsed(true)}
//                             className="text-stone-400 hover:text-deep-ocean transition-colors md:hidden"
//                         >
//                             <ChevronLeft size={16}/>
//                         </button>
//                     </div>
//                     {/* 🎨 调整 4: 副标题透明度提高，字体加粗 */}
//                     <span
//                         className="text-[10px] text-stone-500 font-mono uppercase tracking-widest mt-1 block font-bold opacity-90">
//                         VOL. {String(results.length).padStart(2, '0')}
//                     </span>
//                     <div className="absolute bottom-0 left-0 right-0 h-[3px] border-t border-border/50"></div>
//                 </div>
//
//                 {/* List Area */}
//                 {/* 🎨 调整 5: 列表背景色调暗一点 (#f4f1ea)，形成“凹陷”感，衬托白卡片 */}
//                 <div
//                     className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar w-full p-2 space-y-2 bg-[#f4f1ea]">
//                     {results.map((item, index) => {
//                         const isActive = activeId === item.id;
//                         const score = (item.score * 100).toFixed(0);
//
//                         return (
//                             <div
//                                 key={item.id}
//                                 onClick={() => onSelect(item)}
//                                 className={`
//                                     group relative p-3 pl-4 cursor-pointer transition-all duration-300 rounded-lg border
//                                     ${isActive
//                                     ? 'bg-deep-ocean border-deep-ocean shadow-lg scale-[1.02] z-10' // 激活：深蓝实体
//                                     // 🎨 调整 6: 未激活状态增加边框 (border-stone-200) 和悬浮金边，不再是隐形的
//                                     : 'bg-white border-stone-200 hover:border-time-gold hover:shadow-md z-0'}
//                                 `}
//                             >
//                                 <div className="flex flex-col gap-1 relative z-10">
//                                     <div className="flex items-start justify-between gap-3">
//                                         <div className="flex-1 min-w-0">
//                                             {/* 🎨 调整 7: 标题颜色加深 (text-stone-800) */}
//                                             <h4 className={`text-sm font-serif font-bold leading-tight truncate transition-colors ${isActive ? 'text-[#fbfbfb]' : 'text-stone-800'}`}>
//                                                 <span
//                                                     className={`inline-block w-6 font-mono font-normal text-[11px] mr-1 ${isActive ? 'text-time-gold' : 'text-stone-400'}`}>
//                                                     {String(index + 1).padStart(2, '0')}
//                                                 </span>
//                                                 {item.content && item.content !== `Location (ID: ${item.id.slice(0, 8)}...)`
//                                                     ? item.content
//                                                     : item.fullData?.image_source || "Uncharted Fragment"}
//                                             </h4>
//                                         </div>
//                                         <ArrowRight
//                                             size={14}
//                                             className={`transition-all duration-300 shrink-0 mt-0.5
//                                                 ${isActive
//                                                 ? 'text-time-gold translate-x-0 opacity-100'
//                                                 : 'text-stone-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-time-gold'}
//                                             `}
//                                         />
//                                     </div>
//                                     <div className="flex items-center justify-between mt-2 pl-7">
//                                         {/* 🎨 调整 8: 坐标文字不再是 faded-slate，而是清晰的 stone-500 */}
//                                         <div
//                                             className={`flex items-center gap-1.5 text-[10px] font-mono tracking-tight font-medium ${isActive ? 'text-white/60' : 'text-stone-500'}`}>
//                                             <MapPin size={10}
//                                                     className={isActive ? 'text-time-gold' : 'text-stone-400'}/>
//                                             <span>{formatCoord(item.lat, 'lat')} , {formatCoord(item.lon, 'lon')}</span>
//                                         </div>
//
//                                         {/* 🎨 调整 9: 匹配度标签使用琥珀色背景 (bg-orange-100)，增加对比度 */}
//                                         <div className={`text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider border transition-colors
//                                             ${isActive
//                                             ? 'bg-time-gold text-deep-ocean border-transparent shadow-sm'
//                                             : score > 80
//                                                 ? 'bg-orange-100 text-orange-800 border-orange-200' // 高分显示琥珀色
//                                                 : 'bg-stone-100 text-stone-600 border-stone-200'} // 普通显示暖灰色
//                                         `}>
//                                             {score}% Match
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </Card>
//
//             {/* 🏷️ 侧边把手 (Toggle Handle) */}
//             <button
//                 onClick={() => setIsCollapsed(!isCollapsed)}
//                 className={`
//                     absolute top-6 -right-8
//                     h-12 w-8
//                     // 🎨 调整 10: 把手颜色加深，增加实体感
//                     bg-ceramic border-y border-r border-border
//                     rounded-r-lg shadow-md cursor-pointer
//                     flex items-center justify-center
//                     text-deep-ocean hover:text-time-gold hover:bg-stone-100
//                     transition-all duration-300 z-[-1]
//                 `}
//                 title={isCollapsed ? "Expand Results" : "Collapse Results"}
//             >
//                 {/* 图标 */}
//                 {isCollapsed ? <ChevronRight size={18}/> : <ChevronLeft size={18}/>}
//
//                 {/* 🔴 小红点提示 */}
//                 {isCollapsed && results.length > 0 && (
//                     <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
//                         <span
//                             className="animate-ping absolute inline-flex h-full w-full rounded-full bg-time-gold opacity-75"></span>
//                         <span
//                             className="relative inline-flex rounded-full h-4 w-4 bg-time-gold text-deep-ocean text-[9px] font-bold items-center justify-center border border-white shadow-sm">
//                             {results.length > 9 ? '9+' : results.length}
//                         </span>
//                     </span>
//                 )}
//             </button>
//         </div>
//     );
// }


