import {useControl} from 'react-map-gl/maplibre';
import {MapboxOverlay} from '@deck.gl/mapbox';

export default function DeckGLOverlay(props) {
    // useControl 将 Deck.gl 作为一个 MapLibre 的原生控件插入
    // interleaved: true 允许 DeckGL 图层和地图图层混合 (z-index 控制)
    const overlay = useControl(() => new MapboxOverlay({
        interleaved: true,
        ...props
    }));

    // 当 props (比如 layers) 改变时，实时更新 overlay
    overlay.setProps(props);

    return null;
}