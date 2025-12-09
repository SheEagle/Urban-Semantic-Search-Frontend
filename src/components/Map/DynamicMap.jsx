// 'use client';
//
// import {useState, useEffect} from 'react';
// import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
// import L from 'leaflet';
// import HeatmapLayer from './HeatmapLayer';
// import 'leaflet/dist/leaflet.css';
//
// // 自定义 Marker 图标
// const customMarkerIcon = new L.Icon({
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41]
// });
//
// // 动画控制器
// const MapController = ({activeLocation}) => {
//     const map = useMap();
//     useEffect(() => {
//         if (activeLocation) {
//             map.flyTo(
//                 [activeLocation.lat, activeLocation.lon],
//                 16,
//                 {duration: 1.5, easeLinearity: 0.25}
//             );
//         }
//     }, [activeLocation, map]);
//     return null;
// };
//
// const DynamicMap = ({
//                         searchResults, showLayer1, showLayer2, showLayer3,
//                         opacity = 0.7, activeLocation, onMarkerClick
//                     }) => {
//     const [isMounted, setIsMounted] = useState(false);
//
//     useEffect(() => {
//         setIsMounted(true);
//     }, []);
//
//     if (!isMounted) {
//         return <div
//             className="h-screen w-screen bg-parchment flex items-center justify-center text-ink font-serif">Unfolding
//             Map...</div>;
//     }
//
//     const veniceCenter = [45.4371908, 12.3345898];
//     const fullMapUrl = "/maps/raw/sample_venice_map_3.jpg";
//
//     return (
//         <MapContainer
//             center={veniceCenter}
//             zoom={14}
//             scrollWheelZoom={true}
//             style={{height: '100vh', width: '100vw', background: '#f0f0f0'}}
//             className="z-0"
//         >
//             {/* 底图：使用 CartoDB Positron，因为它的颜色比较淡，容易和历史地图叠加 */}
//             {/*<TileLayer*/}
//             {/*    // attribution='&copy; <a href="https://carto.com/">CARTO</a>'*/}
//             {/*    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"*/}
//             {/*/>*/}
//             <TileLayer
//                 url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
//                 className="vintage-map-tiles"
//             />
//
//             {/*<TileLayer*/}
//             {/*    url={L.tileLayer.provider('Stadia.StamenWatercolor').getTileUrl("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png")}*/}
//             {/*/>*/}
//
//             {/* 历史图层 */}
//             {showLayer1 && (
//                 <TileLayer
//                     url="/maps/venice/{z}/{x}/{y}.png"
//                     minZoom={12}
//                     maxZoom={16}
//                     tms={false}
//                     opacity={opacity}
//                 />
//             )}
//
//             {/* Marker 图层 */}
//             {showLayer2 && searchResults.map((result) => (
//                 <Marker
//                     key={result.id}
//                     position={[result.lat, result.lon]}
//                     icon={customMarkerIcon}
//                     eventHandlers={{
//                         click: () => onMarkerClick && onMarkerClick(result),
//                     }}
//                 >
//                     <Popup minWidth={220} maxWidth={300} className="parchment-popup">
//                         <div className="flex flex-col gap-3 p-1 font-serif text-ink">
//                             {/* 标题 */}
//                             <div>
//                                 <h3 className="font-bold text-base leading-tight mb-1">{result.fullData?.image_source || "Location"}</h3>
//                                 <div
//                                     className="flex justify-between items-center text-xs text-ink/60 border-t border-ink/10 pt-1 mt-1">
//                                     <span>Score: <span
//                                         className="font-bold text-wax-red">{result.score.toFixed(2)}</span></span>
//                                     <span className="font-mono">ID: {result.id.substring(0, 4)}</span>
//                                 </div>
//                             </div>
//
//                             {/* 图片切片 */}
//                             {result.pixel_coords && (
//                                 <div className="space-y-1">
//                                     <div
//                                         className="relative group rounded-sm overflow-hidden border border-ink/20 shadow-sm bg-paper">
//                                         <div
//                                             className="transition-transform duration-500 group-hover:scale-105 filter sepia-[0.3]"
//                                             style={{
//                                                 width: '100%',
//                                                 height: '140px',
//                                                 backgroundRepeat: 'no-repeat',
//                                                 backgroundImage: `url(${fullMapUrl})`,
//                                                 backgroundPosition: `-${result.pixel_coords[0]}px -${result.pixel_coords[1]}px`,
//                                             }}
//                                         />
//                                         <div
//                                             className="absolute bottom-0 inset-x-0 bg-ink/80 text-paper text-[9px] py-1 opacity-0 group-hover:opacity-100 transition-opacity text-center font-mono">
//                                             PX: {result.pixel_coords.join(',')}
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//
//                             {/* 坐标 */}
//                             <div className="text-[9px] text-ink-faded font-mono text-right">
//                                 {result.lat.toFixed(5)}, {result.lon.toFixed(5)}
//                             </div>
//                         </div>
//                     </Popup>
//                 </Marker>
//             ))}
//
//             {showLayer3 && <HeatmapLayer points={searchResults}/>}
//             <MapController activeLocation={activeLocation}/>
//         </MapContainer>
//     );
// };
//
// export default DynamicMap;

// 'use client';
//
// import {useState, useEffect} from 'react';
// import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
// import L from 'leaflet';
// import HeatmapLayer from './HeatmapLayer';
// import 'leaflet/dist/leaflet.css';
//
// // 自定义 Marker 图标
// const customMarkerIcon = new L.Icon({
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41]
// });
//
// // 动画控制器
// const MapController = ({activeLocation}) => {
//     const map = useMap();
//     useEffect(() => {
//         if (activeLocation) {
//             map.flyTo(
//                 [activeLocation.lat, activeLocation.lon],
//                 16,
//                 {duration: 1.5, easeLinearity: 0.25}
//             );
//         }
//     }, [activeLocation, map]);
//     return null;
// };
//
// const DynamicMap = ({
//                         searchResults, showLayer1, showLayer2, showLayer3,
//                         opacity = 0.7, activeLocation, onMarkerClick
//                     }) => {
//     const [isMounted, setIsMounted] = useState(false);
//
//     useEffect(() => {
//         setIsMounted(true);
//     }, []);
//
//     if (!isMounted) {
//         // 更新加载屏幕样式
//         return <div
//             className="h-screen w-screen bg-background flex items-center justify-center text-deep-ocean font-serif">Unfolding
//             Map...</div>;
//     }
//
//     const veniceCenter = [45.4371908, 12.3345898];
//     const fullMapUrl = "/maps/raw/sample_venice_map_3.jpg";
//
//     return (
//         <MapContainer
//             center={veniceCenter}
//             zoom={14}
//             scrollWheelZoom={true}
//             style={{height: '100vh', width: '100vw', background: '#f0f0f0'}}
//             className="z-0"
//         >
//             {/* 底图：使用新的滤镜类名 */}
//             <TileLayer
//                 url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
//                 className="vintage-map-tiles"
//             />
//
//             {/* 历史图层 */}
//             {showLayer1 && (
//                 <TileLayer
//                     url="/maps/historical_1/{z}/{x}/{y}.png"
//                     minZoom={12}
//                     maxZoom={16}
//                     tms={false}
//                     opacity={opacity}
//                 />
//             )}
//
//             {/* Marker 图层 */}
//             {showLayer2 && searchResults.map((result) => (
//                 <Marker
//                     key={result.id}
//                     position={[result.lat, result.lon]}
//                     icon={customMarkerIcon}
//                     eventHandlers={{
//                         click: () => onMarkerClick && onMarkerClick(result),
//                     }}
//                 >
//                     {/* 移除原有的 parchment-popup 类名，依赖 globals.css 中对 Leaflet 弹窗的全局美化 */}
//                     <Popup minWidth={220} maxWidth={300}>
//                         {/* 更新弹窗内容颜色类名 */}
//                         <div className="flex flex-col gap-3 p-1 font-serif text-deep-ocean">
//                             {/* 标题 */}
//                             <div>
//                                 <h3 className="font-bold text-base leading-tight mb-1">{result.fullData?.image_source || "Location"}</h3>
//                                 <div
//                                     className="flex justify-between items-center text-xs text-faded-slate border-t border-border pt-1 mt-1">
//                                     <span>Score: <span
//                                         className="font-bold text-time-gold">{result.score.toFixed(2)}</span></span>
//                                     <span className="font-mono">ID: {result.id.substring(0, 4)}</span>
//                                 </div>
//                             </div>
//
//                             {/* 图片切片 */}
//                             {result.pixel_coords && (
//                                 <div className="space-y-1">
//                                     <div
//                                         className="relative group rounded-sm overflow-hidden border border-border shadow-sm bg-atlas-paper">
//                                         <div
//                                             className="transition-transform duration-500 group-hover:scale-105 filter sepia-[0.1]"
//                                             style={{
//                                                 width: '100%',
//                                                 height: '140px',
//                                                 backgroundRepeat: 'no-repeat',
//                                                 backgroundImage: `url(${fullMapUrl})`,
//                                                 backgroundPosition: `-${result.pixel_coords[0]}px -${result.pixel_coords[1]}px`,
//                                             }}
//                                         />
//                                         <div
//                                             className="absolute bottom-0 inset-x-0 bg-deep-ocean/80 text-atlas-paper text-[9px] py-1 opacity-0 group-hover:opacity-100 transition-opacity text-center font-mono">
//                                             PX: {result.pixel_coords.join(',')}
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//
//                             {/* 坐标 */}
//                             <div className="text-[9px] text-faded-slate font-mono text-right">
//                                 {result.lat.toFixed(5)}, {result.lon.toFixed(5)}
//                             </div>
//                         </div>
//                     </Popup>
//                 </Marker>
//             ))}
//
//             {showLayer3 && <HeatmapLayer points={searchResults}/>}
//             <MapController activeLocation={activeLocation}/>
//         </MapContainer>
//     );
// };
//
// export default DynamicMap;

'use client';

import {useState, useEffect} from 'react';
import L from 'leaflet';
import HeatmapLayer from './HeatmapLayer';
import 'leaflet/dist/leaflet.css';

// ✨ 新增：博物馆风格的自定义图标生成器
// 使用 L.divIcon 允许我们要 HTML/CSS 绘制图标，从而完美匹配 Deep Ocean / Time Gold 配色
// const createMuseumIcon = () => {
//     return L.divIcon({
//         className: 'bg-transparent', // 移除 Leaflet 默认的白色方块背景
//         html: `
//             <div class="relative flex flex-col items-center justify-center w-full h-full group hover:-translate-y-1 transition-transform duration-300">
//                 <div class="absolute bottom-0 w-3 h-1 bg-black/30 blur-[1px] rounded-[50%]"></div>
//
//                 <div class="relative w-7 h-7 rounded-full bg-[var(--deep-ocean)] border-2 border-[var(--time-gold)] shadow-lg flex items-center justify-center z-10">
//                     <div class="w-1.5 h-1.5 rounded-full bg-[var(--time-gold)]"></div>
//                 </div>
//
//                 <div class="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-[var(--deep-ocean)] -mt-[1px] z-0"></div>
//             </div>
//         `,
//         iconSize: [30, 42],   // 图标总大小
//         iconAnchor: [15, 40], // 锚点：让针尖对准坐标 (宽的一半, 高的高度)
//         popupAnchor: [0, -40] // 弹窗位置：在图标上方
//     });
// };

// ✨ 替换原来的 createMuseumIcon 函数
// ✨ 优化版：更小巧、更有质感的珐琅图标
// ✨ 最终修正版：提亮宝石色，确保肉眼能看出是蓝色
// ✨ 高亮版：皇家蓝宝石风格，保证肉眼看是明亮的蓝色
// ✨ 最终定稿版："深海浮标" 风格 (Deep Sea & White)
// 抛弃橙色，改用白色边框；蓝色降调，改为沉稳的钢青色。
// const createMuseumIcon = () => {
//     const pinPath = "M15 0C6.71573 0 0 6.71573 0 15C0 25.5 15 40 15 40C15 40 30 25.5 30 15C30 6.71573 23.2843 0 15 0Z";
//     const gradientId = "deepSeaGradient";
//
//     return L.divIcon({
//         className: 'bg-transparent',
//         html: `
//             <div class="relative w-full h-full group hover:-translate-y-1 transition-transform duration-500 ease-out cursor-pointer">
//
//                 <svg width="24" height="34" viewBox="0 0 30 42" class="absolute top-0.5 left-0 opacity-20 blur-[1.5px]">
//                     <path d="${pinPath}" fill="black" />
//                 </svg>
//
//                 <svg width="24" height="34" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="relative z-10 drop-shadow-md">
//
//                     <defs>
//                         <linearGradient id="${gradientId}" x1="15" y1="0" x2="15" y2="40" gradientUnits="userSpaceOnUse">
//                             <stop offset="0%" stop-color="#5B7C99" />
//                             <stop offset="100%" stop-color="#2A4359" />
//                         </linearGradient>
//                     </defs>
//
//                     <path d="${pinPath}" fill="url(#${gradientId})" stroke="white" stroke-width="2"/>
//
//                     <circle cx="15" cy="15" r="7" stroke="white" stroke-opacity="0.3" stroke-width="1"/>
//
//                     <circle cx="15" cy="15" r="3" fill="white"/>
//
//                 </svg>
//             </div>
//         `,
//         iconSize: [24, 34],
//         iconAnchor: [12, 34],
//         popupAnchor: [0, -36]
//     });
// };
// // const createMuseumIcon = () => {
// //     // 定义 SVG 路径：这是一个完美的水滴形/定位针形状
// //     const pinPath = "M15 0C6.71573 0 0 6.71573 0 15C0 25.5 15 40 15 40C15 40 30 25.5 30 15C30 6.71573 23.2843 0 15 0Z";
// //
// //     return L.divIcon({
// //         className: 'bg-transparent', // 清除默认背景
// //         html: `
// //             <div class="relative w-full h-full group hover:-translate-y-2 transition-transform duration-500 ease-out cursor-pointer">
// //                 <svg width="30" height="42" viewBox="0 0 30 42" class="absolute top-1 left-0 opacity-40 blur-[2px] transition-opacity group-hover:opacity-20">
// //                     <path d="${pinPath}" fill="black" />
// //                 </svg>
// //
// //                 <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="relative z-10 drop-shadow-md">
// //                     <path d="${pinPath}" fill="var(--deep-ocean)" stroke="var(--time-gold)" stroke-width="1.5"/>
// //
// //                     <circle cx="15" cy="15" r="8" stroke="white" stroke-opacity="0.2" stroke-width="1"/>
// //                     <circle cx="15" cy="15" r="4" fill="var(--time-gold)"/>
// //                     <circle cx="16.5" cy="13.5" r="1.5" fill="white" fill-opacity="0.4"/>
// //                 </svg>
// //             </div>
// //         `,
// //         iconSize: [30, 42],    // 尺寸
// //         iconAnchor: [15, 42],  // 📍 锚点：X轴居中(15), Y轴最底部(42) - 针尖对准坐标
// //         popupAnchor: [0, -45]  // 💬 弹窗位置：在针尖上方 45px 处
// //     });
// // };
//
// // 动画控制器
// const MapController = ({activeLocation}) => {
//     const map = useMap();
//     useEffect(() => {
//         if (activeLocation) {
//             map.flyTo(
//                 [activeLocation.lat, activeLocation.lon],
//                 16,
//                 {duration: 1.5, easeLinearity: 0.25}
//             );
//         }
//     }, [activeLocation, map]);
//     return null;
// };
//
// const MAP_URLS = {
//     'venice_1846': '/maps/historical_1/{z}/{x}/{y}.png',
//     'venice_1900': '/maps/historical_2/{z}/{x}/{y}.png', // 假设你有第二套
//     // ...
// };
//
// const DynamicMap = ({
//                         searchResults,
//                         showLayer1, // 是否显示历史图层
//                         showLayer2, // 是否显示 Pins (修复报错的关键：必须解构出来)
//                         showLayer3, // 是否显示热力图
//                         opacity = 0.7,
//                         activeLocation,
//                         onMarkerClick,
//                         mapId // 当前选中的地图 ID
//                     }) => {
//     const [isMounted, setIsMounted] = useState(false);
//
//     useEffect(() => {
//         setIsMounted(true);
//     }, []);
//
//     if (!isMounted) {
//         return <div
//             className="h-screen w-screen bg-background flex items-center justify-center text-deep-ocean font-serif">Unfolding
//             Map...</div>;
//     }
//
//     const veniceCenter = [45.4371908, 12.3345898];
//     const fullMapUrl = "/maps/raw/sample_venice_map_3.jpg";
//
//     // 创建图标实例 (为了性能，可以在组件外或用 useMemo 创建，但在这里直接调用也无妨)
//     const museumIcon = createMuseumIcon();
//
//     const activeTileUrl = MAP_URLS[mapId] || '/maps/historical_1/{z}/{x}/{y}.png';
//
//     return (
//         <MapContainer
//             center={veniceCenter}
//             zoom={14}
//             scrollWheelZoom={true}
//             style={{height: '100vh', width: '100vw', background: '#f0f0f0'}}
//             className="z-0"
//         >
//             {/* 底图 */}
//             <TileLayer
//                 url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
//                 className="vintage-map-tiles"
//             />
//
//
//             {showLayer1 && mapId && (
//                 <TileLayer
//                     key={mapId} // 🔥 关键：加 Key 强制 React 在切换地图时重新渲染 Layer
//                     url={activeTileUrl}
//                     minZoom={12} maxZoom={16} tms={false}
//                     opacity={opacity}
//                 />
//             )}
//
//             {/* Marker 图层 */}
//             {showLayer2 && searchResults.map((result) => (
//                 <Marker
//                     key={result.id}
//                     position={[result.lat, result.lon]}
//                     icon={museumIcon} // ✨ 使用新的 CSS 图标
//                     eventHandlers={{
//                         click: () => onMarkerClick && onMarkerClick(result),
//                     }}
//                 >
//                     <Popup minWidth={220} maxWidth={300}>
//                         <div className="flex flex-col gap-3 p-1 font-serif text-deep-ocean">
//                             {/* 标题 */}
//                             <div>
//                                 <h3 className="font-bold text-base leading-tight mb-1">{result.fullData?.image_source || "Location"}</h3>
//                                 <div
//                                     className="flex justify-between items-center text-xs text-faded-slate border-t border-border pt-1 mt-1">
//                                     <span>Score: <span
//                                         className="font-bold text-time-gold">{result.score.toFixed(2)}</span></span>
//                                     <span className="font-mono">ID: {result.id.substring(0, 4)}</span>
//                                 </div>
//                             </div>
//
//                             {/* 图片切片 */}
//                             {result.pixel_coords && (
//                                 <div className="space-y-1">
//                                     <div
//                                         className="relative group rounded-sm overflow-hidden border border-border shadow-sm bg-atlas-paper">
//                                         <div
//                                             className="transition-transform duration-500 group-hover:scale-105 filter sepia-[0.1]"
//                                             style={{
//                                                 width: '100%',
//                                                 height: '140px',
//                                                 backgroundRepeat: 'no-repeat',
//                                                 backgroundImage: `url(${fullMapUrl})`,
//                                                 backgroundPosition: `-${result.pixel_coords[0]}px -${result.pixel_coords[1]}px`,
//                                             }}
//                                         />
//                                         <div
//                                             className="absolute bottom-0 inset-x-0 bg-deep-ocean/80 text-atlas-paper text-[9px] py-1 opacity-0 group-hover:opacity-100 transition-opacity text-center font-mono">
//                                             PX: {result.pixel_coords.join(',')}
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//
//                             {/* 坐标 */}
//                             <div className="text-[9px] text-faded-slate font-mono text-right">
//                                 {result.lat.toFixed(5)}, {result.lon.toFixed(5)}
//                             </div>
//                         </div>
//                     </Popup>
//                 </Marker>
//             ))}
//
//             {showLayer3 && <HeatmapLayer points={searchResults}/>}
//             <MapController activeLocation={activeLocation}/>
//         </MapContainer>
//     );
// };
//
// export default DynamicMap;


import {useRef, useMemo} from 'react';
import Map, {Source, Layer, Marker, Popup, NavigationControl, useMap} from 'react-map-gl/maplibre';
import DeckGLOverlay from './DeckGLOverlay'; // 稍后创建
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {ScrollText, MapPin} from "lucide-react";

// --- 1. 定义多地图源 URL ---
// MapLibre 的 raster source 需要 tiles 数组
const MAP_SOURCES = {
    'venice_1846': '/maps/historical_1/{z}/{x}/{y}.png',
    'venice_1900': '/maps/historical_2/{z}/{x}/{y}.png',
    'default': '/maps/historical_1/{z}/{x}/{y}.png'
};

// --- 2. 自定义图标组件 (复用之前的 SVG 代码) ---
const MuseumPin = ({onClick}) => {
    const pinPath = "M15 0C6.71573 0 0 6.71573 0 15C0 25.5 15 40 15 40C15 40 30 25.5 30 15C30 6.71573 23.2843 0 15 0Z";
    const gradientId = "deepSeaGradient";
    return (
        <div
            onClick={onClick}
            className="relative w-full h-full group hover:-translate-y-1 transition-transform duration-500 ease-out cursor-pointer"
            style={{width: '24px', height: '34px'}}
        >
            {/* 阴影 */}
            <svg width="24" height="34" viewBox="0 0 30 42" className="absolute top-0.5 left-0 opacity-20 blur-[1.5px]">
                <path d={pinPath} fill="black"/>
            </svg>
            {/* 本体 */}
            <svg width="24" height="34" viewBox="0 0 30 40" fill="none" className="relative z-10 drop-shadow-md">
                <defs>
                    <linearGradient id={gradientId} x1="15" y1="0" x2="15" y2="40" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#5B7C99"/>
                        <stop offset="100%" stopColor="#2A4359"/>
                    </linearGradient>
                </defs>
                <path d={pinPath} fill={`url(#${gradientId})`} stroke="white" strokeWidth="2"/>
                <circle cx="15" cy="15" r="7" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
                <circle cx="15" cy="15" r="3" fill="white"/>
            </svg>
        </div>
    );
};

// --- 3. 动画控制器 ---
// React Map GL 通过 ref 控制，但为了保持兼容性，我们可以用 useEffect 监听 activeLocation
const MapController = ({activeLocation, mapRef}) => {
    useEffect(() => {
        if (activeLocation && mapRef.current) {
            mapRef.current.flyTo({
                center: [activeLocation.lon, activeLocation.lat],
                zoom: 16,
                pitch: 45, // 🔥 飞过去的时候自动倾斜，展示3D效果
                bearing: 0,
                duration: 2000,
                essential: true
            });
        }
    }, [activeLocation, mapRef]);
    return null;
};

// --- 4. 主组件 ---
const DynamicMap = ({
                        searchResults,
                        showLayer1, showLayer2, showLayer3, opacity = 0.7,
                        activeLocation, onMarkerClick, mapId,
                        // 3D 热力图相关
                        show3DHeatmap, heatmapData
                    }) => {
    const mapRef = useRef(null);
    const [viewState, setViewState] = useState({
        longitude: 12.3345,
        latitude: 45.4371,
        zoom: 13,
        pitch: 0, // 初始 0，用户可以右键旋转
        bearing: 0
    });

    const [selectedMarker, setSelectedMarker] = useState(null);

    // 计算历史地图 URL
    const activeTileUrl = MAP_SOURCES[mapId] || MAP_SOURCES['default'];
    const fullMapUrl = "/maps/raw/sample_venice_map_3.jpg";

    // 构建底图样式对象 (Style JSON)
    // MapLibre 需要一个完整的 Style JSON，我们这里手动构建一个简单的只包含 CartoDB 的样式
    const mapStyle = useMemo(() => ({
        version: 8,
        sources: {
            // 底图源：CartoDB Light
            'carto-light': {
                type: 'raster',
                tiles: ['https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png'],
                tileSize: 256,
                attribution: '&copy; CartoDB'
            },
            // 历史地图源
            'historical-map': {
                type: 'raster',
                tiles: [activeTileUrl], // 动态 URL
                tileSize: 256,
                scheme: 'xyz'
            }
        },
        layers: [
            // 底图层
            {
                id: 'carto-layer',
                type: 'raster',
                source: 'carto-light',
                paint: {'raster-opacity': 1}
            },
            // 历史地图层 (只有当 showLayer1 为 true 时才在数组里)
            ...(showLayer1 && mapId ? [{
                id: 'historical-layer',
                type: 'raster',
                source: 'historical-map',
                paint: {
                    'raster-opacity': opacity, // 动态透明度
                    'raster-fade-duration': 300
                }
            }] : [])
        ]
    }), [activeTileUrl, showLayer1, mapId, opacity]);

    return (
        <div className="w-screen h-screen bg-[#f0f0f0]">
            <Map
                ref={mapRef}
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                style={{width: '100%', height: '100%'}}
                mapStyle={mapStyle} // 注入样式
                mapLib={maplibregl} // 指定使用 maplibre
                minZoom={2}
                maxZoom={20}
                // 开启所有交互
                dragRotate={true}
                touchZoomRotate={true}
            >
                {/* 导航控件 (右上角) */}
                <NavigationControl position="top-right" showCompass={true} visualizePitch={true}/>

                {/* --- DeckGL 3D 热力图层 (作为 Overlay) --- */}
                {show3DHeatmap && (
                    <DeckGLOverlay
                        data={heatmapData}
                        visible={show3DHeatmap}
                    />
                )}

                {/* --- Markers (React Map GL 原生 Marker) --- */}
                {/*{showLayer2 && searchResults.map((result) => (*/}
                {/*    <Marker*/}
                {/*        key={result.id}*/}
                {/*        longitude={result.lon}*/}
                {/*        latitude={result.lat}*/}
                {/*        anchor="bottom" // 锚点在底部*/}
                {/*        onClick={e => {*/}
                {/*            // 阻止冒泡，防止点击地图关闭 Popup*/}
                {/*            e.originalEvent.stopPropagation();*/}
                {/*            onMarkerClick && onMarkerClick(result);*/}
                {/*            setSelectedMarker(result);*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <MuseumPin/>*/}
                {/*    </Marker>*/}
                {/*))}*/}


                {/* 渲染 Markers */}
                {showLayer2 && !show3DHeatmap && searchResults.map(res => {
                    // 判断类型
                    const isDoc = res.fullData?.type === 'document' || res.type === 'document';
                    const isActive = activeLocation?.id === res.id;

                    return (
                        <Marker
                            key={res.id}
                            longitude={res.lon}
                            latitude={res.lat}
                            anchor="bottom"
                            onClick={(e) => {
                                e.originalEvent.stopPropagation(); // 防止点击穿透到底图
                                onMarkerClick(res);
                            }}
                        >
                            <div className={`
                            group cursor-pointer transform transition-all duration-300
                            ${isActive ? 'scale-125 z-50' : 'hover:scale-110 z-10'}
                        `}>
                                {isDoc ? (
                                    // --- 文档图标 (金色/橙色) ---
                                    <div className={`
                                    p-1.5 rounded-full shadow-lg border-2 
                                    ${isActive ? 'bg-orange-500 border-white' : 'bg-white border-orange-500'}
                                `}>
                                        <ScrollText
                                            size={18}
                                            className={isActive ? 'text-white' : 'text-orange-600'}
                                        />
                                    </div>
                                ) : (
                                    // --- 地图图标 (深蓝色) ---
                                    <div className={`
                                    p-1.5 rounded-full shadow-lg border-2
                                    ${isActive ? 'bg-blue-600 border-white' : 'bg-white border-blue-600'}
                                `}>
                                        <MapPin
                                            size={18}
                                            className={isActive ? 'text-white' : 'text-blue-700'}
                                        />
                                    </div>
                                )}

                                {/* 简单的 Tooltip (鼠标悬停显示标题) */}
                                <div
                                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    {isDoc ? "📜 Document" : "🗺️ Map Tile"}
                                </div>
                            </div>
                        </Marker>
                    );
                })}

                {/* --- Popup (弹窗) --- */}
                {selectedMarker && (
                    <Popup
                        longitude={selectedMarker.lon}
                        latitude={selectedMarker.lat}
                        anchor="bottom"
                        offset={40} // 向上偏移避开 Pin
                        onClose={() => setSelectedMarker(null)}
                        closeButton={false} // 使用自定义样式，不要默认的叉
                        className="museum-popup" // 可以在 globals.css 自定义样式
                    >
                        {/* 弹窗内容 (完全复用之前的) */}
                        <div className="flex flex-col gap-3 p-2 font-serif text-deep-ocean w-56">
                            <div>
                                <h3 className="font-bold text-base leading-tight mb-1">{selectedMarker.fullData?.image_source || "Location"}</h3>
                                <div
                                    className="flex justify-between items-center text-xs text-faded-slate border-t border-border pt-1 mt-1">
                                    <span>Score: <span
                                        className="font-bold text-time-gold">{selectedMarker.score.toFixed(2)}</span></span>
                                    <span className="font-mono">ID: {selectedMarker.id.substring(0, 4)}</span>
                                </div>
                            </div>
                            {selectedMarker.pixel_coords && (
                                <div className="space-y-1">
                                    <div
                                        className="relative group rounded-sm overflow-hidden border border-border shadow-sm bg-atlas-paper h-28">
                                        <div
                                            className="w-full h-full transition-transform duration-500 group-hover:scale-105 filter sepia-[0.1]"
                                            style={{
                                                backgroundRepeat: 'no-repeat',
                                                backgroundImage: `url(${fullMapUrl})`,
                                                backgroundPosition: `-${selectedMarker.pixel_coords[0]}px -${selectedMarker.pixel_coords[1]}px`,
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </Popup>
                )}

                {/* 逻辑控制器 */}
                <MapController activeLocation={activeLocation} mapRef={mapRef}/>
            </Map>
        </div>
    );
};

export default DynamicMap;