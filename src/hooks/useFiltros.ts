import { useState, useMemo } from 'react'
import { Lugar } from '@/types/lugar'

export type Filtros = {
    categoria: string
    estado: string
    valoracion: string
}

const filtrosIniciales: Filtros = {
    categoria: 'todas',
    estado: 'todos',
    valoracion: 'todas',
}

export function useFiltros(lugares: Lugar[]) {
    const [filtros, setFiltros] = useState<Filtros>(filtrosIniciales)

    const lugaresFiltrados = useMemo(() => {
        return lugares.filter(lugar => {
            const porCategoria = filtros.categoria === 'todas' || lugar.categoria === filtros.categoria
            const porEstado = filtros.estado === 'todos' || lugar.estado === filtros.estado
            const porValoracion = filtros.valoracion === 'todas' || lugar.valoracion === Number(filtros.valoracion)
            return porCategoria && porEstado && porValoracion
        })
    }, [lugares, filtros])

    function actualizarFiltro(key: keyof Filtros, value: string) {
        setFiltros(prev => ({ ...prev, [key]: value }))
    }

    function resetearFiltros() {
        setFiltros(filtrosIniciales)
    }

    const hayFiltrosActivos = Object.entries(filtros).some(
        ([key, value]) => value !== filtrosIniciales[key as keyof Filtros]
    )

    return { filtros, lugaresFiltrados, actualizarFiltro, resetearFiltros, hayFiltrosActivos }
}