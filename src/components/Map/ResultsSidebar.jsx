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

    // Auto-expand sidebar when new results arrive
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
            {/* Main Card Container */}
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

                        // 1. Determine item type
                        const isDoc = item.fullData?.type === 'document' || item.type === 'document';
                        const TypeIcon = isDoc ? ScrollText : MapIcon;

                        // 2. Calculate display title logic
                        let displayTitle = "Uncharted Fragment";

                        if (isDoc) {
                            // Attempt to retrieve metadata
                            let meta = item.fullData?.full_metadata || item.fullData?.metadata;

                            // Parse if string
                            if (typeof meta === 'string') {
                                try {
                                    meta = JSON.parse(meta);
                                } catch (e) {
                                    meta = {};
                                }
                            }

                            // Ensure object validity
                            if (!meta || typeof meta !== 'object') meta = {};

                            // Rule: Show Place if available, otherwise "Anonymous Location"
                            if (meta.Place && meta.Place.trim() !== "") {
                                displayTitle = meta.Place;
                            } else {
                                displayTitle = "Anonymous Location";
                            }
                        } else {
                            // Default logic for Map types
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
                                            {/* Index Number */}
                                            <span
                                                className={`font-mono text-[10px] mt-1 ${isActive ? 'text-orange-400' : 'text-slate-300'}`}>
                                                {String(index + 1).padStart(2, '0')}
                                            </span>

                                            {/* Display Title */}
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

                                    {/* Bottom Row: Type, Year, Score */}
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

            {/* Toggle Handle */}
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