'use client';

import {useControl} from 'react-map-gl/maplibre';
import {MapboxOverlay} from '@deck.gl/mapbox';
import {HexagonLayer} from '@deck.gl/aggregation-layers';

export default function DeckGLOverlay({data, visible}) {
    // 使用 useControl 将 DeckGL 作为一个 MapLibre 的 Control 注入
    // 这样它会自动同步坐标、缩放、倾斜和旋转，性能极佳
    const overlay = useControl(() => new MapboxOverlay({
        interleaved: true // 允许 DeckGL 图层和 MapLibre 图层混合渲染
    }));

    // 配置 Layer
    const layer = new HexagonLayer({
        id: 'heatmap-3d-hexagon',
        data: data,
        pickable: true,
        extruded: true, // 开启 3D
        radius: 30,     // 半径 (米)
        elevationScale: 4,
        getPosition: d => [d.lng, d.lat], // 注意 DeckGL 用 lng, lat 顺序

        // 颜色配置 (Deep Ocean Theme)
        colorRange: [
            [200, 220, 240], // 浅蓝
            [115, 160, 200],
            [42, 67, 89],    // Deep Ocean
            [218, 165, 32],  // Time Gold (亮)
            [184, 134, 11]   // Time Gold (暗)
        ],

        // 权重计算
        getElevationWeight: d => d.score || 1,
        elevationAggregation: 'SUM',

        material: {
            ambient: 0.64,
            diffuse: 0.6,
            shininess: 32,
            specularColor: [51, 51, 51]
        },

        transitions: {
            elevationScale: 1000
        },

        visible: visible
    });

    // 更新图层
    overlay.setProps({
        layers: [layer]
    });

    return null;
}