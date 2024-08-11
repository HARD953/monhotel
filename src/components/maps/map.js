"use client";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const center = { lat: 5.345317, lng: -4.024429 };

// Custom marker icon
const markerIcon = L.icon({
  iconUrl: "/leaflet/images/marker-icon.png",
  shadowUrl: "/leaflet/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapContainerMain({ largeurViewport, data }) {
  const [position, setPosition] = useState(center);

  useEffect(() => {
    const etablissement = data?.etablissement;
    setPosition({
      lat: etablissement?.latitude || center.lat,
      lng: etablissement?.longitude || center.lng,
    });
  }, [data]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "calc(60vh - 32px)", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={markerIcon} draggable={false} position={position}>
        {/* <Popup minWidth={90}>
          <p>Test</p>
        </Popup> */}
      </Marker>
    </MapContainer>
  );
}
