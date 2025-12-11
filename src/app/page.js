// // 'use client';
// //
// // import {useState} from 'react';
// // import dynamic from 'next/dynamic';
// // import {SearchControl} from '@/components/Map/SearchControl';
// // import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription} from "@/components/ui/sheet";
// // import {Slider} from "@/components/ui/slider";
// // import {ResultsSidebar} from "@/components/Map/ResultsSidebar";
// // import {LocationDetailsSheet} from "@/components/Map/LocationDetailsSheet";
// // import {MapIcon, Flame} from "lucide-react";
// //
// // // 动态导入地图组件
// // const MapComponent = dynamic(
// //     () => import('@/components/Map/DynamicMap'),
// //     {
// //         ssr: false,
// //         loading: () => (
// //             <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
// //                 <div className="text-slate-500 animate-pulse">Loading Map...</div>
// //             </div>
// //         )
// //     }
// // );
// //
// // const ToggleOption = ({active, label, icon: Icon, colorClass, onClick}) => (
// //     <button
// //         onClick={onClick}
// //         className={`flex flex-col items-center gap-1 transition-all duration-300 group ${active ? 'opacity-100 -translate-y-1' : 'opacity-50 hover:opacity-80'}`}
// //     >
// //         <div
// //             className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-sm transition-all ${active ? `${colorClass} border-transparent text-white` : 'bg-paper border-ink/20 text-ink'}`}>
// //             <Icon size={18}/>
// //         </div>
// //         <span className="text-[9px] font-bold uppercase tracking-widest text-ink/60 group-hover:text-ink">{label}</span>
// //     </button>
// // );
// //
// // export default function Home() {
// //     const [searchResults, setSearchResults] = useState([]);
// //     const [isLoading, setIsLoading] = useState(false);
// //     const [selectedLocation, setSelectedLocation] = useState(null);
// //
// //     // 交互状态
// //     const [activeLocation, setActiveLocation] = useState(null); // 用于控制地图缩放/高亮
// //
// //     // 图层和透明度状态
// //     const [layers, setLayers] = useState({
// //         history: false,
// //         pins: true,
// //         heatmap: false
// //     });
// //     const [opacity, setOpacity] = useState([70]);
// //
// //     // 🔍 核心修改：对接真实后端 API
// //     // 🔍 修改 handleSearch 为 POST 请求
// //     const handleSearch = async (query) => {
// //         setIsLoading(true);
// //
// //         try {
// //             // 1. 接口地址 (注意：现在不需要在 URL 后面拼 ?query=xxx 了)
// //             const apiUrl = "http://localhost:8000/api/v1/search/text";
// //
// //             // 2. 发起 POST 请求
// //             const response = await fetch(apiUrl, {
// //                 method: "POST", // 🔥 指定为 POST
// //                 headers: {
// //                     "Content-Type": "application/json", // 🔥 告诉后端发送的是 JSON 数据
// //                 },
// //                 body: JSON.stringify({
// //                     query: query
// //
// //                 }),
// //             });
// //
// //             if (!response.ok) {
// //                 throw new Error(`HTTP error! status: ${response.status}`);
// //             }
// //
// //             // 4. 解析结果 (逻辑保持不变)
// //             const result = await response.json();
// //
// //             if (result.status === 'success' && Array.isArray(result.data)) {
// //                 const adaptedResults = result.data.map((item) => ({
// //                     id: item.id,
// //                     lat: item.lat,
// //                     lon: item.lng, // 后端是 lng，前端组件用 lon
// //                     score: item.score,
// //                     content: `Location (ID: ${item.id.slice(0, 8)}...)`,
// //                     fullData: item,
// //                     pixel_coords: item.pixel_coords
// //                 }));
// //                 setSearchResults(adaptedResults);
// //             } else {
// //                 setSearchResults([]);
// //             }
// //
// //         } catch (error) {
// //             console.error("Search failed:", error);
// //             // alert("Search failed"); // 可选：出错弹窗
// //             setSearchResults([]);
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     };
// //
// //     // 当在侧边栏点击某一项时
// //     const handleResultClick = (location) => {
// //         setActiveLocation(location);   // 1. 地图飞过去 (MapController)
// //         setSelectedLocation(location); // 2. 打开右侧详情 (Sheet)
// //     };
// //
// //     // 当在地图上点击 Marker 时
// //     const handleMarkerClick = (location) => {
// //         setActiveLocation(location);   // 1. 更新当前激活状态 (让侧边栏高亮)
// //         setSelectedLocation(location); // 2. 打开右侧详情
// //     };
// //
// //     return (
// //         <main className="relative w-screen h-screen overflow-hidden bg-slate-50">
// //
// //             {/* 搜索栏 */}
// //             <SearchControl onSearch={handleSearch} isLoading={isLoading}/>
// //
// //             {/* 左侧：结果列表侧边栏 (新增) */}
// //             <ResultsSidebar
// //                 results={searchResults}
// //                 onSelect={handleResultClick}
// //                 activeId={activeLocation?.id} // 传入 activeId 用于高亮列表项
// //             />
// //
// //             {/* Bottom Center: Control Panel (Redesigned as a Dock) */}
// //             <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-[1000]">
// //                 {/* 修复点：将 bg-parchment/90 改为 bg-paper (实心) */}
// //                 {/* 增加 shadow-2xl，看起来悬浮感更强 */}
// //                 <div
// //                     className="bg-paper px-8 py-4 rounded-full shadow-2xl border border-ink/10 flex items-center gap-8 transition-all hover:scale-[1.01]">
// //
// //                     {/* Opacity Slider */}
// //                     <div className="flex flex-col gap-2 w-32">
// //                         <div
// //                             className="flex justify-between text-[10px] uppercase tracking-widest text-ink/60 font-bold">
// //                             <span>Overlay</span>
// //                             <span>{opacity}%</span>
// //                         </div>
// //                         <Slider
// //                             defaultValue={[70]}
// //                             max={100}
// //                             step={1}
// //                             value={opacity}
// //                             onValueChange={setOpacity}
// //                             className="cursor-pointer"
// //                         />
// //                     </div>
// //
// //                     <div className="h-8 w-px bg-ink/10"></div>
// //
// //                     {/* Layer Toggles */}
// //                     <div className="flex gap-6">
// //                         <ToggleOption
// //                             active={layers.history}
// //                             label="Map"
// //                             icon={MapIcon}
// //                             colorClass="bg-ink"
// //                             onClick={() => setLayers(p => ({...p, history: !p.history}))}
// //                         />
// //                         <ToggleOption
// //                             active={layers.pins}
// //                             label="Pins"
// //                             icon={MapIcon}
// //                             colorClass="bg-wax-red"
// //                             onClick={() => setLayers(p => ({...p, pins: !p.pins}))}
// //                         />
// //                         <ToggleOption
// //                             active={layers.heatmap}
// //                             label="Heat"
// //                             icon={Flame}
// //                             colorClass="bg-orange-600"
// //                             onClick={() => setLayers(p => ({...p, heatmap: !p.heatmap}))}
// //                         />
// //                     </div>
// //                 </div>
// //             </div>
// //             {/* Right: Details Sheet (New Component) */}
// //             <LocationDetailsSheet
// //                 location={selectedLocation}
// //                 open={!!selectedLocation}
// //                 onOpenChange={() => setSelectedLocation(null)}
// //             />
// //
// //             {/* Map Component */}
// //             <MapComponent
// //                 searchResults={searchResults}
// //                 showLayer1={layers.history}
// //                 showLayer2={layers.pins}
// //                 showLayer3={layers.heatmap}
// //                 opacity={opacity[0] / 100}
// //                 activeLocation={activeLocation}
// //                 onMarkerClick={handleMarkerClick}
// //             />
// //
// //         </main>
// //     );
// // }
//
// 'use client';
//
// import {useState, useMemo, useEffect} from 'react';
// import dynamic from 'next/dynamic';
// import {SearchControl} from '@/components/Map/SearchControl';
// import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription} from "@/components/ui/sheet";
// import {Slider} from "@/components/ui/slider";
// import {ResultsSidebar} from "@/components/Map/ResultsSidebar";
// import {LocationDetailsSheet} from "@/components/Map/LocationDetailsSheet";
// import {MapIcon, Flame, LocateFixed} from "lucide-react";
// import {Box} from "lucide-react"; // 引入一个盒子图标代表 3D
// import {TimelineControl} from '@/components/Map/TimelineControl'; // 新导入
// import {MapLayerSelector} from '@/components/Map/MapLayerSelector'; // 新导入
//
// const MapComponent = dynamic(() => import('@/components/Map/DynamicMap'), {
//     ssr: false,
//     loading: () => <div className="flex h-screen w-screen items-center justify-center bg-slate-50">Loading...</div>
// });
//
// // 动态导入地图组件
// // const MapComponent = dynamic(
// //     () => import('@/components/Map/DynamicMap'),
// //     {
// //         ssr: false,
// //         loading: () => (
// //             <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
// //                 <div className="text-slate-500 animate-pulse">Loading Map...</div>
// //             </div>
// //         )
// //     }
// // );
//
// // const ToggleOption = ({active, label, icon: Icon, colorClass, onClick}) => (
// //     <button
// //         onClick={onClick}
// //         className={`flex flex-col items-center gap-1 transition-all duration-300 group ${active ? 'opacity-100 -translate-y-1' : 'opacity-50 hover:opacity-80'}`}
// //     >
// //         <div
// //             className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-sm transition-all ${active ? `${colorClass} border-transparent text-white` : 'bg-atlas-paper border-border text-deep-ocean'}`}>
// //             <Icon size={18}/>
// //         </div>
// //         <span
// //             className="text-[9px] font-bold uppercase tracking-widest text-faded-slate group-hover:text-deep-ocean">{label}</span>
// //     </button>
// // );
//
// // 优化后的 ToggleOption：更轻量，去掉了厚重的边框，使用统一的激活色
// const ToggleOption = ({active, label, icon: Icon, onClick}) => (
//     <button
//         onClick={onClick}
//         className={`
//             relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
//             ${active
//             ? 'bg-slate-900 text-white shadow-md scale-105' // 激活：深色背景，白色图标 (统一风格)
//             : 'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900' // 未激活：灰色
//         }
//         `}
//         title={label}
//     >
//         <Icon size={18} strokeWidth={active ? 2.5 : 2}/>
//
//         {/* 可选：激活时底部的小光点，增加精致感 */}
//         {active && (
//             <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-slate-900/50"></span>
//         )}
//     </button>
// );
//
// export default function Home() {
//     const [searchResults, setSearchResults] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//
//     const [show3DHeatmap, setShow3DHeatmap] = useState(false);
//     const [heatmapData, setHeatmapData] = useState([]);
//
//     // 图层和透明度状态
//     const [layers, setLayers] = useState({
//         history: false,
//         pins: true,
//         heatmap: false
//     });
//     const [opacity, setOpacity] = useState([70]);
//
//
//     const [rawSearchResults, setRawSearchResults] = useState([]); // 原始数据
//
//     // 状态
//     const [activeLocation, setActiveLocation] = useState(null);
//     const [selectedLocation, setSelectedLocation] = useState(null);
//     const [yearRange, setYearRange] = useState([1000, 2024]); // 时间轴范围
//
//     // 图层状态
//     const [activeMapId, setActiveMapId] = useState(null); // 改为存 ID，null 表示不显示
//     const [showPins, setShowPins] = useState(true);
//     const [showHeatmap, setShowHeatmap] = useState(false);
//     const [isMapSelectorOpen, setIsMapSelectorOpen] = useState(false);
//
//     // 获取 3D 数据 (假设你的后端接口已就绪)
//     useEffect(() => {
//         if (show3DHeatmap && heatmapData.length === 0) {
//             fetch("http://localhost:8000/api/v1/search/heatmap-data?limit=5000")
//                 .then(res => res.json())
//                 .then(json => setHeatmapData(json.data))
//                 .catch(err => console.error(err));
//         }
//     }, [show3DHeatmap]);
//
//
//     // --- 2. 搜索处理逻辑 ---
//     const handleSearch = async (content, type = 'text') => {
//         setIsLoading(true);
//         // 关闭 3D 视图以便查看搜索结果
//         if (show3DHeatmap) setShow3DHeatmap(false);
//
//         try {
//             let response;
//             const baseUrl = "http://localhost:8000/api/v1/search";
//
//             if (type === 'image') {
//                 const formData = new FormData();
//                 formData.append("file", content);
//                 response = await fetch(`${baseUrl}/image`, {
//                     method: "POST",
//                     body: formData,
//                 });
//             } else {
//                 response = await fetch(`${baseUrl}/text`, {
//                     method: "POST",
//                     headers: {"Content-Type": "application/json"},
//                     body: JSON.stringify({query: content}),
//                 });
//             }
//
//             if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//
//             const result = await response.json();
//
//             if (result.status === 'success' && Array.isArray(result.data)) {
//                 // 适配后端数据结构 -> 前端通用结构
//                 const adaptedResults = result.data.map((item) => ({
//                     id: item.id,
//                     lat: item.lat,
//                     lon: item.lng,
//                     score: item.score,
//                     // 优先使用后端返回的 content (文档摘要/地图标题)
//                     content: item.content || `Location ID: ${item.id.slice(0, 8)}`,
//                     fullData: item.fullData || {},
//                     pixel_coords: item.pixel_coords,
//                     type: item.type // 🔥 关键：透传 type 给前端组件
//                 }));
//                 setRawSearchResults(adaptedResults);
//
//                 // 搜索后自动缩放到第一个结果 (可选)
//                 if (adaptedResults.length > 0) {
//                     setActiveLocation(adaptedResults[0]);
//                 }
//             } else {
//                 setRawSearchResults([]);
//             }
//
//         } catch (error) {
//             console.error("Search failed:", error);
//             setRawSearchResults([]);
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     // 1. 过滤逻辑 (确保这部分逻辑是正确的)
//     const filteredResults = useMemo(() => {
//         return rawSearchResults.filter(item => {
//             // 获取年份
//             const itemYear = item.fullData?.year || item.year;
//
//             // 策略：无年份数据始终保留 (return true)，或根据需求过滤
//             if (!itemYear) return true;
//
//             const y = parseInt(itemYear);
//             if (isNaN(y)) return true;
//
//             return y >= yearRange[0] && y <= yearRange[1];
//         });
//     }, [rawSearchResults, yearRange]); // 依赖 yearRange，滑块一动这里就会变
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
//         <main className="relative w-screen h-screen overflow-hidden bg-background"> {/* 使用新的 bg-background */}
//
//             {/* 搜索栏 */}
//             <SearchControl onSearch={handleSearch} isLoading={isLoading}/>
//
//             {/* 2. 左侧列表 (使用过滤后的数据) */}
//             <ResultsSidebar
//                 results={filteredResults}
//                 onSelect={(loc) => {
//                     setActiveLocation(loc);
//                     setSelectedLocation(loc);
//                 }}
//                 activeId={activeLocation?.id}
//             />
//
//             {/* 3. 底部宽幅 Dock (新设计) */}
//             {/*<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[1000] w-[95%] max-w-5xl">*/}
//             {/*    <div*/}
//             {/*        className="bg-ceramic/95 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-2xl border border-border/60 flex items-center justify-between gap-6 h-20 transition-all hover:bg-ceramic">*/}
//
//             {/*        /!* 左侧：时间轴控制器 *!/*/}
//             {/*        <div className="flex-1 h-full border-r border-border/50 pr-6 mr-2">*/}
//             {/*            <TimelineControl*/}
//             {/*                data={rawSearchResults}*/}
//             {/*                onFilterChange={setYearRange}*/}
//             {/*            />*/}
//             {/*        </div>*/}
//
//             {/*        /!* 右侧：功能按钮组 *!/*/}
//             {/*        <div className="flex items-center gap-6 shrink-0 pb-1">*/}
//
//             {/*            /!* 地图图层选择 (带弹出框) *!/*/}
//             {/*            <MapLayerSelector*/}
//             {/*                activeMapId={activeMapId}*/}
//             {/*                opacity={opacity}*/}
//             {/*                onMapChange={setActiveMapId}*/}
//             {/*                onOpacityChange={setOpacity}*/}
//             {/*                isOpen={isMapSelectorOpen}*/}
//             {/*                onToggle={setIsMapSelectorOpen}*/}
//             {/*            />*/}
//
//             {/*            /!* Pins 开关 *!/*/}
//             {/*            <ToggleOption*/}
//             {/*                active={showPins} label="Pins" icon={LocateFixed}*/}
//             {/*                colorClass="bg-time-gold"*/}
//             {/*                onClick={() => setShowPins(!showPins)}*/}
//             {/*            />*/}
//
//             {/*            /!* Heatmap 开关 *!/*/}
//             {/*            <ToggleOption*/}
//             {/*                active={showHeatmap} label="Heat" icon={Flame}*/}
//             {/*                colorClass="bg-orange-600"*/}
//             {/*                onClick={() => setShowHeatmap(!showHeatmap)}*/}
//             {/*            />*/}
//
//             {/*            <ToggleOption*/}
//             {/*                active={show3DHeatmap}*/}
//             {/*                label="3D View"*/}
//             {/*                icon={Box}*/}
//             {/*                colorClass="bg-purple-600"*/}
//             {/*                onClick={() => setShow3DHeatmap(!show3DHeatmap)}*/}
//             {/*            />*/}
//             {/*        </div>*/}
//             {/*    </div>*/}
//             {/*</div>*/}
//             <div
//                 className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[1000] w-full flex justify-center pointer-events-none">
//                 {/* pointer-events-auto 确保只有 Dock 能接收点击，不阻挡地图操作 */}
//                 <div
//                     className="
//             pointer-events-auto
//             bg-white/80 backdrop-blur-xl           /* 玻璃拟态背景，高通透度 */
//             border border-white/40 shadow-xl shadow-slate-900/5 /* 细腻的阴影 */
//             rounded-full                           /* 全圆角，像胶囊 */
//             px-5 py-2                              /* 减小内边距 */
//             h-16                                   /* 高度优化：64px (原 h-20) */
//             w-[90%] max-w-3xl                      /* 宽度优化：限制最大宽，防止时间轴太长 */
//             flex items-center justify-between gap-4
//             transition-all duration-300 hover:bg-white/95
//         ">
//
//                     {/* 左侧：时间轴控制器 */}
//                     {/* 使用 mask-image 做一个渐变遮罩，防止时间轴太长时边缘生硬 */}
//                     <div
//                         className="flex-1 h-full min-w-0 pr-4 mr-2 border-r border-slate-200/60 flex flex-col justify-center">
//                         {/* 提示：TimelineControl 内部可能需要调整一下 padding-top/bottom
//                 以适应变矮的 h-16 高度。建议在 TimelineControl 内部把 Slider 的 py 改小。
//              */}
//                         <TimelineControl
//                             data={rawSearchResults}
//                             onFilterChange={setYearRange}
//                         />
//                     </div>
//
//                     {/* 右侧：功能按钮组 */}
//                     {/* 紧凑排列，去掉了文字标签，只留 Icon，依靠 Tooltip */}
//                     <div className="flex items-center gap-2 shrink-0">
//
//                         {/* 地图图层选择 */}
//                         <MapLayerSelector
//                             activeMapId={activeMapId}
//                             opacity={opacity}
//                             onMapChange={setActiveMapId}
//                             onOpacityChange={setOpacity}
//                             isOpen={isMapSelectorOpen}
//                             onToggle={setIsMapSelectorOpen}
//                             // 记得把 MapLayerSelector 的触发按钮也改成类似的 ToggleOption 样式
//                             className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
//                         />
//
//                         {/* Pins 开关 */}
//                         <ToggleOption
//                             active={showPins}
//                             label="Pins"
//                             icon={LocateFixed}
//                             onClick={() => setShowPins(!showPins)}
//                         />
//
//                         {/* Heatmap 开关 */}
//                         <ToggleOption
//                             active={showHeatmap}
//                             label="Heat"
//                             icon={Flame}
//                             onClick={() => setShowHeatmap(!showHeatmap)}
//                         />
//
//                         {/* 3D View 开关 */}
//                         <ToggleOption
//                             active={show3DHeatmap}
//                             label="3D View"
//                             icon={Box}
//                             onClick={() => setShow3DHeatmap(!show3DHeatmap)}
//                         />
//                     </div>
//                 </div>
//             </div>
//
//             {/* Right: Details Sheet (New Component) */}
//             <LocationDetailsSheet
//                 location={selectedLocation}
//                 open={!!selectedLocation}
//                 onOpenChange={() => setSelectedLocation(null)}
//             />
//
//             {/* Map Component */}
//             {/*<MapComponent*/}
//             {/*    searchResults={searchResults}*/}
//             {/*    showLayer1={layers.history}*/}
//             {/*    showLayer2={layers.pins}*/}
//             {/*    showLayer3={layers.heatmap}*/}
//             {/*    opacity={opacity[0] / 100}*/}
//             {/*    activeLocation={activeLocation}*/}
//             {/*    onMarkerClick={handleMarkerClick}*/}
//             {/*/>*/}
//             {/* 5. 地图 (更新 Props) */}
//             <MapComponent
//                 searchResults={filteredResults} // 传入过滤后的数据
//
//                 // 现在的 MapComponent 需要稍微改一下去支持 activeMapId
//                 // 或者在这里做映射：
//                 showLayer1={!!activeMapId}
//                 mapId={activeMapId} // 需要在 MapComponent 里处理不同的 mapId 对应的 url
//                 showLayer2={showPins}
//                 showLayer3={showHeatmap}
//                 opacity={opacity}
//                 activeLocation={activeLocation}
//                 onMarkerClick={(loc) => {
//                     setActiveLocation(loc);
//                     setSelectedLocation(loc);
//                 }}
//                 show3DHeatmap={show3DHeatmap}
//                 heatmapData={heatmapData}
//             />
//
//         </main>
//     );
// }

'use client';

import {useState, useMemo, useEffect} from 'react';
import dynamic from 'next/dynamic';
import {SearchControl} from '@/components/Map/SearchControl';
import {ResultsSidebar} from "@/components/Map/ResultsSidebar";
import {LocationDetailsSheet} from "@/components/Map/LocationDetailsSheet";
import {TimelineControl} from '@/components/Map/TimelineControl';
import {MapLayerSelector} from '@/components/Map/MapLayerSelector';
import {Flame, LocateFixed, Box} from "lucide-react";

// 动态导入地图组件，禁用 SSR
const MapComponent = dynamic(() => import('@/components/Map/DynamicMap'), {
    ssr: false,
    loading: () => (
        <div
            className="flex h-screen w-screen items-center justify-center bg-[#f0f0f0] text-slate-400 font-mono text-sm">
            Initializing WebGL...
        </div>
    )
});

// 胶囊按钮组件
const ToggleOption = ({active, label, icon: Icon, onClick}) => (
    <button
        onClick={onClick}
        className={`
            relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
            ${active
            ? 'bg-slate-900 text-white shadow-md scale-105'
            : 'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900'
        }
        `}
        title={label}
    >
        <Icon size={18} strokeWidth={active ? 2.5 : 2}/>
        {active && (
            <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-slate-900/50"></span>
        )}
    </button>
);

export default function Home() {
    // --- 1. 核心数据状态 ---
    const [rawSearchResults, setRawSearchResults] = useState([]); // 2D 列表用的详细数据 (Top 50)
    const [heatmapData, setHeatmapData] = useState([]);           // 3D 视图用的轻量数据 (Top 2000+)
    const [isLoading, setIsLoading] = useState(false);
    const [lastQuery, setLastQuery] = useState("");               // 记录最后一次搜索词

    // --- 2. 交互状态 ---
    const [activeLocation, setActiveLocation] = useState(null);   // 当前选中的点
    const [selectedLocation, setSelectedLocation] = useState(null); // 详情页展示的点

    // --- 3. 过滤器与图层状态 ---
    const [yearRange, setYearRange] = useState([1000, 2024]);
    const [activeMapId, setActiveMapId] = useState(null); // 底图 ID
    const [opacity, setOpacity] = useState([70]);         // 底图透明度

    // 开关状态
    const [showPins, setShowPins] = useState(true);
    const [showHeatmap, setShowHeatmap] = useState(false);   // 2D 热力图 (可选)
    const [show3DHeatmap, setShow3DHeatmap] = useState(false); // 🔥 3D 视图开关
    const [isMapSelectorOpen, setIsMapSelectorOpen] = useState(false);


    // --- 4. 🔥 核心：获取 3D 热力图数据 ---
    useEffect(() => {
        // 只有当 3D 开启，且数据为空或者搜索词变了的时候才重新拉取
        // 这里做一个简单的优化：每次开启 3D 都重新拉取一次以保证数据最新 (因为后端接口很快)
        if (show3DHeatmap) {
            const fetchHeatmap = async () => {
                try {
                    // 如果有搜索词，就基于搜索词生成热力图；否则生成全量热力图
                    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
                    let url = `${baseUrl}/search/heatmap-data?limit=3000`; // 获取 3000 个点

                    if (lastQuery) {
                        url += `&query=${encodeURIComponent(lastQuery)}`;
                    }

                    console.log("Fetching 3D data from:", url);
                    const res = await fetch(url);
                    const json = await res.json();

                    if (json.status === 'success') {
                        setHeatmapData(json.data);
                    }
                } catch (err) {
                    console.error("Failed to fetch heatmap data:", err);
                }
            };

            fetchHeatmap();
        }
    }, [show3DHeatmap, lastQuery]); // 依赖：开关状态 + 搜索词


    // --- 5. 搜索处理逻辑 (2D 列表) ---
    const handleSearch = async (content, type = 'text') => {
        setIsLoading(true);
        // 💡 用户开始搜索时，建议暂时关闭 3D 视图，回到列表模式查看详情
        if (show3DHeatmap) setShow3DHeatmap(false);

        setActiveMapId(null);

        // 更新搜索词记录
        if (type === 'text') setLastQuery(content);

        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
            let response;

            if (type === 'image') {
                const formData = new FormData();
                formData.append("file", content);
                response = await fetch(`${baseUrl}/search/image`, {
                    method: "POST",
                    body: formData,
                });
            } else {
                response = await fetch(`${baseUrl}/search/text`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({query: content}),
                });
            }

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const result = await response.json();

            if (result.status === 'success' && Array.isArray(result.data)) {
                const adaptedResults = result.data.map((item) => ({
                    id: item.id,
                    year: item.year,
                    lat: item.lat,
                    lon: item.lng,
                    score: item.score,
                    content: item.content || `Location ID: ${item.id.slice(0, 8)}`,
                    fullData: item.fullData || {},
                    pixel_coords: item.pixel_coords,
                    type: item.type,
                    source_dataset: item.source_dataset,
                    image_source: item.image_source
                }));
                setRawSearchResults(adaptedResults);

                // 自动选中第一个结果
                if (adaptedResults.length > 0) {
                    setActiveLocation(adaptedResults[0]);
                }
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

    // --- 6. 前端时间轴过滤 ---
    const filteredResults = useMemo(() => {
        return rawSearchResults.filter(item => {
            const itemYear = item.fullData?.year || item.year;
            if (!itemYear) return true; // 保留无年份数据
            const y = parseInt(itemYear);
            if (isNaN(y)) return true;
            return y >= yearRange[0] && y <= yearRange[1];
        });
    }, [rawSearchResults, yearRange]);

    return (
        <main className="relative w-screen h-screen overflow-hidden bg-[#f0f0f0]">

            {/* A. 顶部搜索栏 */}
            <SearchControl onSearch={handleSearch} isLoading={isLoading}/>

            {/* B. 左侧结果列表 */}
            <ResultsSidebar
                results={filteredResults}
                onSelect={(loc) => {
                    setActiveLocation(loc);
                    setSelectedLocation(loc);
                }}
                activeId={activeLocation?.id}
                yearRange={yearRange} // 传入 range 以便侧边栏显示状态
            />

            {/* C. 底部控制坞 (Dock) */}
            <div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[1000] w-full flex justify-center pointer-events-none">
                <div className="
                    pointer-events-auto
                    bg-white/80 backdrop-blur-xl
                    border border-white/40 shadow-xl shadow-slate-900/5
                    rounded-full
                    px-5 py-2
                    h-16
                    w-[90%] max-w-3xl
                    flex items-center justify-between gap-4
                    transition-all duration-300 hover:bg-white/95
                ">
                    {/* 左侧：时间轴 (Timeline) */}
                    <div
                        className="flex-1 h-full min-w-0 pr-4 mr-2 border-r border-slate-200/60 flex flex-col justify-center">
                        <TimelineControl
                            data={rawSearchResults}
                            onFilterChange={setYearRange}
                        />
                    </div>

                    {/* 右侧：功能按钮组 */}
                    <div className="flex items-center gap-2 shrink-0">
                        {/* 1. 地图图层 */}
                        <MapLayerSelector
                            activeMapId={activeMapId}
                            opacity={opacity}
                            onMapChange={setActiveMapId}
                            onOpacityChange={setOpacity}
                            isOpen={isMapSelectorOpen}
                            onToggle={setIsMapSelectorOpen}
                            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
                        />

                        {/* 2. Pins 开关 */}
                        <ToggleOption
                            active={showPins}
                            label="Pins"
                            icon={LocateFixed}
                            onClick={() => setShowPins(!showPins)}
                        />


                        {/* 4. 3D View 开关 (核心) */}
                        <ToggleOption
                            active={show3DHeatmap}
                            label="3D View"
                            icon={Box}
                            onClick={() => setShow3DHeatmap(!show3DHeatmap)}
                        />
                    </div>
                </div>
            </div>

            {/* D. 右侧详情面板 */}
            <LocationDetailsSheet
                location={selectedLocation}
                open={!!selectedLocation}
                onOpenChange={() => setSelectedLocation(null)}
                onShowLayer={(mapId) => {
                    setActiveMapId(mapId); // 激活图层
                    // 如果需要，这里还可以顺便设置透明度
                    // setOpacity([80]);
                }}
            />

            {/* E. 地图主组件 */}
            <MapComponent
                // 2D 数据
                searchResults={filteredResults}
                activeLocation={activeLocation}
                onMarkerClick={(loc) => {
                    setActiveLocation(loc);
                    setSelectedLocation(loc);
                }}

                // 图层控制
                mapId={activeMapId}
                showLayer1={!!activeMapId}
                showLayer2={showPins}
                opacity={opacity[0]} // 传入数字 (0-100)

                // 3D 数据
                show3DHeatmap={show3DHeatmap}
                heatmapData={heatmapData}
            />

        </main>
    );
}