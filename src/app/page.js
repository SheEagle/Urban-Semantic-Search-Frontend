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
            Loading Map...
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