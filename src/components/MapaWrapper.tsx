'use client'

import dynamic from 'next/dynamic'
import { Lugar, LugarInsert } from '@/types/lugar'

const Mapa = dynamic(() => import('./Mapa'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
            <p className="text-gray-400">Cargando mapa...</p>
        </div>
    ),
})

type Props = {
    lugares: Lugar[]
    onCrear: (lugar: LugarInsert) => void
    onBorrar: (id: string) => void
}

export default function MapaWrapper({ lugares, onCrear, onBorrar }: Props) {
    return <Mapa lugares={lugares} onCrear={onCrear} onBorrar={onBorrar} />
}