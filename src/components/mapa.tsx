import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { defaultIcon } from "./mapa-icon";
import "leaflet/dist/leaflet.css";
import MapInitializer from "./map-initializer";
import type { RefObject } from "react";
import { Button } from "@/components/ui/button";

export interface MapaProps {
    latitude: number;
    longitude: number;
    endereco?: string
    mapRef: RefObject<L.Map | null>;
}

export function Mapa({
    latitude,
    longitude,
    endereco,
    mapRef
}: MapaProps) {
    return (
        <MapContainer
            ref={mapRef}
            center={[latitude, longitude]}
            zoom={17}
            className="w-full h-[300px]"
            scrollWheelZoom={true}
        >
            <MapInitializer onMapReady={(map) => (mapRef.current = map)} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker icon={defaultIcon} position={[latitude, longitude]} >
                {endereco && (
                    <Popup>
                        {endereco}
                    </Popup>
                )}
            </Marker>
            {latitude && longitude && (
                <Button
                    onClick={() => mapRef.current?.setView([latitude, longitude], 17)}
                    variant="secondary" size="sm"
                    className="absolute bottom-6 right-4 z-[9999] cursor-pointer"
                >
                    Centralizar
                </Button>
            )}
        </MapContainer>
    )
}
