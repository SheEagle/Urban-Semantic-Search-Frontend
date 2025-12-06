'use client';

import {useState, useEffect, useMemo} from 'react';
import {Slider} from "@/components/ui/slider";

export function TimelineControl({data, onFilterChange}) {
    // 假设数据范围，实际应从 data 中计算
    const MIN_YEAR = 1000;
    const MAX_YEAR = 2024;

    // 双向滑块的状态 [start, end]
    const [range, setRange] = useState([MIN_YEAR, MAX_YEAR]);

    // 1. 处理数据：将搜索结果映射到年份直方图
    // (由于目前 API 返回可能没年份，这里模拟一下，实际请用 item.year)
    const histogramData = useMemo(() => {
        const buckets = new Array(50).fill(0); // 分50个柱子
        const step = (MAX_YEAR - MIN_YEAR) / 50;

        data.forEach(item => {
            // ⚠️ 实际项目中请用 item.year || item.fullData.year
            // 这里为了演示效果，根据 ID 生成一个伪随机年份
            const mockYear = 1400 + (item.id.charCodeAt(0) * 10) % 500;

            const bucketIndex = Math.floor((mockYear - MIN_YEAR) / step);
            if (bucketIndex >= 0 && bucketIndex < 50) {
                buckets[bucketIndex]++;
            }
        });

        // 归一化高度以便渲染
        const maxCount = Math.max(...buckets, 1);
        return buckets.map(count => count / maxCount); // 0.0 ~ 1.0
    }, [data]);

    // 当滑块拖动时通知父组件
    const handleSliderChange = (newRange) => {
        setRange(newRange);
        onFilterChange(newRange);
    };

    return (
        <div className="flex flex-col justify-end h-full w-full max-w-lg px-4 relative group">

            {/* 顶部标签 */}
            <div
                className="flex justify-between text-[10px] font-mono text-faded-slate font-bold mb-1 uppercase tracking-widest">
                <span>{range[0]} AD</span>
                <span className="text-time-gold">Temporal Filter</span>
                <span>{range[1]} AD</span>
            </div>

            {/* 直方图容器 */}
            <div
                className="relative h-10 w-full flex items-end justify-between gap-[1px] mb-[-12px] opacity-80 transition-opacity group-hover:opacity-100">
                {histogramData.map((height, i) => {
                    // 计算当前柱子代表的年份
                    const step = (MAX_YEAR - MIN_YEAR) / 50;
                    const barYear = MIN_YEAR + i * step;
                    // 判断柱子是否在选中范围内
                    const isActive = barYear >= range[0] && barYear <= range[1];

                    return (
                        <div
                            key={i}
                            className={`w-full rounded-t-sm transition-all duration-300 ${isActive ? 'bg-deep-ocean' : 'bg-slate-200'}`}
                            style={{
                                height: `${height * 100}%`,
                                minHeight: '4px'
                            }}
                        />
                    );
                })}
            </div>

            {/* 双向滑块组件 */}
            {/* 需要在 globals.css 稍微调整一下 Slider 的 thumb 样式让它更像时间轴指针 */}
            <Slider
                defaultValue={[MIN_YEAR, MAX_YEAR]}
                min={MIN_YEAR}
                max={MAX_YEAR}
                step={10}
                value={range}
                onValueChange={handleSliderChange}
                className="z-10 py-2"
            />
        </div>
    );
}