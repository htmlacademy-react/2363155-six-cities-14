import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/usemap';
import { OfferType } from '../../types/offer-type';
import { Location } from '../../types/location';

type IconConfig = {
  url: string;
  width: number;
  height: number;
  anchorX: number;
  anchorY: number;
}

const defaultIconConfig : IconConfig = {
  url: 'img/pin.svg',
  width: 28,
  height: 40,
  anchorX: 14,
  anchorY: 40,
};

const activeIconConfig : IconConfig = {
  url: 'img/pin-active.svg',
  width: 28,
  height: 40,
  anchorX: 14,
  anchorY: 40,
};

function createIcon(config: IconConfig) {
  return new Icon ({
    iconUrl: config.url,
    iconSize: [config.width, config.height],
    iconAnchor: [config.anchorX, config.anchorY],
  });
}

type MapProps = {
  location: Location;
  offers: OfferType[];
  specialOfferId: number | null;
}

export default function Map ({location, offers, specialOfferId} : MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map) {
      map.setView([location.latitude, location.longitude], location.zoom);
    }
  }, [map, location]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      offers.forEach((offer : OfferType) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            offer.id === specialOfferId
              ? createIcon(activeIconConfig)
              : createIcon(defaultIconConfig)
          ).addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, specialOfferId]);

  return <section className="cities__map map" ref={mapRef}/>;
}
