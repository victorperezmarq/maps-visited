'use client'

import { useState, useEffect } from 'react'
import { Lugar, LugarInsert } from '@/types/lugar'

export function useLugares() {
    const [lugares, setLugares] = useState<Lugar[]>([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        fetchLugares()
    }, [])

    async function fetchLugares() {
        const res = await fetch('/api/lugares')
        const data = await res.json()
        if (!data.error) setLugares(data)
        setCargando(false)
    }

    async function crearLugar(lugar: LugarInsert) {
        const res = await fetch('/api/lugares', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lugar),
        })
        const data = await res.json()
        if (!data.error) setLugares(prev => [data, ...prev])
        return data
    }

    async function editarLugar(id: string, lugar: Partial<LugarInsert>) {
        const res = await fetch(`/api/lugares/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lugar),
        })
        const data = await res.json()
        if (!data.error) {
            setLugares(prev => prev.map(l => l.id === id ? data : l))
        }
        return data
    }

    async function borrarLugar(id: string) {
        await fetch(`/api/lugares/${id}`, { method: 'DELETE' })
        setLugares(prev => prev.filter(l => l.id !== id))
    }

    return { lugares, cargando, crearLugar, editarLugar, borrarLugar }
}