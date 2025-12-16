'use client';

import {useState, useEffect, useRef, useMemo} from 'react';
import Map, {Marker, NavigationControl} from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {ScrollText, MapPin} from "lucide-react";

// Import DeckGL dependencies
import DeckGLOverlay from './DeckGLOverlay';
import {HexagonLayer} from '@deck.gl/aggregation-layers';

// --- 1. Define Map Source URLs ---
const MAP_SOURCES = {
    'venice_1846': '/maps/web_tiles_1/{z}/{x}/{y}.png',
    'venice_1675': '/maps/web_tiles_2/{z}/{x}/{y}.png',
    'default': '/maps/web_tiles_1/{z}/{x}/{y}.png'
};

// --- 2. Animation Controller ---
const MapController = ({activeLocation, mapRef}) => {
    useEffect(() => {
        if (activeLocation && mapRef.current) {
            mapRef.current.flyTo({
                center: [activeLocation.lon, activeLocation.lat],
                zoom: 16,
                pitch: 50, // Maintain pitch when flying to target
                bearing: 0,
                duration: 2000,
                essential: true
            });
        }
    }, [activeLocation, mapRef]);
    return null;
};

// Monochromatic Orange Color Scale
// Creates a clean, architectural model aesthetic rather than a neon look
const HEATMAP_COLOR_RANGE = [
    [255, 247, 237], // Very light (almost transparent)
    [254, 232, 200],
    [253, 212, 158],
    [253, 187, 132],
    [252, 141, 89],
    [239, 101, 72],
    [215, 48, 31],
    [153, 0, 0]      // Very dark (hottest)
];

// Legend component (automatically adapts to the color range above)
const HeatmapLegend = () => {
    const gradient = `linear-gradient(to right, ${
        HEATMAP_COLOR_RANGE.map(c => `rgb(${c.join(',')})`).join(',')
    })`;

    return (
        <div
            className="absolute bottom-32 right-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl shadow-xl border border-white/50 z-[400] w-48 animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#ef6548] animate-pulse"></div>
                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">
                    Intensity
                </span>
            </div>

            {/* Gradient Bar */}
            <div className="h-2 w-full rounded-full shadow-inner mb-1" style={{background: gradient}}/>

            <div className="flex justify-between text-[9px] text-slate-400 font-mono font-medium">
                <span>Low</span>
                <span>High</span>
            </div>
        </div>
    );
};

// --- 3. Main Component ---
const DynamicMap = ({
                        searchResults,
                        showLayer1, showLayer2, showLayer3,
                        opacity = 70, // Default value 70 (0-100 scale)
                        activeLocation,
                        onMarkerClick,
                        mapId,
                        // 3D Heatmap props
                        show3DHeatmap,
                        heatmapData
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

    // --- Core Logic: Auto Tilt ---
    // Automatically adjust pitch when toggling 3D mode
    useEffect(() => {
        const map = mapRef.current?.getMap();
        if (map) {
            if (show3DHeatmap) {
                // Enable 3D: Tilt to 50 degrees, slight rotation for better 3D depth
                map.easeTo({pitch: 50, bearing: 10, duration: 1000});
            } else {
                // Disable 3D: Restore top-down view
                map.easeTo({pitch: 0, bearing: 0, duration: 1000});
            }
        }
    }, [show3DHeatmap]);

    // Calculate safe opacity (0.0 - 1.0)
    const safeOpacity = useMemo(() => {
        let val = opacity;
        if (Array.isArray(val)) val = val[0];
        val = Number(val);
        if (isNaN(val)) val = 70;
        val = Math.min(100, Math.max(0, val));
        return val / 100;
    }, [opacity]);

    // Effect specifically for real-time opacity updates
    // This is more performant than updating the entire mapStyle object as it prevents tile reloading
    useEffect(() => {
        const map = mapRef.current?.getMap();
        // Ensure map is loaded and layer exists
        if (map && map.getLayer('historical-layer')) {
            map.setPaintProperty('historical-layer', 'raster-opacity', safeOpacity);
        }
    }, [safeOpacity, mapRef]);

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
            // Historical Map Layer
            ...(showLayer1 && mapId ? [{
                id: 'historical-layer',
                type: 'raster',
                source: 'historical-map',
                paint: {
                    // Initial render uses safeOpacity, subsequent updates use setPaintProperty
                    'raster-opacity': safeOpacity,
                    'raster-fade-duration': 0 // Set to 0 for responsive sliding
                }
            }] : [])
        ]
        // Critical: safeOpacity is excluded from dependencies to prevent full style re-computation during slider interaction
    }), [activeTileUrl, showLayer1, mapId]);

    // --- Core Logic: Construct DeckGL Layers ---
    const deckLayers = useMemo(() => {
        if (!show3DHeatmap) return [];

        const data = (heatmapData && heatmapData.length > 0) ? heatmapData : searchResults;

        return [
            new HexagonLayer({
                id: 'heatmap-3d-layer',
                data: data,
                getPosition: d => [d.lng, d.lat],

                // --- Height Calculation Logic ---

                // Use getElevationValue to manually control height algorithm
                getElevationValue: (points) => {
                    // A. Calculate total score for all points in this hexagon
                    const totalScore = points.reduce((sum, p) => sum + (p.score || 1), 0);

                    // B. Use logarithmic smoothing (Math.log2)
                    // Adding 1 prevents log(0) and ensures minimum height.
                    // This compresses high values so lower values remain visible.
                    return Math.log2(totalScore + 1);
                },

                // --- Physical Parameters ---
                radius: 25,
                // Since log values are small (0~15), use a larger scale
                elevationScale: 8,
                // Hard cap to prevent extreme outliers
                elevationRange: [0, 400],

                extruded: true,
                pickable: true,

                // --- Color & Material ---
                colorRange: HEATMAP_COLOR_RANGE,
                opacity: 1,
                coverage: 0.9,

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
                dragRotate={true}       // Allow rotation
                pitchWithRotate={true}  // Allow pitch change during rotation
                touchZoomRotate={true}
            >
                <NavigationControl position="top-right" showCompass={true} visualizePitch={true}/>

                {/* --- 1. DeckGL Overlay (3D Heatmap) --- */}
                <DeckGLOverlay layers={deckLayers}/>

                {/* --- 2. Markers (Only shown when 3D Heatmap is off) --- */}
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

                <MapController activeLocation={activeLocation} mapRef={mapRef}/>
            </Map>

            {show3DHeatmap && <HeatmapLegend/>}
        </div>
    );
};

export default DynamicMap;