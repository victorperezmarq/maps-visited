export type Lugar = {
    id: string
    user_id: string
    nombre: string
    descripcion: string | null
    categoria: 'naturaleza' | 'ciudad' | 'gastronomia' | 'cultura' | 'otro'
    valoracion: number | null
    latitud: number
    longitud: number
    foto_url: string | null
    estado: 'visitado' | 'pendiente'
    created_at: string
}

export type LugarInsert = Omit<Lugar, 'id' | 'user_id' | 'created_at'>