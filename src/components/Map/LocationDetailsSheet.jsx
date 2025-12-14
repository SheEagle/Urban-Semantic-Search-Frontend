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