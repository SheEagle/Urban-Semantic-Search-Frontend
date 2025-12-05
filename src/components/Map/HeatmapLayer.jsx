'use client';

import {useEffect} from 'react';
import {useMap} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat'; // 引入热力图插件

const HeatmapLayer = ({points}) => {
    const map = useMap();

    useEffect(() => {
        // 安全检查：如果没有地图实例或没有数据，直接返回
        if (!map || !points || points.length === 0) return;

        // 1. 数据转换：将对象数组转换为数组的数组 [[lat, lon, intensity], ...]
        // 我们使用 score 作为热力图的强度
        const heatData = points.map(p => [p.lat, p.lon, p.score]);

        // 2. 创建热力图层
        const heat = L.heatLayer(heatData, {
            radius: 25,     // 点的半径
            blur: 15,       // 模糊度
            maxZoom: 17,    // 在这个缩放级别下强度达到最大
            max: 1.0,       // 最大强度值
            // 颜色渐变配置：从蓝(低) -> 绿 -> 红(高)
            gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}
        });

        // 3. 添加到地图
        heat.addTo(map);

        // 4. 清理函数：当组件卸载或数据更新时，移除旧图层，防止重复叠加
        return () => {
            // 检查 map 是否还存在 (防止快速切换页面时的报错)
            if (map) {
                map.removeLayer(heat);
            }
        };
    }, [map, points]); // 当 map 或 points 变化时重新运行

    return null; // 这个组件不需要渲染任何 DOM 元素
};

export default HeatmapLayer;