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

'use client';

import {useState, useEffect} from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import L from 'leaflet';
import HeatmapLayer from './HeatmapLayer';
import 'leaflet/dist/leaflet.css';

// 自定义 Marker 图标
const customMarkerIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// 动画控制器
const MapController = ({activeLocation}) => {
    const map = useMap();
    useEffect(() => {
        if (activeLocation) {
            map.flyTo(
                [activeLocation.lat, activeLocation.lon],
                16,
                {duration: 1.5, easeLinearity: 0.25}
            );
        }
    }, [activeLocation, map]);
    return null;
};

const DynamicMap = ({
                        searchResults, showLayer1, showLayer2, showLayer3,
                        opacity = 0.7, activeLocation, onMarkerClick
                    }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        // 更新加载屏幕样式
        return <div
            className="h-screen w-screen bg-background flex items-center justify-center text-deep-ocean font-serif">Unfolding
            Map...</div>;
    }

    const veniceCenter = [45.4371908, 12.3345898];
    const fullMapUrl = "/maps/raw/sample_venice_map_3.jpg";

    return (
        <MapContainer
            center={veniceCenter}
            zoom={14}
            scrollWheelZoom={true}
            style={{height: '100vh', width: '100vw', background: '#f0f0f0'}}
            className="z-0"
        >
            {/* 底图：使用新的滤镜类名 */}
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                className="vintage-map-tiles"
            />

            {/* 历史图层 */}
            {showLayer1 && (
                <TileLayer
                    url="/maps/venice/{z}/{x}/{y}.png"
                    minZoom={12}
                    maxZoom={16}
                    tms={false}
                    opacity={opacity}
                />
            )}

            {/* Marker 图层 */}
            {showLayer2 && searchResults.map((result) => (
                <Marker
                    key={result.id}
                    position={[result.lat, result.lon]}
                    icon={customMarkerIcon}
                    eventHandlers={{
                        click: () => onMarkerClick && onMarkerClick(result),
                    }}
                >
                    {/* 移除原有的 parchment-popup 类名，依赖 globals.css 中对 Leaflet 弹窗的全局美化 */}
                    <Popup minWidth={220} maxWidth={300}>
                        {/* 更新弹窗内容颜色类名 */}
                        <div className="flex flex-col gap-3 p-1 font-serif text-deep-ocean">
                            {/* 标题 */}
                            <div>
                                <h3 className="font-bold text-base leading-tight mb-1">{result.fullData?.image_source || "Location"}</h3>
                                <div
                                    className="flex justify-between items-center text-xs text-faded-slate border-t border-border pt-1 mt-1">
                                    <span>Score: <span
                                        className="font-bold text-time-gold">{result.score.toFixed(2)}</span></span>
                                    <span className="font-mono">ID: {result.id.substring(0, 4)}</span>
                                </div>
                            </div>

                            {/* 图片切片 */}
                            {result.pixel_coords && (
                                <div className="space-y-1">
                                    <div
                                        className="relative group rounded-sm overflow-hidden border border-border shadow-sm bg-atlas-paper">
                                        <div
                                            className="transition-transform duration-500 group-hover:scale-105 filter sepia-[0.1]"
                                            style={{
                                                width: '100%',
                                                height: '140px',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundImage: `url(${fullMapUrl})`,
                                                backgroundPosition: `-${result.pixel_coords[0]}px -${result.pixel_coords[1]}px`,
                                            }}
                                        />
                                        <div
                                            className="absolute bottom-0 inset-x-0 bg-deep-ocean/80 text-atlas-paper text-[9px] py-1 opacity-0 group-hover:opacity-100 transition-opacity text-center font-mono">
                                            PX: {result.pixel_coords.join(',')}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 坐标 */}
                            <div className="text-[9px] text-faded-slate font-mono text-right">
                                {result.lat.toFixed(5)}, {result.lon.toFixed(5)}
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}

            {showLayer3 && <HeatmapLayer points={searchResults}/>}
            <MapController activeLocation={activeLocation}/>
        </MapContainer>
    );
};

export default DynamicMap;