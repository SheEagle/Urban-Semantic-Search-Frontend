'use client';

import {Map as MapIcon, Check, Layers} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Slider} from "@/components/ui/slider";
import {useState} from "react";

// 预定义的地图列表
const AVAILABLE_MAPS = [
    {
        id: 'venice_mortier_1704',
        name: 'Venice Cityscape (Mortier Compilation)',
        year: 1704,
        thumb: '/maps/raw/sample_venice_map_3.jpg'
    },
    {id: 'venice_1900', name: '1900 Modern Survey', year: 1900, thumb: '/maps/thumbs/1900.jpg'}
];

export function MapLayerSelector({activeMapId, opacity, onMapChange, onOpacityChange, isOpen, onToggle}) {
    return (
        <Popover open={isOpen} onOpenChange={onToggle}>
            <PopoverTrigger asChild>
                <button
                    className={`flex flex-col items-center gap-1 transition-all duration-300 group ${isOpen || activeMapId ? 'opacity-100 -translate-y-1' : 'opacity-60 hover:opacity-100'}`}
                >
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-sm transition-all ${activeMapId ? 'bg-deep-ocean border-transparent text-white shadow-md' : 'bg-atlas-paper border-border text-deep-ocean'}`}>
                        <Layers size={18}/>
                    </div>
                    <span
                        className="text-[9px] font-bold uppercase tracking-widest text-faded-slate group-hover:text-deep-ocean">
                        {activeMapId ? 'Map Active' : 'Overlay'}
                    </span>
                </button>
            </PopoverTrigger>

            <PopoverContent
                side="top"
                align="center"
                className="w-72 bg-ceramic p-4 shadow-2xl border-border z-[2000] mb-4"
            >
                <div className="space-y-4">
                    <h4 className="font-serif font-bold text-deep-ocean text-sm border-b border-border pb-2 flex justify-between">
                        <span>Select Layer</span>
                        <span
                            className="text-[10px] text-time-gold font-mono">{Math.round(opacity * 100)}% OPACITY</span>
                    </h4>

                    {/* 透明度滑块移动到这里 */}
                    <Slider
                        value={[opacity * 100]}
                        max={100}
                        step={1}
                        onValueChange={(val) => onOpacityChange(val[0] / 100)}
                        className="py-2"
                    />

                    {/* 地图列表 */}
                    <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto custom-scrollbar">
                        <button
                            onClick={() => onMapChange(null)} // 关闭
                            className={`flex items-center gap-3 p-2 rounded-md border text-left transition-colors ${!activeMapId ? 'bg-slate-100 border-slate-300' : 'hover:bg-slate-50 border-transparent'}`}
                        >
                            <div
                                className="w-8 h-8 rounded bg-slate-200 flex items-center justify-center text-slate-400">
                                <XIcon size={14}/></div>
                            <span className="text-xs font-bold text-slate-500">None (Modern Only)</span>
                        </button>

                        {AVAILABLE_MAPS.map(map => (
                            <button
                                key={map.id}
                                onClick={() => onMapChange(map.id)}
                                className={`flex items-center gap-3 p-2 rounded-md border text-left transition-all ${activeMapId === map.id ? 'bg-deep-ocean/5 border-time-gold ring-1 ring-time-gold/30' : 'bg-white border-border hover:border-deep-ocean/30'}`}
                            >
                                {/* 缩略图占位 */}
                                <div className="w-10 h-10 rounded bg-slate-200 shrink-0 overflow-hidden relative">
                                    {/* <img src={map.thumb} ... /> */}
                                    <div className="absolute inset-0 bg-deep-ocean/10"></div>
                                    {activeMapId === map.id && (
                                        <div
                                            className="absolute inset-0 flex items-center justify-center bg-deep-ocean/40 text-white">
                                            <Check size={16} strokeWidth={3}/>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-deep-ocean">{map.name}</div>
                                    <div className="text-[10px] text-faded-slate font-mono">{map.year} AD</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

// 简单的辅助图标
const XIcon = ({size}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
)