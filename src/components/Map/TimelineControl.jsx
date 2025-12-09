'use client';

import { useState, useMemo } from 'react';
import { Slider } from "@/components/ui/slider";

export function TimelineControl({ data, onFilterChange }) {
    const MIN_YEAR = 1000;
    const MAX_YEAR = 2024;

    // 🔥 核心改动 1: 极大增加柱子数量
    // 1024年 / 256 ≈ 4年/柱。
    // 这样的密度下，滑块稍微一动，柱子就会立即变色，视觉反馈非常精准。
    const BUCKET_COUNT = 256;

    const [range, setRange] = useState([MIN_YEAR, MAX_YEAR]);

    // 1. 计算高精度直方图
    const histogramData = useMemo(() => {
        const buckets = new Array(BUCKET_COUNT).fill(0);
        const step = (MAX_YEAR - MIN_YEAR) / BUCKET_COUNT;

        data.forEach(item => {
            let year = item.fullData?.year || item.year;
            year = parseInt(year);

            if (!isNaN(year) && year >= MIN_YEAR && year <= MAX_YEAR) {
                const bucketIndex = Math.floor((year - MIN_YEAR) / step);
                const safeIndex = Math.min(bucketIndex, BUCKET_COUNT - 1);
                buckets[safeIndex]++;
            }
        });

        // 归一化
        const maxCount = Math.max(...buckets, 1);
        return buckets.map(count => count / maxCount);
    }, [data]);

    const handleSliderChange = (newRange) => {
        setRange(newRange);
        onFilterChange(newRange);
    };

    return (
        <div className="flex flex-col justify-end h-full w-full px-1 relative group select-none">

            {/* 顶部数字 (动态显示选中范围) */}
            <div className="flex justify-between items-end mb-2 text-[10px] font-mono font-bold">
                {/* 选中的起始年份 (高亮) */}
                <div className="text-orange-600 bg-orange-50 px-1 rounded border border-orange-100">
                    {range[0]}
                </div>

                <div className="text-slate-300 uppercase tracking-widest font-sans text-[9px] pb-0.5">
                    <span className="text-orange-500 mr-1 text-sm font-bold">{data.length}</span>
                    Records
                </div>

                {/* 选中的结束年份 (高亮) */}
                <div className="text-orange-600 bg-orange-50 px-1 rounded border border-orange-100">
                    {range[1]}
                </div>
            </div>

            {/* 直方图容器 */}
            {/* gap-0: 消除间隙，让它们看起来像连续的波形 */}
            <div className="relative h-12 w-full flex items-end gap-0 mb-[-12px] z-0 px-[1px]">

                {histogramData.map((height, i) => {
                    const step = (MAX_YEAR - MIN_YEAR) / BUCKET_COUNT;

                    // 计算这根细柱子代表的具体年份段
                    // 例如: 1740.0 - 1744.0
                    const barStart = MIN_YEAR + i * step;
                    const barEnd = barStart + step;
                    const barCenter = (barStart + barEnd) / 2;

                    // 🔥 核心改动 3: 严格的高亮逻辑
                    // 只有当 [选区] 完全覆盖了 [柱子中心] 时才亮。
                    // 这样可以避免"滑块刚碰到柱子边缘，柱子亮了，但数据其实还没包进来"的错觉。
                    const isActive = range[1] >= barCenter && range[0] <= barCenter;

                    const renderHeight = height > 0 ? `${height * 100}%` : '2px';

                    return (
                        <div
                            key={i}
                            className={`
                                w-full rounded-t-[1px] transition-colors duration-75
                                ${isActive 
                                    ? (height > 0 ? 'bg-orange-500' : 'bg-orange-200/50') // 选中
                                    : (height > 0 ? 'bg-slate-300' : 'bg-slate-100/50')   // 未选中
                                }
                            `}
                            style={{
                                height: renderHeight,
                                minHeight: '2px'
                            }}
                        />
                    );
                })}
            </div>

            {/* 滑块 */}
            <Slider
                defaultValue={[MIN_YEAR, MAX_YEAR]}
                min={MIN_YEAR}
                max={MAX_YEAR}
                step={1} // 🔥 核心改动 2: 步进为 1，精确控制
                value={range}
                onValueChange={handleSliderChange}
                className="z-20 py-3 relative"
            />

            {/* 底线 */}
            <div className="absolute bottom-4 left-0 right-0 h-px bg-slate-200 -z-10"></div>
        </div>
    );
}