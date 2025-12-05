'use client';

import {Card} from "@/components/ui/card";
import {MapPin, ArrowRight, Image as ImageIcon} from "lucide-react";

export function ResultsSidebar({results, onSelect, activeId}) {
    // 如果没有结果，不显示侧边栏
    if (!results || results.length === 0) return null;

    return (
        <Card
            className="absolute top-24 left-4 z-[900] w-80 max-h-[calc(100vh-180px)] bg-white/95 backdrop-blur-md shadow-xl border-slate-200 overflow-hidden flex flex-col transition-all duration-300 animate-in slide-in-from-left-5">

            {/* 标题栏 */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/80 sticky top-0 z-10">
                <h3 className="font-semibold text-slate-800 flex items-center justify-between text-sm">
                    <span>Search Results</span>
                    <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs">
            {results.length}
          </span>
                </h3>
            </div>

            {/* 滚动列表区域 */}
            <div className="overflow-y-auto flex-1 p-2 space-y-2 custom-scrollbar">
                {results.map((item, index) => (
                    <div
                        key={item.id}
                        onClick={() => onSelect(item)}
                        className={`
              group relative p-3 rounded-xl cursor-pointer transition-all duration-200 border
              ${activeId === item.id
                            ? 'bg-blue-50/80 border-blue-200 shadow-sm ring-1 ring-blue-100'
                            : 'bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-100'}
            `}
                    >
                        <div className="flex items-start gap-3">
                            {/* 序号图标 */}
                            <div className={`
                mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors
                ${activeId === item.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}
              `}>
                                {index + 1}
                            </div>

                            <div className="flex-1 min-w-0">
                                {/* 标题 */}
                                <h4 className={`text-sm font-medium truncate ${activeId === item.id ? 'text-blue-700' : 'text-slate-700'}`}>
                                    {item.fullData?.image_source || "Historical Location"}
                                </h4>

                                {/* ID 和 分数 */}
                                <div className="flex items-center gap-2 mt-1">
                   <span className="text-[10px] text-slate-400 font-mono truncate max-w-[80px]">
                     {item.id.split('-')[0]}
                   </span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                        item.score > 0.8 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                                    }`}>
                     {item.score.toFixed(2)}
                   </span>
                                </div>

                                {/* 如果有图片切片坐标，显示一个小图标提示 */}
                                {item.fullData?.pixel_coords && (
                                    <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-400">
                                        <ImageIcon size={10}/>
                                        <span>Visual Fragment Available</span>
                                    </div>
                                )}
                            </div>

                            {/* 箭头 (选中或悬浮显示) */}
                            <div className={`
                self-center text-blue-500 transition-all duration-200 
                ${activeId === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}
              `}>
                                <ArrowRight size={16}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}