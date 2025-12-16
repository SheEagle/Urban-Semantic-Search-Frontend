'use client';

import {useState, useMemo} from 'react';
import {Slider} from "@/components/ui/slider";

export function TimelineControl({data, onFilterChange}) {
    const MIN_YEAR = 1000;
    const MAX_YEAR = 2024;
    // Bucket count: Reduced slightly to make bars wider, looking more like "blocks" than "hairlines"
    const BUCKET_COUNT = 80;

    const [range, setRange] = useState([MIN_YEAR, MAX_YEAR]);
    const [hoverInfo, setHoverInfo] = useState(null);

    const histogramData = useMemo(() => {
        const buckets = new Array(BUCKET_COUNT).fill(0);
        const step = (MAX_YEAR - MIN_YEAR) / BUCKET_COUNT;
        let maxCount = 0;
        let validItemCount = 0;

        // 1. Bucket data
        data.forEach(item => {
            // Robust year parsing
            let rawYear = item.year || item.fullData?.year || item.fullData?.Year;
            if (typeof rawYear === 'string') rawYear = rawYear.split('-')[0];
            const year = parseInt(rawYear);

            if (!isNaN(year) && year >= MIN_YEAR && year <= MAX_YEAR) {
                const bucketIndex = Math.floor((year - MIN_YEAR) / step);
                const safeIndex = Math.min(bucketIndex, BUCKET_COUNT - 1);
                buckets[safeIndex]++;
                if (buckets[safeIndex] > maxCount) maxCount = buckets[safeIndex];
                validItemCount++;
            }
        });

        // 2. Calculate height (visual optimization)
        return buckets.map(count => {
            if (count === 0) return 0;

            // Visual Core:
            // If data is sparse (<50 items), do not scale proportionally; use near-full height (0.8) for visibility.
            // Otherwise, enforce a minimum height base and scale logarithmically.
            if (validItemCount < 50) return 0.8;

            // Logarithmic scale: Prevents large numbers from flattening small ones
            const logValue = Math.log(count + 1);
            const logMax = Math.log(maxCount + 1);

            // Base height 30% + Dynamic height 70%
            return 0.3 + (logValue / logMax) * 0.7;
        });
    }, [data]);

    const handleSliderChange = (newRange) => {
        setRange(newRange);
        onFilterChange(newRange);
    };

    return (
        <div className="flex flex-col justify-end h-full w-full relative group select-none">

            {/* 1. Tooltip - Displayed on hover */}
            {hoverInfo && (
                <div
                    className="absolute -top-8 bg-slate-900 text-white text-[10px] px-2 py-1 rounded pointer-events-none transform -translate-x-1/2 z-50 shadow-md font-mono whitespace-nowrap"
                    style={{left: `${hoverInfo.pos}%`}}
                >
                    {hoverInfo.year} ({hoverInfo.count})
                </div>
            )}

            {/* 2. Top Year Indicator (Static) */}
            <div className="flex justify-between text-[9px] font-mono font-bold text-slate-400 mb-1 px-1">
                <span>{range[0]}</span>
                {/* Show span if filtering is active */}
                <span
                    className={`text-orange-600 transition-opacity ${range[0] === MIN_YEAR && range[1] === MAX_YEAR ? 'opacity-0' : 'opacity-100'}`}>
                    {range[1] - range[0]} Years
                </span>
                <span>{range[1]}</span>
            </div>

            {/* 3. Histogram Area */}
            <div className="relative h-10 w-full flex items-end gap-[2px] px-1">
                {histogramData.map((height, i) => {
                    const step = (MAX_YEAR - MIN_YEAR) / BUCKET_COUNT;
                    const barStart = Math.floor(MIN_YEAR + i * step);
                    const barCenter = barStart + step / 2;
                    const isActive = range[1] >= barCenter && range[0] <= barCenter;
                    const hasData = height > 0;

                    return (
                        <div
                            key={i}
                            onMouseEnter={() => hasData && setHoverInfo({
                                pos: ((i + 0.5) / BUCKET_COUNT) * 100,
                                year: `~${barStart}`,
                                count: 'Data' // Simplified; store objects in histogramData for exact counts
                            })}
                            onMouseLeave={() => setHoverInfo(null)}
                            className={`
                                flex-1 rounded-t-[1px] transition-all duration-300
                                ${hasData
                                ? (isActive ? 'bg-orange-500' : 'bg-orange-200') // Active: Orange, Inactive: Pale
                                : 'bg-slate-200/50' // No Data: Light gray track
                            }
                            `}
                            style={{
                                // Height Control:
                                // Data exists: Calculated height (min 30% or 80%)
                                // No data: Fixed 2px base track
                                height: hasData ? `${height * 100}%` : '2px',
                                // Add slight shadow to active bars with data
                                boxShadow: (hasData && isActive) ? '0 0 4px rgba(249, 115, 22, 0.4)' : 'none'
                            }}
                        />
                    );
                })}
            </div>

            {/* 4. Refined Slider */}
            <div className="px-1 relative z-10 mt-[-5px]">
                <Slider
                    defaultValue={[MIN_YEAR, MAX_YEAR]}
                    min={MIN_YEAR}
                    max={MAX_YEAR}
                    step={1}
                    value={range}
                    onValueChange={handleSliderChange}
                    className="
                        py-2
                        [&>.relative]:h-[2px] [&>.relative]:bg-transparent
                        [&_[role=slider]]:h-3.5 [&_[role=slider]]:w-3.5
                        [&_[role=slider]]:bg-white [&_[role=slider]]:border-2 [&_[role=slider]]:border-slate-800
                        [&_[role=slider]]:shadow-sm [&_[role=slider]]:focus:ring-0
                        [&_[data-orientation=horizontal]]:bg-orange-500/20
                    "
                />
            </div>

        </div>
    );
}