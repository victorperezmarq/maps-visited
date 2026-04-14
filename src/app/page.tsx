import MapaWrapper from '@/components/MapaWrapper'
import { Lugar } from '@/types/lugar'

// Datos de prueba para ver el mapa funcionando sin auth
const lugaresPrueba: Lugar[] = [
  {
    id: '1',
    user_id: 'test',
    nombre: 'Sevilla',
    descripcion: 'La mejor ciudad',
    categoria: 'ciudad',
    valoracion: 5,
    latitud: 37.3886,
    longitud: -5.9823,
    foto_url: null,
    estado: 'visitado',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    user_id: 'test',
    nombre: 'Sierra Nevada',
    descripcion: 'Ideal para esquiar',
    categoria: 'naturaleza',
    valoracion: 4,
    latitud: 37.0539,
    longitud: -3.3936,
    foto_url: null,
    estado: 'pendiente',
    created_at: new Date().toISOString(),
  },
]

export default function Home() {
  return (
    <main className="flex flex-col h-screen p-4 gap-4">
      <h1 className="text-2xl font-bold">🗺️ Mis Lugares</h1>
      <div className="flex-1">
        <MapaWrapper lugares={lugaresPrueba} />
      </div>
    </main>
  )
}