'use client'

import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import '@/lib/leaflet-fix'
import { Lugar, LugarInsert } from '@/types/lugar'
import SeleccionarUbicacion from './SeleccionarUbicacion'
import FormularioLugar from './FormularioLugar'

type Props = {
    lugares: Lugar[]
    onCrear: (lugar: LugarInsert) => void
    onBorrar: (id: string) => void
}

export default function Mapa({ lugares, onCrear, onBorrar }: Props) {
    const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState<{ lat: number; lng: number } | null>(null)
    const [modoAnadir, setModoAnadir] = useState(false)

    function handleClickMapa(lat: number, lng: number) {
        setUbicacionSeleccionada({ lat, lng })
        setModoAnadir(false)
    }

    async function handleGuardar(lugar: LugarInsert) {
        await onCrear(lugar)
        setUbicacionSeleccionada(null)
    }

    return (
        <div className="relative w-full h-full">

            {/* Botón añadir */}
            <div className="absolute top-4 right-4 z-[1000]">
                <button
                    onClick={() => setModoAnadir(prev => !prev)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium shadow transition-colors ${modoAnadir
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                >
                    {modoAnadir ? '✕ Cancelar' : '+ Añadir lugar'}
                </button>
                {modoAnadir && (
                    <p className="text-xs text-gray-600 bg-white px-2 py-1 rounded-lg shadow mt-1 text-center">
                        Haz clic en el mapa
                    </p>
                )}
            </div>

            <MapContainer
                center={[40.4168, -3.7038]}
                zoom={6}
                className="w-full h-full rounded-xl"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <SeleccionarUbicacion
                    activo={modoAnadir}
                    onSeleccionar={handleClickMapa}
                />

                {lugares.map((lugar) => (
                    <Marker key={lugar.id} position={[lugar.latitud, lugar.longitud]}>
                        <Popup>
                            <div className="flex flex-col gap-1 min-w-32">
                                <p className="font-semibold text-sm">{lugar.nombre}</p>
                                {lugar.descripcion && (
                                    <p className="text-xs text-gray-500">{lugar.descripcion}</p>
                                )}
                                <span className={`text-xs px-2 py-0.5 rounded-full w-fit ${lugar.estado === 'visitado'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {lugar.estado}
                                </span>
                                {lugar.valoracion && (
                                    <p className="text-xs">{'⭐'.repeat(lugar.valoracion)}</p>
                                )}
                                <button
                                    onClick={() => onBorrar(lugar.id)}
                                    className="text-xs text-red-400 hover:text-red-600 text-left mt-1"
                                >
                                    🗑️ Eliminar
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Formulario al hacer clic */}
            {ubicacionSeleccionada && (
                <FormularioLugar
                    latitud={ubicacionSeleccionada.lat}
                    longitud={ubicacionSeleccionada.lng}
                    onGuardar={handleGuardar}
                    onCancelar={() => setUbicacionSeleccionada(null)}
                />
            )}
        </div>
    )
}