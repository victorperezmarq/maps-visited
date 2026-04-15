'use client'

import { useMapEvents } from 'react-leaflet'

type Props = {
    onSeleccionar: (lat: number, lng: number) => void
    activo: boolean
}

export default function SeleccionarUbicacion({ onSeleccionar, activo }: Props) {
    useMapEvents({
        click(e) {
            if (activo) {
                onSeleccionar(e.latlng.lat, e.latlng.lng)
            }
        },
    })
    return null
}