import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

function ClickHandler({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null;
}

export default function MapSelector({ onSelect }) {
  return (
    <MapContainer center={[42, 23]} zoom={6}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ClickHandler onSelect={onSelect} />
    </MapContainer>
  );
}