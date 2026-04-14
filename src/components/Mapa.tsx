'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import '@/lib/leaflet-fix'
import { Lugar } from '@/types/lugar'

type Props = {
    lugares: Lugar[]
}

export default function Mapa({ lugares }: Props) {
    return (
        <MapContainer
            center={[40.4168, -3.7038]} // Madrid por defecto
            zoom={6}
            className="w-full h-full rounded-xl"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {lugares.map((lugar) => (
                <Marker
                    key={lugar.id}
                    position={[lugar.latitud, lugar.longitud]}
                >
                    <Popup>
                        <div className="flex flex-col gap-1">
                            <p className="font-semibold text-sm">{lugar.nombre}</p>
                            {lugar.descripcion && (
                                <p className="text-xs text-gray-500">{lugar.descripcion}</p>
                            )}
                            <span className={`text-xs px-2 py-0.5 rounded-full w-fit
                ${lugar.estado === 'visitado'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                {lugar.estado}
                            </span>
                            {lugar.valoracion && (
                                <p className="text-xs">{'⭐'.repeat(lugar.valoracion)}</p>
                            )}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}