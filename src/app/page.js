// 'use client';
//
// import {useState} from 'react';
// import dynamic from 'next/dynamic';
// import {SearchControl} from '@/components/Map/SearchControl';
// import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription} from "@/components/ui/sheet";
// import {Slider} from "@/components/ui/slider";
// import {ResultsSidebar} from "@/components/Map/ResultsSidebar";
// import {LocationDetailsSheet} from "@/components/Map/LocationDetailsSheet";
// import {MapIcon, Flame} from "lucide-react";
//
// // 动态导入地图组件
// const MapComponent = dynamic(
//     () => import('@/components/Map/DynamicMap'),
//     {
//         ssr: false,
//         loading: () => (
//             <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
//                 <div className="text-slate-500 animate-pulse">Loading Map...</div>
//             </div>
//         )
//     }
// );
//
// const ToggleOption = ({active, label, icon: Icon, colorClass, onClick}) => (
//     <button
//         onClick={onClick}
//         className={`flex flex-col items-center gap-1 transition-all duration-300 group ${active ? 'opacity-100 -translate-y-1' : 'opacity-50 hover:opacity-80'}`}
//     >
//         <div
//             className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-sm transition-all ${active ? `${colorClass} border-transparent text-white` : 'bg-paper border-ink/20 text-ink'}`}>
//             <Icon size={18}/>
//         </div>
//         <span className="text-[9px] font-bold uppercase tracking-widest text-ink/60 group-hover:text-ink">{label}</span>
//     </button>
// );
//
// export default function Home() {
//     const [searchResults, setSearchResults] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [selectedLocation, setSelectedLocation] = useState(null);
//
//     // 交互状态
//     const [activeLocation, setActiveLocation] = useState(null); // 用于控制地图缩放/高亮
//
//     // 图层和透明度状态
//     const [layers, setLayers] = useState({
//         history: false,
//         pins: true,
//         heatmap: false
//     });
//     const [opacity, setOpacity] = useState([70]);
//
//     // 🔍 核心修改：对接真实后端 API
//     // 🔍 修改 handleSearch 为 POST 请求
//     const handleSearch = async (query) => {
//         setIsLoading(true);
//
//         try {
//             // 1. 接口地址 (注意：现在不需要在 URL 后面拼 ?query=xxx 了)
//             const apiUrl = "http://localhost:8000/api/v1/search/text";
//
//             // 2. 发起 POST 请求
//             const response = await fetch(apiUrl, {
//                 method: "POST", // 🔥 指定为 POST
//                 headers: {
//                     "Content-Type": "application/json", // 🔥 告诉后端发送的是 JSON 数据
//                 },
//                 body: JSON.stringify({
//                     query: query
//
//                 }),
//             });
//
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//
//             // 4. 解析结果 (逻辑保持不变)
//             const result = await response.json();
//
//             if (result.status === 'success' && Array.isArray(result.data)) {
//                 const adaptedResults = result.data.map((item) => ({
//                     id: item.id,
//                     lat: item.lat,
//                     lon: item.lng, // 后端是 lng，前端组件用 lon
//                     score: item.score,
//                     content: `Location (ID: ${item.id.slice(0, 8)}...)`,
//                     fullData: item,
//                     pixel_coords: item.pixel_coords
//                 }));
//                 setSearchResults(adaptedResults);
//             } else {
//                 setSearchResults([]);
//             }
//
//         } catch (error) {
//             console.error("Search failed:", error);
//             // alert("Search failed"); // 可选：出错弹窗
//             setSearchResults([]);
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     // 当在侧边栏点击某一项时
//     const handleResultClick = (location) => {
//         setActiveLocation(location);   // 1. 地图飞过去 (MapController)
//         setSelectedLocation(location); // 2. 打开右侧详情 (Sheet)
//     };
//
//     // 当在地图上点击 Marker 时
//     const handleMarkerClick = (location) => {
//         setActiveLocation(location);   // 1. 更新当前激活状态 (让侧边栏高亮)
//         setSelectedLocation(location); // 2. 打开右侧详情
//     };
//
//     return (
//         <main className="relative w-screen h-screen overflow-hidden bg-slate-50">
//
//             {/* 搜索栏 */}
//             <SearchControl onSearch={handleSearch} isLoading={isLoading}/>
//
//             {/* 左侧：结果列表侧边栏 (新增) */}
//             <ResultsSidebar
//                 results={searchResults}
//                 onSelect={handleResultClick}
//                 activeId={activeLocation?.id} // 传入 activeId 用于高亮列表项
//             />
//
//             {/* Bottom Center: Control Panel (Redesigned as a Dock) */}
//             <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-[1000]">
//                 {/* 修复点：将 bg-parchment/90 改为 bg-paper (实心) */}
//                 {/* 增加 shadow-2xl，看起来悬浮感更强 */}
//                 <div
//                     className="bg-paper px-8 py-4 rounded-full shadow-2xl border border-ink/10 flex items-center gap-8 transition-all hover:scale-[1.01]">
//
//                     {/* Opacity Slider */}
//                     <div className="flex flex-col gap-2 w-32">
//                         <div
//                             className="flex justify-between text-[10px] uppercase tracking-widest text-ink/60 font-bold">
//                             <span>Overlay</span>
//                             <span>{opacity}%</span>
//                         </div>
//                         <Slider
//                             defaultValue={[70]}
//                             max={100}
//                             step={1}
//                             value={opacity}
//                             onValueChange={setOpacity}
//                             className="cursor-pointer"
//                         />
//                     </div>
//
//                     <div className="h-8 w-px bg-ink/10"></div>
//
//                     {/* Layer Toggles */}
//                     <div className="flex gap-6">
//                         <ToggleOption
//                             active={layers.history}
//                             label="Map"
//                             icon={MapIcon}
//                             colorClass="bg-ink"
//                             onClick={() => setLayers(p => ({...p, history: !p.history}))}
//                         />
//                         <ToggleOption
//                             active={layers.pins}
//                             label="Pins"
//                             icon={MapIcon}
//                             colorClass="bg-wax-red"
//                             onClick={() => setLayers(p => ({...p, pins: !p.pins}))}
//                         />
//                         <ToggleOption
//                             active={layers.heatmap}
//                             label="Heat"
//                             icon={Flame}
//                             colorClass="bg-orange-600"
//                             onClick={() => setLayers(p => ({...p, heatmap: !p.heatmap}))}
//                         />
//                     </div>
//                 </div>
//             </div>
//             {/* Right: Details Sheet (New Component) */}
//             <LocationDetailsSheet
//                 location={selectedLocation}
//                 open={!!selectedLocation}
//                 onOpenChange={() => setSelectedLocation(null)}
//             />
//
//             {/* Map Component */}
//             <MapComponent
//                 searchResults={searchResults}
//                 showLayer1={layers.history}
//                 showLayer2={layers.pins}
//                 showLayer3={layers.heatmap}
//                 opacity={opacity[0] / 100}
//                 activeLocation={activeLocation}
//                 onMarkerClick={handleMarkerClick}
//             />
//
//         </main>
//     );
// }

'use client';

import {useState, useMemo} from 'react';
import dynamic from 'next/dynamic';
import {SearchControl} from '@/components/Map/SearchControl';
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription} from "@/components/ui/sheet";
import {Slider} from "@/components/ui/slider";
import {ResultsSidebar} from "@/components/Map/ResultsSidebar";
import {LocationDetailsSheet} from "@/components/Map/LocationDetailsSheet";
import {MapIcon, Flame, LocateFixed} from "lucide-react";

import {TimelineControl} from '@/components/Map/TimelineControl'; // 新导入
import {MapLayerSelector} from '@/components/Map/MapLayerSelector'; // 新导入

const MapComponent = dynamic(() => import('@/components/Map/DynamicMap'), {
    ssr: false,
    loading: () => <div className="flex h-screen w-screen items-center justify-center bg-slate-50">Loading...</div>
});

// 动态导入地图组件
// const MapComponent = dynamic(
//     () => import('@/components/Map/DynamicMap'),
//     {
//         ssr: false,
//         loading: () => (
//             <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
//                 <div className="text-slate-500 animate-pulse">Loading Map...</div>
//             </div>
//         )
//     }
// );

const ToggleOption = ({active, label, icon: Icon, colorClass, onClick}) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center gap-1 transition-all duration-300 group ${active ? 'opacity-100 -translate-y-1' : 'opacity-50 hover:opacity-80'}`}
    >
        <div
            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-sm transition-all ${active ? `${colorClass} border-transparent text-white` : 'bg-atlas-paper border-border text-deep-ocean'}`}>
            <Icon size={18}/>
        </div>
        <span
            className="text-[9px] font-bold uppercase tracking-widest text-faded-slate group-hover:text-deep-ocean">{label}</span>
    </button>
);

export default function Home() {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // 图层和透明度状态
    const [layers, setLayers] = useState({
        history: false,
        pins: true,
        heatmap: false
    });
    const [opacity, setOpacity] = useState([70]);


    const [rawSearchResults, setRawSearchResults] = useState([]); // 原始数据

    // 状态
    const [activeLocation, setActiveLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [yearRange, setYearRange] = useState([1000, 2024]); // 时间轴范围

    // 图层状态
    const [activeMapId, setActiveMapId] = useState(null); // 改为存 ID，null 表示不显示
    const [showPins, setShowPins] = useState(true);
    const [showHeatmap, setShowHeatmap] = useState(false);
    const [isMapSelectorOpen, setIsMapSelectorOpen] = useState(false);


    // 🔍 核心修改：支持 Text 和 Image 双模式
    const handleSearch = async (content, type = 'text') => {
        setIsLoading(true);

        try {
            let response;

            if (type === 'image') {
                // --- 图片搜索逻辑 ---
                const apiUrl = "http://localhost:8000/api/v1/search/image";

                // 构建 FormData 上传文件
                const formData = new FormData();
                formData.append("file", content); // content 这里是 File 对象

                response = await fetch(apiUrl, {
                    method: "POST",
                    // 注意：fetch 发送 FormData 时不需要手动设置 Content-Type，浏览器会自动设置 multipart/form-data boundary
                    body: formData,
                });

            } else {
                // --- 文本搜索逻辑 (保持原样) ---
                const apiUrl = "http://localhost:8000/api/v1/search/text";
                response = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        query: content // content 这里是字符串
                    }),
                });
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // ... 解析结果逻辑保持不变 ...
            if (result.status === 'success' && Array.isArray(result.data)) {
                const adaptedResults = result.data.map((item) => ({
                    id: item.id,
                    lat: item.lat,
                    lon: item.lng,
                    score: item.score,
                    content: `Location (ID: ${item.id.slice(0, 8)}...)`,
                    fullData: item,
                    pixel_coords: item.pixel_coords
                }));
                setRawSearchResults(adaptedResults);
            } else {
                setRawSearchResults([]);
            }

        } catch (error) {
            console.error("Search failed:", error);
            setRawSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredResults = useMemo(() => {
        return rawSearchResults.filter(item => {
            // ⚠️ 模拟：如果没有年份字段，生成一个伪随机年份用于演示过滤效果
            // 实际请用 item.fullData.year
            const mockYear = 1400 + (item.id.charCodeAt(0) * 10) % 500;
            return mockYear >= yearRange[0] && mockYear <= yearRange[1];
        });
    }, [rawSearchResults, yearRange]);

    // 当在侧边栏点击某一项时
    const handleResultClick = (location) => {
        setActiveLocation(location);   // 1. 地图飞过去 (MapController)
        setSelectedLocation(location); // 2. 打开右侧详情 (Sheet)
    };

    // 当在地图上点击 Marker 时
    const handleMarkerClick = (location) => {
        setActiveLocation(location);   // 1. 更新当前激活状态 (让侧边栏高亮)
        setSelectedLocation(location); // 2. 打开右侧详情
    };

    return (
        <main className="relative w-screen h-screen overflow-hidden bg-background"> {/* 使用新的 bg-background */}

            {/* 搜索栏 */}
            <SearchControl onSearch={handleSearch} isLoading={isLoading}/>

            {/*/!* 左侧：结果列表侧边栏 (新增) *!/*/}
            {/*<ResultsSidebar*/}
            {/*    results={searchResults}*/}
            {/*    onSelect={handleResultClick}*/}
            {/*    activeId={activeLocation?.id} // 传入 activeId 用于高亮列表项*/}
            {/*/>*/}

            {/* 2. 左侧列表 (使用过滤后的数据) */}
            <ResultsSidebar
                results={filteredResults}
                onSelect={(loc) => {
                    setActiveLocation(loc);
                    setSelectedLocation(loc);
                }}
                activeId={activeLocation?.id}
            />

            {/* Bottom Center: Control Panel (Redesigned as a Dock) */}
            {/*<div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-[1000]">*/}
            {/*    /!* 使用新的 bg-ceramic 和 shadow-ceramic *!/*/}
            {/*    <div*/}
            {/*        className="bg-ceramic px-8 py-4 rounded-full shadow-ceramic border border-border flex items-center gap-8 transition-all hover:scale-[1.01]">*/}

            {/*        /!* Opacity Slider *!/*/}
            {/*        <div className="flex flex-col gap-2 w-32">*/}
            {/*            <div*/}
            {/*                className="flex justify-between text-[10px] uppercase tracking-widest text-faded-slate font-bold">*/}
            {/*                <span>Overlay</span>*/}
            {/*                <span>{opacity}%</span>*/}
            {/*            </div>*/}
            {/*            <Slider*/}
            {/*                defaultValue={[70]}*/}
            {/*                max={100}*/}
            {/*                step={1}*/}
            {/*                value={opacity}*/}
            {/*                onValueChange={setOpacity}*/}
            {/*                className="cursor-pointer"*/}
            {/*            />*/}
            {/*        </div>*/}

            {/*        <div className="h-8 w-px bg-border"></div>*/}
            {/*        /!* 使用新的 border 颜色 *!/*/}

            {/*        /!* Layer Toggles *!/*/}
            {/*        <div className="flex gap-6">*/}
            {/*            <ToggleOption*/}
            {/*                active={layers.history}*/}
            {/*                label="Map"*/}
            {/*                icon={MapIcon}*/}
            {/*                colorClass="bg-deep-ocean" // 使用深蓝作为主色*/}
            {/*                onClick={() => setLayers(p => ({...p, history: !p.history}))}*/}
            {/*            />*/}
            {/*            <ToggleOption*/}
            {/*                active={layers.pins}*/}
            {/*                label="Pins"*/}
            {/*                icon={MapIcon}*/}
            {/*                colorClass="bg-time-gold" // 使用玫瑰金作为强调色*/}
            {/*                onClick={() => setLayers(p => ({...p, pins: !p.pins}))}*/}
            {/*            />*/}
            {/*            <ToggleOption*/}
            {/*                active={layers.heatmap}*/}
            {/*                label="Heat"*/}
            {/*                icon={Flame}*/}
            {/*                colorClass="bg-orange-600"*/}
            {/*                onClick={() => setLayers(p => ({...p, heatmap: !p.heatmap}))}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/* 3. 底部宽幅 Dock (新设计) */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[1000] w-[95%] max-w-5xl">
                <div
                    className="bg-ceramic/95 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-2xl border border-border/60 flex items-center justify-between gap-6 h-20 transition-all hover:bg-ceramic">

                    {/* 左侧：时间轴控制器 */}
                    <div className="flex-1 h-full border-r border-border/50 pr-6 mr-2">
                        <TimelineControl
                            data={rawSearchResults}
                            onFilterChange={setYearRange}
                        />
                    </div>

                    {/* 右侧：功能按钮组 */}
                    <div className="flex items-center gap-6 shrink-0 pb-1">

                        {/* 地图图层选择 (带弹出框) */}
                        <MapLayerSelector
                            activeMapId={activeMapId}
                            opacity={opacity}
                            onMapChange={setActiveMapId}
                            onOpacityChange={setOpacity}
                            isOpen={isMapSelectorOpen}
                            onToggle={setIsMapSelectorOpen}
                        />

                        {/* Pins 开关 */}
                        <ToggleOption
                            active={showPins} label="Pins" icon={LocateFixed}
                            colorClass="bg-time-gold"
                            onClick={() => setShowPins(!showPins)}
                        />

                        {/* Heatmap 开关 */}
                        <ToggleOption
                            active={showHeatmap} label="Heat" icon={Flame}
                            colorClass="bg-orange-600"
                            onClick={() => setShowHeatmap(!showHeatmap)}
                        />
                    </div>
                </div>
            </div>

            {/* Right: Details Sheet (New Component) */}
            <LocationDetailsSheet
                location={selectedLocation}
                open={!!selectedLocation}
                onOpenChange={() => setSelectedLocation(null)}
            />

            {/* Map Component */}
            {/*<MapComponent*/}
            {/*    searchResults={searchResults}*/}
            {/*    showLayer1={layers.history}*/}
            {/*    showLayer2={layers.pins}*/}
            {/*    showLayer3={layers.heatmap}*/}
            {/*    opacity={opacity[0] / 100}*/}
            {/*    activeLocation={activeLocation}*/}
            {/*    onMarkerClick={handleMarkerClick}*/}
            {/*/>*/}
            {/* 5. 地图 (更新 Props) */}
            <MapComponent
                searchResults={filteredResults} // 传入过滤后的数据

                // 现在的 MapComponent 需要稍微改一下去支持 activeMapId
                // 或者在这里做映射：
                showLayer1={!!activeMapId}
                mapId={activeMapId} // 需要在 MapComponent 里处理不同的 mapId 对应的 url
                showLayer2={showPins}
                showLayer3={showHeatmap}
                opacity={opacity}
                activeLocation={activeLocation}
                onMarkerClick={(loc) => {
                    setActiveLocation(loc);
                    setSelectedLocation(loc);
                }}
            />

        </main>
    );
}