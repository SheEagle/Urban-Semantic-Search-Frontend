'use client';

import {useState, useEffect, useRef, useMemo} from 'react';
import Map, {Marker, Popup, NavigationControl} from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {ScrollText, MapPin} from "lucide-react";

// 🔥 引入 DeckGL 相关
import DeckGLOverlay from './DeckGLOverlay';
import {HexagonLayer} from '@deck.gl/aggregation-layers';
// --- 1. 定义多地图源 URL ---
const MAP_SOURCES = {
    'venice_1846': '/maps/web_tiles_1/{z}/{x}/{y}.png',
    'default': '/maps/web_tiles_1/{z}/{x}/{y}.png'
};

// --- 2. 动画控制器 ---
const MapController = ({activeLocation, mapRef}) => {
    useEffect(() => {
        if (activeLocation && mapRef.current) {
            mapRef.current.flyTo({
                center: [activeLocation.lon, activeLocation.lat],
                zoom: 16,
                pitch: 50, // 飞向目标时也保持倾斜
                bearing: 0,
                duration: 2000,
                essential: true
            });
        }
    }, [activeLocation, mapRef]);
    return null;
};

// 🎨 修改 1: 定义新色系 (暖色系: 浅黄 -> 橙 -> 深红)
// 这种单色系渐变看起来更像"数据可视化"，而不是"霓虹灯"
// const HEATMAP_COLOR_RANGE = [
//     [255, 255, 212], // 极浅黄 (Low)
//     [254, 217, 142], // 浅橙
//     [254, 153, 41],  // 橙
//     [217, 95, 14],   // 深橙
//     [153, 52, 4]     // 褐红 (High)
// ];

// 🎨 修改: 极致单色系 (Monochromatic Orange)
// 这种风格非常像建筑模型，干净、高级
const HEATMAP_COLOR_RANGE = [
    [255, 247, 237], // 极浅 (几乎透明)
    [254, 232, 200],
    [253, 212, 158],
    [253, 187, 132],
    [252, 141, 89],
    [239, 101, 72],
    [215, 48, 31],
    [153, 0, 0]      // 极深 (最热)
];

// 图例组件 (自动适配上面的颜色)
const HeatmapLegend = () => {
    const gradient = `linear-gradient(to right, ${
        HEATMAP_COLOR_RANGE.map(c => `rgb(${c.join(',')})`).join(',')
    })`;

    return (
        <div
            className="absolute bottom-32 right-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl shadow-xl border border-white/50 z-[400] w-48 animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="flex items-center gap-2 mb-2">
                {/* 小圆点换成深橙色 */}
                <div className="w-2 h-2 rounded-full bg-[#ef6548] animate-pulse"></div>
                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">
                    Intensity
                </span>
            </div>

            {/* 渐变条 */}
            <div className="h-2 w-full rounded-full shadow-inner mb-1" style={{background: gradient}}/>

            <div className="flex justify-between text-[9px] text-slate-400 font-mono font-medium">
                <span>Low</span>
                <span>High</span>
            </div>
        </div>
    );
};


// --- 3. 主组件 ---
const DynamicMap = ({
                        searchResults,
                        showLayer1, showLayer2, showLayer3, opacity = 70, // 1. 给一个默认值 70 (0-100 scale),
                        activeLocation, onMarkerClick, mapId,
                        // 3D 热力图相关 props
                        show3DHeatmap, heatmapData
                    }) => {
    const mapRef = useRef(null);
    const [viewState, setViewState] = useState({
        longitude: 12.3345,
        latitude: 45.4371,
        zoom: 13,
        pitch: 0,
        bearing: 0
    });

    const [selectedMarker, setSelectedMarker] = useState(null);
    const activeTileUrl = MAP_SOURCES[mapId] || MAP_SOURCES['default'];
    const fullMapUrl = "/maps/raw/sample_venice_map_3.jpg";

    // --- 🔥 核心逻辑：自动倾斜视角 (Auto Tilt) ---
    // 当切换 3D 模式时，自动调整视角 pitch
    useEffect(() => {
        const map = mapRef.current?.getMap();
        if (map) {
            if (show3DHeatmap) {
                // 开启 3D：倾斜 50 度，稍微旋转一点角度更有立体感
                map.easeTo({pitch: 50, bearing: 10, duration: 1000});
            } else {
                // 关闭 3D：恢复俯视
                map.easeTo({pitch: 0, bearing: 0, duration: 1000});
            }
        }
    }, [show3DHeatmap]);

    // const safeOpacity = useMemo(() => {
    //     let val = opacity;
    //     // 如果意外传入了数组 [70]
    //     if (Array.isArray(val)) val = val[0];
    //     // 确保是数字
    //     val = Number(val);
    //     // 如果是 NaN，回退到 70
    //     if (isNaN(val)) val = 70;
    //     // 限制范围 0-100
    //     val = Math.min(100, Math.max(0, val));
    //
    //     return val / 100; // 转为 MapLibre 需要的 0.0 - 1.0
    // }, [opacity]);

    // 1. 计算 safeOpacity (保持原样)
    const safeOpacity = useMemo(() => {
        let val = opacity;
        if (Array.isArray(val)) val = val[0];
        val = Number(val);
        if (isNaN(val)) val = 70;
        val = Math.min(100, Math.max(0, val));
        return val / 100;
    }, [opacity]);

    // 🔥【新增】: 专门用于实时更新透明度的 Effect
    // 这比更新整个 mapStyle 更快、更流畅，且不会导致瓦片重载
    useEffect(() => {
        const map = mapRef.current?.getMap();
        // 确保地图已加载且图层存在
        if (map && map.getLayer('historical-layer')) {
            map.setPaintProperty('historical-layer', 'raster-opacity', safeOpacity);
        }
    }, [safeOpacity, mapRef]); // 只要 safeOpacity 变了，就执行

    // const mapStyle = useMemo(() => ({
    //     version: 8,
    //     sources: {
    //         'carto-light': {
    //             type: 'raster',
    //             tiles: ['https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png'],
    //             tileSize: 256,
    //             attribution: '&copy; CartoDB'
    //         },
    //         'historical-map': {
    //             type: 'raster',
    //             tiles: [activeTileUrl],
    //             tileSize: 256,
    //             scheme: 'xyz'
    //         }
    //     },
    //     layers: [
    //         {
    //             id: 'carto-layer',
    //             type: 'raster',
    //             source: 'carto-light',
    //             paint: {'raster-opacity': 1}
    //         },
    //         // 🔥 修复点 2: 只有当 mapId 存在且 showLayer1 为 true 时才渲染
    //         ...(showLayer1 && mapId ? [{
    //             id: 'historical-layer',
    //             type: 'raster',
    //             source: 'historical-map',
    //             paint: {
    //                 'raster-opacity': safeOpacity, // 使用计算好的安全透明度
    //                 'raster-fade-duration': 100     // 减少过渡时间，让调节更跟手
    //             }
    //         }] : [])
    //     ]
    // }), [activeTileUrl, showLayer1, mapId, safeOpacity]); // 依赖 safeOpacity
    const mapStyle = useMemo(() => ({
        version: 8,
        sources: {
            'carto-light': {
                type: 'raster',
                tiles: ['https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png'],
                tileSize: 256,
                attribution: '&copy; CartoDB'
            },
            'historical-map': {
                type: 'raster',
                tiles: [activeTileUrl],
                tileSize: 256,
                scheme: 'xyz'
            }
        },
        layers: [
            {
                id: 'carto-layer',
                type: 'raster',
                source: 'carto-light',
                paint: {'raster-opacity': 1}
            },
            // 历史地图层
            ...(showLayer1 && mapId ? [{
                id: 'historical-layer',
                type: 'raster',
                source: 'historical-map',
                paint: {
                    // 这里虽然写了 safeOpacity，但实际上由上面的 useEffect 接管控制
                    // 初始渲染用 safeOpacity，后续更新用 setPaintProperty
                    'raster-opacity': safeOpacity,
                    'raster-fade-duration': 0 // 设为 0 可以让滑动更跟手
                }
            }] : [])
        ]
        // 🔥【关键修改】: 下面的依赖数组里去掉了 safeOpacity
        // 这样拖动滑块时，mapStyle 对象不会变，就不会触发重绘，只触发上面的 setPaintProperty
    }), [activeTileUrl, showLayer1, mapId]);


    // const mapStyle = useMemo(() => ({
    //     version: 8,
    //     sources: {
    //         'carto-light': {
    //             type: 'raster',
    //             tiles: ['https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png'],
    //             tileSize: 256,
    //             attribution: '&copy; CartoDB'
    //         },
    //         'historical-map': {
    //             type: 'raster',
    //             tiles: [activeTileUrl],
    //             tileSize: 256,
    //             scheme: 'xyz'
    //         }
    //     },
    //     layers: [
    //         {
    //             id: 'carto-layer',
    //             type: 'raster',
    //             source: 'carto-light',
    //             paint: {'raster-opacity': 1}
    //         },
    //         ...(showLayer1 && mapId ? [{
    //             id: 'historical-layer',
    //             type: 'raster',
    //             source: 'historical-map',
    //             paint: {
    //                 // MapLibre 需要 0-1 的透明度，前端 Slider 可能是 0-100
    //                 'raster-opacity': opacity / 100,
    //                 'raster-fade-duration': 300
    //             }
    //         }] : [])
    //     ]
    // }), [activeTileUrl, showLayer1, mapId, opacity]);

    // --- 🔥 核心逻辑：构建 DeckGL 图层 ---
    const deckLayers = useMemo(() => {
        if (!show3DHeatmap) return [];

        const data = (heatmapData && heatmapData.length > 0) ? heatmapData : searchResults;

        return [
            new HexagonLayer({
                id: 'heatmap-3d-layer',
                data: data,
                getPosition: d => [d.lng, d.lat],

                // --- 🎨 核心修改：高度计算逻辑 ---

                // 1. 移除 getElevationWeight (不再使用自动累加)
                // 2. 使用 getElevationValue (手动控制高度算法)
                getElevationValue: (points) => {
                    // A. 先算出这个六边形里所有点的总分
                    const totalScore = points.reduce((sum, p) => sum + (p.score || 1), 0);

                    // B. 使用对数平滑 (Math.log2 或 Math.log10)
                    // 加 1 是为了防止 log(0) 以及保证最小高度
                    // 效果：10 -> 3.3 | 100 -> 6.6 | 1000 -> 9.9
                    // 这样"高的"就被压下来了，"低的"也能看得到了
                    return Math.log2(totalScore + 1);
                },

                // --- 物理参数调整 ---
                radius: 25,

                // 🔥 因为 Log 算出来的值很小 (0~15左右)，所以 Scale 要设大一点
                elevationScale: 8,

                // 设一个硬上限，防止极个别异常值
                elevationRange: [0, 400],

                extruded: true,
                pickable: true,

                // --- 颜色 (保持之前的单色系) ---
                colorRange: HEATMAP_COLOR_RANGE,

                opacity: 1,
                coverage: 0.9,

                // 材质光感
                material: {
                    ambient: 0.4,
                    diffuse: 0.8,
                    shininess: 60,
                    specularColor: [255, 255, 255]
                },

                transitions: {
                    elevationScale: 1000
                }
            })
        ];
    }, [show3DHeatmap, heatmapData, searchResults]);

    return (
        <div className="w-screen h-screen bg-[#f0f0f0]">
            <Map
                ref={mapRef}
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                style={{width: '100%', height: '100%'}}
                mapStyle={mapStyle}
                mapLib={maplibregl}
                minZoom={2}
                maxZoom={20}
                dragRotate={true}       // 允许右键旋转
                pitchWithRotate={true}  // 允许旋转时改变倾斜
                touchZoomRotate={true}
            >
                <NavigationControl position="top-right" showCompass={true} visualizePitch={true}/>

                {/* --- 🔥 1. DeckGL Overlay (3D 热力图) --- */}
                {/* 只有在开启时才渲染，或者一直挂载但传入空 layers (取决于性能需求) */}
                <DeckGLOverlay layers={deckLayers}/>

                {/* --- 2. Markers (仅在不显示 3D 热力图时显示，避免混乱) --- */}
                {showLayer2 && !show3DHeatmap && searchResults.map(res => {
                    const isDoc = res.fullData?.type === 'document' || res.type === 'document';
                    const isActive = activeLocation?.id === res.id;

                    return (
                        <Marker
                            key={res.id}
                            longitude={res.lon}
                            latitude={res.lat}
                            anchor="bottom"
                            onClick={(e) => {
                                e.originalEvent.stopPropagation();
                                onMarkerClick(res);
                                setSelectedMarker(res);
                            }}
                        >
                            <div className={`
                                group cursor-pointer transform transition-all duration-300
                                ${isActive ? 'scale-125 z-50' : 'hover:scale-110 z-10'}
                            `}>
                                {isDoc ? (
                                    <div className={`
                                        p-1.5 rounded-full shadow-lg border-2 
                                        ${isActive ? 'bg-orange-500 border-white' : 'bg-white border-orange-500'}
                                    `}>
                                        <ScrollText size={18} className={isActive ? 'text-white' : 'text-orange-600'}/>
                                    </div>
                                ) : (
                                    <div className={`
                                        p-1.5 rounded-full shadow-lg border-2
                                        ${isActive ? 'bg-blue-600 border-white' : 'bg-white border-blue-600'}
                                    `}>
                                        <MapPin size={18} className={isActive ? 'text-white' : 'text-blue-700'}/>
                                    </div>
                                )}
                            </div>
                        </Marker>
                    );
                })}

                {/*/!* --- 3. Popup --- *!/*/}
                {/*{selectedMarker && !show3DHeatmap && (*/}
                {/*    <Popup*/}
                {/*        longitude={selectedMarker.lon}*/}
                {/*        latitude={selectedMarker.lat}*/}
                {/*        anchor="bottom"*/}
                {/*        offset={40}*/}
                {/*        onClose={() => setSelectedMarker(null)}*/}
                {/*        closeButton={false}*/}
                {/*        className="custom-popup"*/}
                {/*    >*/}
                {/*        <div className="flex flex-col gap-3 p-2 font-serif text-slate-800 w-56">*/}
                {/*            <div>*/}
                {/*                <h3 className="font-bold text-base leading-tight mb-1">*/}
                {/*                    {selectedMarker.fullData?.image_source || "Location"}*/}
                {/*                </h3>*/}
                {/*                <div*/}
                {/*                    className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-200 pt-1 mt-1">*/}
                {/*                    <span>Score: <span*/}
                {/*                        className="font-bold text-orange-600">{selectedMarker.score?.toFixed(2)}</span></span>*/}
                {/*                    <span className="font-mono">ID: {selectedMarker.id?.substring(0, 4)}</span>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            {selectedMarker.pixel_coords && (*/}
                {/*                <div className="space-y-1">*/}
                {/*                    <div*/}
                {/*                        className="relative group rounded-sm overflow-hidden border border-slate-200 shadow-sm bg-slate-100 h-28">*/}
                {/*                        <div*/}
                {/*                            className="w-full h-full transition-transform duration-500 group-hover:scale-105 filter sepia-[0.1]"*/}
                {/*                            style={{*/}
                {/*                                backgroundRepeat: 'no-repeat',*/}
                {/*                                backgroundImage: `url(${fullMapUrl})`,*/}
                {/*                                backgroundPosition: `-${selectedMarker.pixel_coords[0]}px -${selectedMarker.pixel_coords[1]}px`,*/}
                {/*                            }}*/}
                {/*                        />*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            )}*/}
                {/*        </div>*/}
                {/*    </Popup>*/}
                {/*)}*/}

                <MapController activeLocation={activeLocation} mapRef={mapRef}/>
            </Map>

            {show3DHeatmap && <HeatmapLegend/>}
        </div>
    );
};

export default DynamicMap;