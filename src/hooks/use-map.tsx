import {useEffect, useState, useRef, MutableRefObject} from 'react';
import { Location } from '../types/location';
import {Map, TileLayer} from 'leaflet';

const TILE_LAYER = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export default function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  location: Location
) : Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current && !isRenderedRef.current) {
      const instanse = new Map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });

      const layer = new TileLayer(TILE_LAYER, {
        attribution: ATTRIBUTION }
      );

      instanse.addLayer(layer);
      setMap(instanse);
      isRenderedRef.current = true;
    }
  }, [mapRef, location]);

  return map;
}
