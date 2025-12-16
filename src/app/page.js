'use client';

import {useState, useMemo, useEffect} from 'react';
import dynamic from 'next/dynamic';
import {SearchControl} from '@/components/Map/SearchControl';
import {ResultsSidebar} from "@/components/Map/ResultsSidebar";
import {LocationDetailsSheet} from "@/components/Map/LocationDetailsSheet";
import {TimelineControl} from '@/components/Map/TimelineControl';
import {MapLayerSelector} from '@/components/Map/MapLayerSelector';
import {LocateFixed, Box} from "lucide-react";

// Dynamically import Map component, disabling SSR for Leaflet/MapLibre compatibility
const MapComponent = dynamic(() => import('@/components/Map/DynamicMap'), {
    ssr: false,
    loading: () => (
        <div
            className="flex h-screen w-screen items-center justify-center bg-[#f0f0f0] text-slate-400 font-mono text-sm">
            Loading Map...
        </div>
    )
});

// Reusable Capsule Button Component
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
    // --- 1. Core Data State ---
    const [rawSearchResults, setRawSearchResults] = useState([]); // Detailed data for 2D list (Top 50)
    const [heatmapData, setHeatmapData] = useState([]);           // Lightweight data for 3D view (Top 2000+)
    const [isLoading, setIsLoading] = useState(false);
    const [lastQuery, setLastQuery] = useState("");               // Track last search query

    // --- 2. Interaction State ---
    const [activeLocation, setActiveLocation] = useState(null);   // Currently highlighted point
    const [selectedLocation, setSelectedLocation] = useState(null); // Point displayed in details sheet

    // --- 3. Filters & Layer State ---
    const [yearRange, setYearRange] = useState([1000, 2024]);
    const [activeMapId, setActiveMapId] = useState(null); // Historical map layer ID
    const [opacity, setOpacity] = useState(0.7);          // Layer opacity (0.0 - 1.0)

    // Toggles
    const [showPins, setShowPins] = useState(true);
    const [show3DHeatmap, setShow3DHeatmap] = useState(false);
    const [isMapSelectorOpen, setIsMapSelectorOpen] = useState(false);

    // --- 4. Core: Fetch 3D Heatmap Data ---
    useEffect(() => {
        // Optimization: Only fetch when 3D is active to save resources
        if (show3DHeatmap) {
            const fetchHeatmap = async () => {
                try {
                    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
                    let url = `${baseUrl}/search/heatmap-data?limit=3000`; // Fetch 3000 points

                    // If a query exists, generate heatmap based on query context
                    if (lastQuery) {
                        url += `&query=${encodeURIComponent(lastQuery)}`;
                    }

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
    }, [show3DHeatmap, lastQuery]);

    // --- 5. Search Logic (2D List) ---
    const handleSearch = async (content, type = 'text') => {
        setIsLoading(true);
        // UX: Disable 3D view when searching to focus on list results
        if (show3DHeatmap) setShow3DHeatmap(false);
        setActiveMapId(null);

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

                // Auto-select first result
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

    // --- 6. Frontend Timeline Filtering ---
    const filteredResults = useMemo(() => {
        return rawSearchResults.filter(item => {
            const itemYear = item.fullData?.year || item.year;
            if (!itemYear) return true; // Keep items with no year
            const y = parseInt(itemYear);
            if (isNaN(y)) return true;
            return y >= yearRange[0] && y <= yearRange[1];
        });
    }, [rawSearchResults, yearRange]);

    return (
        <main className="relative w-screen h-screen overflow-hidden bg-[#f0f0f0]">

            {/* A. Top Search Bar */}
            <SearchControl onSearch={handleSearch} isLoading={isLoading}/>

            {/* B. Left Results Sidebar */}
            <ResultsSidebar
                results={filteredResults}
                onSelect={(loc) => {
                    setActiveLocation(loc);
                    setSelectedLocation(loc);
                }}
                activeId={activeLocation?.id}
                yearRange={yearRange}
            />

            {/* C. Bottom Control Dock */}
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
                    {/* Left: Timeline Control */}
                    <div
                        className="flex-1 h-full min-w-0 pr-4 mr-2 border-r border-slate-200/60 flex flex-col justify-center">
                        <TimelineControl
                            data={rawSearchResults}
                            onFilterChange={setYearRange}
                        />
                    </div>

                    {/* Right: Function Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                        {/* 1. Map Layer Selector */}
                        <MapLayerSelector
                            activeMapId={activeMapId}
                            opacity={opacity}
                            onMapChange={setActiveMapId}
                            onOpacityChange={setOpacity}
                            isOpen={isMapSelectorOpen}
                            onToggle={setIsMapSelectorOpen}
                            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
                        />

                        {/* 2. Toggle Pins */}
                        <ToggleOption
                            active={showPins}
                            label="Pins"
                            icon={LocateFixed}
                            onClick={() => setShowPins(!showPins)}
                        />

                        {/* 3. Toggle 3D View */}
                        <ToggleOption
                            active={show3DHeatmap}
                            label="3D View"
                            icon={Box}
                            onClick={() => setShow3DHeatmap(!show3DHeatmap)}
                        />
                    </div>
                </div>
            </div>

            {/* D. Details Sheet */}
            <LocationDetailsSheet
                location={selectedLocation}
                open={!!selectedLocation}
                onOpenChange={() => setSelectedLocation(null)}
                onShowLayer={(mapId) => {
                    setActiveMapId(mapId); // Activate layer from details
                }}
            />

            {/* E. Main Map Component */}
            <MapComponent
                // 2D Data
                searchResults={filteredResults}
                activeLocation={activeLocation}
                onMarkerClick={(loc) => {
                    setActiveLocation(loc);
                    setSelectedLocation(loc);
                }}

                // Layer Control
                mapId={activeMapId}
                showLayer1={!!activeMapId}
                showLayer2={showPins}
                opacity={opacity * 100} // Convert 0-1 to 0-100 for MapComponent

                // 3D Data
                show3DHeatmap={show3DHeatmap}
                heatmapData={heatmapData}
            />

        </main>
    );
}