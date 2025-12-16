import {useControl} from 'react-map-gl/maplibre';
import {MapboxOverlay} from '@deck.gl/mapbox';

export default function DeckGLOverlay(props) {
    // useControl inserts Deck.gl as a native MapLibre control
    // interleaved: true allows DeckGL layers to mix with map layers (controlled by z-index)
    const overlay = useControl(() => new MapboxOverlay({
        interleaved: true,
        ...props
    }));

    // Real-time update of the overlay when props (e.g., layers) change
    overlay.setProps(props);

    return null;
}