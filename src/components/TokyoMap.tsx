import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { Apartment } from '../types';

interface MapControllerProps {
  center: { lat: number; lng: number };
  zoom: number;
}

function MapController({ center, zoom }: MapControllerProps) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([center.lat, center.lng], zoom, { duration: 1.5 });
  }, [center.lat, center.lng, zoom, map]);
  return null;
}

function createIcon(isHighlighted: boolean) {
  return L.divIcon({
    className: '',
    html: `<div class="${isHighlighted ? 'marker-highlighted' : 'marker-default'}"></div>`,
    iconSize: isHighlighted ? [16, 16] : [12, 12],
    iconAnchor: isHighlighted ? [8, 8] : [6, 6],
  });
}

interface Props {
  apartments: Apartment[];
  center: { lat: number; lng: number; zoom: number };
  highlightedId: number | null;
}

export function TokyoMap({ apartments, center, highlightedId }: Props) {
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={center.zoom}
      className="h-full w-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController center={center} zoom={center.zoom} />
      {apartments.map(apt => (
        <Marker
          key={apt.id}
          position={[apt.lat, apt.lng]}
          icon={createIcon(apt.id === highlightedId)}
        >
          <Popup>
            <div className="text-sm">
              <strong>{apt.name}</strong><br />
              ¥{apt.price.toLocaleString()}/mo &middot; {apt.bedrooms}BR &middot; {apt.size_sqm}m²
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
