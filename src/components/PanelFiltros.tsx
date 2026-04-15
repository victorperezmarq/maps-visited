'use client'

import { Filtros } from '@/hooks/useFiltros'

type Props = {
    filtros: Filtros
    onChange: (key: keyof Filtros, value: string) => void
    onReset: () => void
    hayFiltrosActivos: boolean
    totalVisible: number
    totalTotal: number
}

export default function PanelFiltros({
    filtros, onChange, onReset, hayFiltrosActivos, totalVisible, totalTotal
}: Props) {
    return (
        <div className="flex flex-wrap items-center gap-2 px-1">

            {/* Categoría */}
            <select
                value={filtros.categoria}
                onChange={e => onChange('categoria', e.target.value)}
                className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            >
                <option value="todas">🗂️ Todas las categorías</option>
                <option value="ciudad">🏙️ Ciudad</option>
                <option value="naturaleza">🌿 Naturaleza</option>
                <option value="gastronomia">🍽️ Gastronomía</option>
                <option value="cultura">🏛️ Cultura</option>
                <option value="otro">📌 Otro</option>
            </select>

            {/* Estado */}
            <select
                value={filtros.estado}
                onChange={e => onChange('estado', e.target.value)}
                className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            >
                <option value="todos">📍 Todos los estados</option>
                <option value="visitado">✅ Visitado</option>
                <option value="pendiente">⏳ Pendiente</option>
            </select>

            {/* Valoración */}
            <select
                value={filtros.valoracion}
                onChange={e => onChange('valoracion', e.target.value)}
                className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            >
                <option value="todas">⭐ Cualquier valoración</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="2">⭐⭐</option>
                <option value="1">⭐</option>
            </select>

            {/* Contador */}
            <span className="text-sm text-gray-400 ml-1">
                {totalVisible === totalTotal
                    ? `${totalTotal} lugares`
                    : `${totalVisible} de ${totalTotal}`}
            </span>

            {/* Reset */}
            {hayFiltrosActivos && (
                <button
                    onClick={onReset}
                    className="text-sm text-red-400 hover:text-red-600 underline transition-colors"
                >
                    Limpiar filtros
                </button>
            )}

        </div>
    )
}