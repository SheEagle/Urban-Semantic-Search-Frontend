// 'use client';
//
// import {useEffect} from 'react';
// import {MapContainer, TileLayer, Marker, Popup, ImageOverlay, useMapEvents} from 'react-leaflet';
// import L from 'leaflet';
// import HeatmapLayer from './HeatmapLayer';
//
// import 'leaflet/dist/leaflet.css';
//
// // 导入 Leaflet 默认图标资源
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// import {useState} from 'react'; // 引入 useState
//
// // // ✨ 新增组件：实时显示鼠标经纬度
// // const MouseCoordinates = () => {
// //     const [coords, setCoords] = useState(null);
// //
// //     useMapEvents({
// //         mousemove(e) {
// //             setCoords({
// //                 lat: e.latlng.lat,
// //                 lng: e.latlng.lng,
// //             });
// //         },
// //         // 鼠标移出地图时清空
// //         mouseout() {
// //             setCoords(null);
// //         }
// //     });
// //
// //     if (!coords) return null;
// //
// //     return (
// //         <div className="leaflet-bottom leaflet-right"
// //              style={{pointerEvents: 'none', marginBottom: '20px', marginRight: '10px', zIndex: 1000}}>
// //             <div
// //                 className="bg-white/80 backdrop-blur-md border border-slate-200 text-slate-700 text-xs font-mono py-1 px-3 rounded-md shadow-lg flex gap-3">
// //                 <span>Lat: <span className="font-bold text-blue-600">{coords.lat.toFixed(5)}</span></span>
// //                 <span>Lng: <span className="font-bold text-blue-600">{coords.lng.toFixed(5)}</span></span>
// //             </div>
// //         </div>
// //     );
// // };
//
// const DynamicMap = ({searchResults, showLayer1, showLayer2, showLayer3}) => {
//
//     const DefaultIcon = L.icon({
//         iconUrl: markerIcon.src,
//         iconRetinaUrl: markerIcon2x.src,
//         shadowUrl: markerShadow.src,
//         iconSize: [25, 41],      // Leaflet 默认大小
//         iconAnchor: [12, 41],    // 图标尖端对应的坐标偏移
//         popupAnchor: [1, -34],   // 弹出框相对于图标的偏移
//         shadowSize: [41, 41]
//     });
//
//
//     // useEffect(() => {
//     //     // 这里的 delete 是为了清理 Leaflet 内部可能存在的错误路径引用
//     //     delete L.Icon.Default.prototype._getIconUrl;
//     //
//     //     // 重新设置默认图标的 URL
//     //     L.Icon.Default.mergeOptions({
//     //         iconRetinaUrl: markerIcon2x.src,
//     //         iconUrl: markerIcon.src,
//     //         shadowUrl: markerShadow.src,
//     //     });
//     // }, []);
//
//     // 🇮🇹 威尼斯 (Venice) 坐标配置
//     const veniceCenter = [45.4371908, 12.3345898]; // 圣马可广场附近
//
//     // 示例历史地图边界 (根据您的实际 QGIS 配准数据修改)
//     // 这里暂时框选了威尼斯主岛区域
//     const historicalBounds = [
//         [45.42, 12.30], // 左下 (South-West)
//         [45.45, 12.36]  // 右上 (North-East)
//     ];
//
//     const historicalMapUrl = "/maps/venice_1800.png"; // 建议您找一张威尼斯老地图放进去
//
//     return (
//         <MapContainer
//             center={veniceCenter}
//             zoom={14} // 稍微放大一点，看清楚水城细节
//             scrollWheelZoom={true}
//             style={{height: '100vh', width: '100vw', background: '#f0f0f0'}} // 设置背景色，防止加载时白屏刺眼
//         >
//             {/* 使用 CartoDB Positron (浅灰色极简风格)，加载速度通常比 OSM 快很多 */}
//             <TileLayer
//                 attribution='&copy; <a href="https://carto.com/">CARTO</a>'
//                 url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
//             />
//
//             {/* Layer 1: 历史地图瓦片 */}
//             {showLayer1 && (
//                 <TileLayer
//                     // 🎯 这里的路径必须和 public 下的目录结构对应
//                     // {z} 代表缩放级别(12-16)，{x} 和 {y} 代表坐标
//                     url="/maps/historical_1/{z}/{x}/{y}.png"
//
//                     // ⚠️ 关键设置：必须和您现有的文件夹号一致！
//                     minZoom={12}  // 您只有 12 级以上的图
//                     maxZoom={16}  // 您最大只有 16 级
//
//                     // 其他优化设置
//                     tms={false}   // QGIS 生成的通常是 false (默认)
//                     opacity={0.7} // 半透明，方便和底图对比
//                     errorTileUrl="" // 如果某张瓦片加载失败，不显示红叉
//                 />
//             )}
//
//             {/* Layer 2: Pins */}
//             {showLayer2 && searchResults.map((result) => (
//                 <Marker
//                     key={result.id}
//                     position={[result.lat, result.lon]}
//                     icon={DefaultIcon}
//                 >
//                     <Popup>
//                         <div className="text-sm">
//                             <h3 className="font-bold mb-1">{result.content}</h3>
//                             <p className="text-gray-500 m-0">Relevance: {result.score}</p>
//                             <p className="text-gray-500 m-0">{result.lat}, {result.lon}</p>
//                         </div>
//                     </Popup>
//                 </Marker>
//             ))}
//
//             {/* Layer 3: 热力图 */}
//             {showLayer3 && <HeatmapLayer points={searchResults}/>}
//
//             {/*<MouseCoordinates/>*/}
//
//         </MapContainer>
//     );
// };
//
// export default DynamicMap;
// 'use client';
//
// import {useState, useEffect} from 'react';
// import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
// import L from 'leaflet';
// import HeatmapLayer from './HeatmapLayer';
//
// import 'leaflet/dist/leaflet.css';
//
// // 导入图标资源
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';
//
// const DynamicMap = ({searchResults, showLayer1, showLayer2, showLayer3}) => {
//     // 1. 添加一个状态，控制是否已在客户端挂载且修复完毕
//     const [isMounted, setIsMounted] = useState(false);
//
//     useEffect(() => {
//         // 2. 在这里进行图标修复
//         // fix: 解决 Leaflet 默认图标在 Webpack/Next.js 下路径丢失的问题
//         delete L.Icon.Default.prototype._getIconUrl;
//
//         L.Icon.Default.mergeOptions({
//             iconRetinaUrl: markerIcon2x.src,
//             iconUrl: markerIcon.src,
//             shadowUrl: markerShadow.src,
//         });
//
//         // 3. 修复完成后，标记为已挂载
//         setIsMounted(true);
//     }, []);
//
//     // 4. 如果还没有挂载（或者还在服务端），直接不渲染任何 Leaflet 组件
//     // 这能确保 Marker 渲染时，全局图标配置已经修复好了
//     if (!isMounted) {
//         return (
//             <div className="flex items-center justify-center h-screen w-screen bg-gray-100 text-gray-500">
//                 Loading Map...
//             </div>
//         );
//     }
//
//     // 🇮🇹 威尼斯 (Venice) 坐标
//     const veniceCenter = [45.4371908, 12.3345898];
//
//     return (
//         <MapContainer
//             center={veniceCenter}
//             zoom={14}
//             scrollWheelZoom={true}
//             style={{height: '100vh', width: '100vw', background: '#f0f0f0'}}
//         >
//             <TileLayer
//                 attribution='&copy; <a href="https://carto.com/">CARTO</a>'
//                 url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
//             />
//
//             {showLayer1 && (
//                 <TileLayer
//                     url="/maps/historical_1/{z}/{x}/{y}.png"
//                     minZoom={12}
//                     maxZoom={16}
//                     tms={false}
//                     opacity={0.7}
//                     errorTileUrl=""
//                 />
//             )}
//
//             {/* Layer 2: Pins */}
//             {/* ⚠️ 必须做防御性检查：确保 result.lat 和 result.lon 存在，否则 Marker 会报错 */}
//             {showLayer2 && searchResults.map((result) => {
//                 if (!result.lat || (!result.lon && !result.lng)) return null;
//
//                 return (
//                     <Marker
//                         key={result.id}
//                         position={[result.lat, result.lon || result.lng]}
//                     >
//                         <Popup>
//                             <div className="text-sm">
//                                 <h3 className="font-bold mb-1">{result.content}</h3>
//                                 <p className="text-gray-500 m-0">Relevance: {result.score}</p>
//                                 <p className="text-gray-500 m-0">{result.lat}, {result.lon}</p>
//                             </div>
//                         </Popup>
//                     </Marker>
//                 );
//             })}
//
//             {showLayer3 && <HeatmapLayer points={searchResults}/>}
//         </MapContainer>
//     );
// };
//
// export default DynamicMap;

'use client';

import {useState, useEffect} from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import L from 'leaflet';
import HeatmapLayer from './HeatmapLayer';
import 'leaflet/dist/leaflet.css';

// ⚠️ 1. 删除所有 import markerIcon from ... 的代码
// ⚠️ 2. 删除 useEffect 里所有的 delete L.Icon.Default... 代码

// 3. 定义一个自定义图标 (使用 CDN 链接，确保绝对不会报路径错误)
// 只要显式传入这个 icon，Leaflet 就不会去检查默认配置，从而绕过报错
const customMarkerIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// --- 2. 地图控制器组件 (用于 FlyTo 动画) ---
const MapController = ({activeLocation}) => {
    const map = useMap();

    useEffect(() => {
        if (activeLocation) {
            // 平滑飞向目标点
            map.flyTo(
                [activeLocation.lat, activeLocation.lon],
                16, // 目标缩放级别
                {
                    duration: 1.5,
                    easeLinearity: 0.25
                }
            );
            // 可选：飞过去后自动打开该坐标点的 Popup
            // 这需要 Ref 的支持，如果需要可以进一步扩展
        }
    }, [activeLocation, map]);

    return null;
};


const DynamicMap = ({
                        searchResults, showLayer1, showLayer2, showLayer3,
                        opacity = 0.7, // 接收透明度 Prop
                        activeLocation, // 接收当前激活的地点
                        onMarkerClick   // 接收点击 Marker 的回调
                    }) => {
    // 保持 isMounted 检查，这是 Next.js 使用 Leaflet 的最佳实践
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">Loading map...</div>;
    }

    const veniceCenter = [45.4371908, 12.3345898];

    const fullMapUrl = "/maps/raw/sample_venice_map_3.jpg";

    return (
        <MapContainer
            center={veniceCenter}
            zoom={14}
            scrollWheelZoom={true}
            style={{height: '100vh', width: '100vw', background: '#f0f0f0'}}
        >
            <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />

            {showLayer1 && (
                <TileLayer
                    url="/maps/venice/{z}/{x}/{y}.png" // 确保这里指向您 QGIS 生成的切片目录
                    minZoom={12}
                    maxZoom={16}
                    tms={false}
                    opacity={opacity} // 动态应用透明度
                />
            )}

            {/*{showLayer2 && searchResults.map((result) => (*/}
            {/*    <Marker*/}
            {/*        key={result.id}*/}
            {/*        position={[result.lat, result.lon]}*/}
            {/*        // ⬇️⬇️⬇️ 关键点在这里 ⬇️⬇️⬇️*/}
            {/*        // 显式传入 icon 属性，彻底根治 "iconUrl not set" 错误*/}
            {/*        icon={customMarkerIcon}*/}
            {/*    >*/}
            {/*        /!*<Popup>*!/*/}
            {/*        /!*    <div className="text-sm">*!/*/}
            {/*        /!*        <h3 className="font-bold mb-1">{result.content}</h3>*!/*/}
            {/*        /!*        <p className="text-gray-500 m-0">Relevance: {result.score}</p>*!/*/}
            {/*        /!*        <p className="text-gray-500 m-0">{result.lat}, {result.lon}</p>*!/*/}
            {/*        /!*    </div>*!/*/}
            {/*        /!*</Popup>*!/*/}
            {/*        <Popup minWidth={200}>*/}
            {/*            <div className="flex flex-col gap-2">*/}
            {/*                /!* 1. 文本信息区域 *!/*/}
            {/*                <div className="text-sm">*/}
            {/*                    <h3 className="font-bold mb-1 text-base">{result.content}</h3>*/}
            {/*                    <div className="flex justify-between text-xs text-gray-500">*/}
            {/*                        <span>Relevance: {result.score.toFixed(2)}</span>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                /!* 2. Patch 图片展示区域 (核心修改) *!/*/}
            {/*                {result.pixel_coords && (*/}
            {/*                    <div className="relative group">*/}
            {/*                        /!* 图片容器 *!/*/}
            {/*                        <div*/}
            {/*                            className="border-2 border-white shadow-md rounded-md overflow-hidden bg-gray-100 relative"*/}
            {/*                            style={{*/}
            {/*                                width: '112px',*/}
            {/*                                height: '112px',*/}
            {/*                                // 强制不重复*/}
            {/*                                backgroundRepeat: 'no-repeat',*/}
            {/*                                // 设置背景图为大地图*/}
            {/*                                backgroundImage: `url(${fullMapUrl})`,*/}
            {/*                                // 关键点：将背景图向左上移动，露出对应的坐标区域*/}
            {/*                                // 注意负号： background-position: -x -y*/}
            {/*                                backgroundPosition: `-${result.pixel_coords[0]}px -${result.pixel_coords[1]}px`,*/}
            {/*                                // ⚠️ 如果后端是在原图缩放后的图上取点的，这里需要设置 backgroundSize*/}
            {/*                                // backgroundSize: 'original_widthpx original_heightpx'*/}
            {/*                            }}*/}
            {/*                        />*/}

            {/*                        /!* (可选) 悬浮显示坐标提示 *!/*/}
            {/*                        <div*/}
            {/*                            className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] p-1 opacity-0 group-hover:opacity-100 transition-opacity text-center">*/}
            {/*                            X: {result.pixel_coords[0]}, Y: {result.pixel_coords[1]}*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                )}*/}

            {/*                <p className="text-xs text-gray-400 m-0">*/}
            {/*                    Lat: {result.lat.toFixed(4)}, Lng: {result.lon.toFixed(4)}*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*        </Popup>*/}
            {/*    </Marker>*/}
            {/*))}*/}

            {/* Layer 2: 搜索结果 Markers */}
            {showLayer2 && searchResults.map((result) => (
                <Marker
                    key={result.id}
                    position={[result.lat, result.lon]}
                    icon={customMarkerIcon} // 使用修复后的图标
                    eventHandlers={{
                        // 点击 Marker 时，通知父组件（用于打开侧边栏详情等）
                        click: () => onMarkerClick && onMarkerClick(result),
                    }}
                >
                    <Popup minWidth={220} maxWidth={300}>
                        <div className="flex flex-col gap-3 p-1">
                            {/* 1. 文本信息区域 */}
                            <div>
                                <h3 className="font-bold text-base leading-tight mb-1">{result.content}</h3>
                                <div
                                    className="flex justify-between items-center text-xs text-gray-500 bg-gray-50 p-1 rounded">
                                    <span>Score: <span
                                        className="font-mono text-blue-600">{result.score.toFixed(4)}</span></span>
                                    <span>ID: {result.id.substring(0, 6)}...</span>
                                </div>
                            </div>

                            {/* 2. Patch 图片切片展示区域 */}
                            {result.pixel_coords && (
                                <div className="space-y-1">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Historical Fragment</span>
                                    <div
                                        className="relative group rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-100">
                                        {/* 图片容器 */}
                                        <div
                                            className="transition-transform duration-500 group-hover:scale-105"
                                            style={{
                                                width: '100%', // 宽度撑满 Popup
                                                height: '140px', // 固定高度
                                                backgroundRepeat: 'no-repeat',
                                                backgroundImage: `url(${fullMapUrl})`,
                                                // 核心逻辑：利用 backgroundPosition 定位到大图的具体像素位置
                                                // 假设 pixel_coords 是切片的中心点，这里做一个简单的偏移让它居中
                                                // 如果 pixel_coords 是左上角坐标，则直接用 -x -y
                                                backgroundPosition: `-${result.pixel_coords[0]}px -${result.pixel_coords[1]}px`,
                                            }}
                                        />

                                        {/* 悬浮显示像素坐标 */}
                                        <div
                                            className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-[2px] text-white text-[10px] py-1 opacity-0 group-hover:opacity-100 transition-opacity text-center font-mono">
                                            PX: {result.pixel_coords[0]}, {result.pixel_coords[1]}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 底部经纬度 */}
                            <div
                                className="text-[10px] text-gray-400 font-mono text-right border-t pt-1 mt-1 border-gray-100">
                                {result.lat.toFixed(6)}, {result.lon.toFixed(6)}
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}

            {showLayer3 && <HeatmapLayer points={searchResults}/>}

            {/* 功能组件：地图控制器 (负责飞行动画) */}
            <MapController activeLocation={activeLocation}/>
        </MapContainer>
    );
};

export default DynamicMap;