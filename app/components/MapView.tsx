"use client";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";

export type StopCoord = {
  id: number;
  name: string;
  address: string;
  coords: [number, number];
  short: boolean;
};

function stopIcon(label: string | number, highlight = false) {
  const bg = highlight
    ? "oklch(45% 0.15 145)"
    : "oklch(30% 0.04 60)";
  return L.divIcon({
    html: `<div style="width:30px;height:30px;border-radius:50%;background:${bg};color:#fff;font-weight:700;font-size:12px;display:flex;align-items:center;justify-content:center;border:2.5px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.35);">${label}</div>`,
    className: "",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -18],
  });
}

type Props = {
  stops: StopCoord[];
  mode: "short" | "full";
};

const START: [number, number] = [50.8530, 4.3484];

export default function MapView({ stops, mode }: Props) {
  const visible = mode === "short" ? stops.filter((s) => s.short) : stops;
  const routeCoords: [number, number][] = [START, ...visible.map((s) => s.coords)];

  return (
    <MapContainer
      center={[50.8425, 4.3495]}
      zoom={15}
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom
      zoomControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Sainte-Catherine — point de départ */}
      <Marker position={START} icon={stopIcon("SC", true)}>
        <Popup>
          <strong>Départ</strong>
          <br />
          <span style={{ fontSize: 12, color: "#666" }}>Sainte-Catherine</span>
        </Popup>
      </Marker>

      {/* Tracé du parcours */}
      <Polyline
        positions={routeCoords}
        color="oklch(30% 0.04 60)"
        weight={3}
        opacity={0.45}
        dashArray="8 6"
      />

      {/* Marqueurs des arrêts */}
      {visible.map((stop) => (
        <Marker
          key={stop.id}
          position={stop.coords}
          icon={stopIcon(stop.id)}
        >
          <Popup>
            <strong style={{ fontSize: 14 }}>{stop.name}</strong>
            <br />
            <span style={{ fontSize: 12, color: "#888" }}>{stop.address}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
