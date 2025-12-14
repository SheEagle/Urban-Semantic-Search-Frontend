'use client';

import {useState, useMemo} from 'react';
import {Slider} from "@/components/ui/slider";

export function TimelineControl({data, onFilterChange}) {
    const MIN_YEAR = 1000;
    const MAX_YEAR = 2024;
    // 桶的数量：稍微减少一点，让单个柱子宽一点，看起来更像“积木”而不是“头发丝”
    const BUCKET_COUNT = 80;

    const [range, setRange] = useState([MIN_YEAR, MAX_YEAR]);
    const [hoverInfo, setHoverInfo] = useState(null); // 存储鼠标悬停的年份信息

    const histogramData = useMemo(() => {
        const buckets = new Array(BUCKET_COUNT).fill(0);
        const step = (MAX_YEAR - MIN_YEAR) / BUCKET_COUNT;
        let maxCount = 0;
        let validItemCount = 0;

        // 1. 数据归桶
        data.forEach(item => {
            // 强力解析年份
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

        // 2. 计算高度 (优化视觉)
        return buckets.map(count => {
            if (count === 0) return 0;

            // 🔥 视觉优化核心：
            // 如果总数据很少 (<50条)，不要按比例缩放，直接给满高 (1.0)，让它非常显眼。
            // 否则，保证最小高度 40%，剩下的按比例 (Log scale) 增长。
            if (validItemCount < 50) return 0.8; // 80% 高度

            // 对数缩放：防止大数压扁小数
            const logValue = Math.log(count + 1);
            const logMax = Math.log(maxCount + 1);
            // 基础高度 30% + 动态高度 70%
            return 0.3 + (logValue / logMax) * 0.7;
        });
    }, [data]);

    const handleSliderChange = (newRange) => {
        setRange(newRange);
        onFilterChange(newRange);
    };

    return (
        <div className="flex flex-col justify-end h-full w-full relative group select-none">

            {/* 1. 悬浮提示 (Tooltip) - 当鼠标滑过柱子时显示 */}
            {hoverInfo && (
                <div
                    className="absolute -top-8 bg-slate-900 text-white text-[10px] px-2 py-1 rounded pointer-events-none transform -translate-x-1/2 z-50 shadow-md font-mono whitespace-nowrap"
                    style={{left: `${hoverInfo.pos}%`}}
                >
                    {hoverInfo.year} ({hoverInfo.count})
                </div>
            )}

            {/* 2. 顶部年份指示器 (静态) */}
            <div className="flex justify-between text-[9px] font-mono font-bold text-slate-400 mb-1 px-1">
                <span>{range[0]}</span>
                {/* 如果有范围筛选，显示跨度 */}
                <span
                    className={`text-orange-600 transition-opacity ${range[0] === MIN_YEAR && range[1] === MAX_YEAR ? 'opacity-0' : 'opacity-100'}`}>
                    {range[1] - range[0]} Years
                </span>
                <span>{range[1]}</span>
            </div>

            {/* 3. 直方图区域 */}
            {/* h-10 (40px) 高度适中，不会太占地，但也足够显示高低差异 */}
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
                                count: 'Data' // 这里简化显示，如果需要精确数量可以在 histogramData 里存对象
                            })}
                            onMouseLeave={() => setHoverInfo(null)}
                            className={`
                                flex-1 rounded-t-[1px] transition-all duration-300
                                ${hasData
                                ? (isActive ? 'bg-orange-500' : 'bg-orange-200') // 激活橙色，未激活浅橙
                                : 'bg-slate-200/50' // 无数据：极浅灰色轨道
                            }
                            `}
                            style={{
                                // 🔥 高度控制：
                                // 有数据：按计算高度 (至少 40% 或 80%)
                                // 无数据：固定 2px 作为一个底座轨道
                                height: hasData ? `${height * 100}%` : '2px',
                                // 如果是激活状态的有数据柱子，稍微加一点阴影
                                boxShadow: (hasData && isActive) ? '0 0 4px rgba(249, 115, 22, 0.4)' : 'none'
                            }}
                        />
                    );
                })}
            </div>

            {/* 4. 精致版滑块 */}
            {/* - mt-[-6px]: 向上负边距，让滑块轴线紧贴柱子底部
               - [&>.relative]:h-1.5 : 强行修改 Slider 内部轨道的粗细 (变细)
               - [&_span]:h-3 [&_span]:w-3 : 强行修改滑块手柄的大小 (变小)
            */}
            <div className="px-1 relative z-10 mt-[-5px]">
                <Slider
                    defaultValue={[MIN_YEAR, MAX_YEAR]}
                    min={MIN_YEAR}
                    max={MAX_YEAR}
                    step={1}
                    value={range}
                    onValueChange={handleSliderChange}
                    // 🔥 使用 Tailwind 任意值语法深度定制 Slider 样式
                    // 让轨道变透明(invisible)，只显示两个手柄，看起来像在柱子底部滑动的卡尺
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