'use client';

import {useState} from 'react';
import dynamic from 'next/dynamic';
import {SearchControl} from '@/components/Map/SearchControl';
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription} from "@/components/ui/sheet";
import {Slider} from "@/components/ui/slider";
import {ResultsSidebar} from "@/components/Map/ResultsSidebar";
import {LocationDetailsSheet} from "@/components/Map/LocationDetailsSheet";

// 动态导入地图组件
const MapComponent = dynamic(
    () => import('@/components/Map/DynamicMap'),
    {
        ssr: false,
        loading: () => (
            <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
                <div className="text-slate-500 animate-pulse">Loading Map...</div>
            </div>
        )
    }
);

export default function Home() {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);

    // 交互状态
    const [activeLocation, setActiveLocation] = useState(null); // 用于控制地图缩放/高亮

    // 图层和透明度状态
    const [layers, setLayers] = useState({
        history: false,
        pins: true,
        heatmap: false
    });
    const [opacity, setOpacity] = useState([70]);

    // 🔍 核心修改：对接真实后端 API
    // 🔍 修改 handleSearch 为 POST 请求
    const handleSearch = async (query) => {
        setIsLoading(true);

        try {
            // 1. 接口地址 (注意：现在不需要在 URL 后面拼 ?query=xxx 了)
            const apiUrl = "http://localhost:8000/api/v1/search/text";

            // 2. 发起 POST 请求
            const response = await fetch(apiUrl, {
                method: "POST", // 🔥 指定为 POST
                headers: {
                    "Content-Type": "application/json", // 🔥 告诉后端发送的是 JSON 数据
                },
                body: JSON.stringify({
                    query: query

                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // 4. 解析结果 (逻辑保持不变)
            const result = await response.json();

            if (result.status === 'success' && Array.isArray(result.data)) {
                const adaptedResults = result.data.map((item) => ({
                    id: item.id,
                    lat: item.lat,
                    lon: item.lng, // 后端是 lng，前端组件用 lon
                    score: item.score,
                    content: `Location (ID: ${item.id.slice(0, 8)}...)`,
                    fullData: item,
                    pixel_coords: item.pixel_coords
                }));
                setSearchResults(adaptedResults);
            } else {
                setSearchResults([]);
            }

        } catch (error) {
            console.error("Search failed:", error);
            // alert("Search failed"); // 可选：出错弹窗
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

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
        <main className="relative w-screen h-screen overflow-hidden bg-slate-50">

            {/* 搜索栏 */}
            <SearchControl onSearch={handleSearch} isLoading={isLoading}/>

            {/* 左侧：结果列表侧边栏 (新增) */}
            <ResultsSidebar
                results={searchResults}
                onSelect={handleResultClick}
                activeId={activeLocation?.id} // 传入 activeId 用于高亮列表项
            />

            {/* Bottom Center: Control Panel (Redesigned as a Dock) */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[1000] flex gap-4 items-end">

                {/* Main Control Card */}
                <div
                    className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white/20 transition-all hover:scale-[1.01] flex items-center gap-6">

                    {/* Section 1: Opacity Slider */}
                    <div className="flex flex-col gap-2 w-48">
                        <div
                            className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <span>Time Travel</span>
                            <span className="text-blue-600">{opacity}%</span>
                        </div>
                        <Slider
                            defaultValue={[70]}
                            max={100}
                            step={1}
                            value={opacity}
                            onValueChange={setOpacity}
                            className="cursor-pointer"
                        />
                    </div>

                    {/* Vertical Divider */}
                    <div className="h-8 w-px bg-slate-200"></div>

                    {/* Section 2: Layer Toggles (Horizontal Grid) */}
                    <div className="flex gap-4">
                        {/* History Toggle */}
                        <label className="flex flex-col items-center gap-1 cursor-pointer group">
                            <div
                                className={`w-10 h-6 rounded-full p-1 transition-colors ${layers.history ? 'bg-blue-600' : 'bg-slate-200'}`}>
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${layers.history ? 'translate-x-4' : 'translate-x-0'}`}></div>
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={layers.history}
                                onChange={e => setLayers({...layers, history: e.target.checked})}
                            />
                            <span
                                className="text-[10px] font-medium text-slate-500 group-hover:text-blue-600">Overlay</span>
                        </label>

                        {/* Pins Toggle */}
                        <label className="flex flex-col items-center gap-1 cursor-pointer group">
                            <div
                                className={`w-10 h-6 rounded-full p-1 transition-colors ${layers.pins ? 'bg-red-500' : 'bg-slate-200'}`}>
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${layers.pins ? 'translate-x-4' : 'translate-x-0'}`}></div>
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={layers.pins}
                                onChange={e => setLayers({...layers, pins: e.target.checked})}
                            />
                            <span
                                className="text-[10px] font-medium text-slate-500 group-hover:text-red-600">Markers</span>
                        </label>

                        {/* Heatmap Toggle */}
                        <label className="flex flex-col items-center gap-1 cursor-pointer group">
                            <div
                                className={`w-10 h-6 rounded-full p-1 transition-colors ${layers.heatmap ? 'bg-orange-500' : 'bg-slate-200'}`}>
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${layers.heatmap ? 'translate-x-4' : 'translate-x-0'}`}></div>
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={layers.heatmap}
                                onChange={e => setLayers({...layers, heatmap: e.target.checked})}
                            />
                            <span
                                className="text-[10px] font-medium text-slate-500 group-hover:text-orange-600">Heatmap</span>
                        </label>
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
            <MapComponent
                searchResults={searchResults}
                showLayer1={layers.history}
                showLayer2={layers.pins}
                showLayer3={layers.heatmap}
                opacity={opacity[0] / 100}
                activeLocation={activeLocation}
                onMarkerClick={handleMarkerClick}
            />

        </main>
    );
}