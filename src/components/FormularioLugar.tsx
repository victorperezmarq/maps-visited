'use client'

import { useState } from 'react'
import { LugarInsert } from '@/types/lugar'

type Props = {
    latitud: number
    longitud: number
    onGuardar: (lugar: LugarInsert) => void
    onCancelar: () => void
}

export default function FormularioLugar({ latitud, longitud, onGuardar, onCancelar }: Props) {
    const [form, setForm] = useState<LugarInsert>({
        nombre: '',
        descripcion: '',
        categoria: 'ciudad',
        valoracion: null,
        latitud,
        longitud,
        foto_url: null,
        estado: 'visitado',
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!form.nombre.trim()) return
        onGuardar(form)
    }

    return (
        <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-xl shadow-xl p-5 w-80">
            <h2 className="text-base font-semibold mb-4">📍 Nuevo lugar</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                <input
                    name="nombre"
                    placeholder="Nombre del lugar *"
                    value={form.nombre}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <textarea
                    name="descripcion"
                    placeholder="Descripción (opcional)"
                    value={form.descripcion ?? ''}
                    onChange={handleChange}
                    rows={2}
                    className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />

                <select
                    name="categoria"
                    value={form.categoria}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="ciudad">🏙️ Ciudad</option>
                    <option value="naturaleza">🌿 Naturaleza</option>
                    <option value="gastronomia">🍽️ Gastronomía</option>
                    <option value="cultura">🏛️ Cultura</option>
                    <option value="otro">📌 Otro</option>
                </select>

                <select
                    name="estado"
                    value={form.estado}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="visitado">✅ Visitado</option>
                    <option value="pendiente">⏳ Pendiente</option>
                </select>

                <select
                    name="valoracion"
                    value={form.valoracion ?? ''}
                    onChange={e => setForm(prev => ({ ...prev, valoracion: e.target.value ? Number(e.target.value) : null }))}
                    className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">Sin valoración</option>
                    <option value="1">⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="5">⭐⭐⭐⭐⭐</option>
                </select>

                <p className="text-xs text-gray-400">
                    📌 {latitud.toFixed(4)}, {longitud.toFixed(4)}
                </p>

                <div className="flex gap-2 mt-1">
                    <button
                        type="submit"
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 text-sm font-medium transition-colors"
                    >
                        Guardar
                    </button>
                    <button
                        type="button"
                        onClick={onCancelar}
                        className="flex-1 border hover:bg-gray-50 rounded-lg py-2 text-sm transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}