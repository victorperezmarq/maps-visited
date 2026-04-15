'use client'

import MapaWrapper from '@/components/MapaWrapper'
import PanelFiltros from '@/components/PanelFiltros'
import { useLugares } from '@/hooks/useLugares'
import { useFiltros } from '@/hooks/useFiltros'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { lugares, cargando, crearLugar, borrarLugar } = useLugares()
  const { filtros, lugaresFiltrados, actualizarFiltro, resetearFiltros, hayFiltrosActivos } = useFiltros(lugares)
  const supabase = createClient()
  const router = useRouter()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (cargando) return (
    <main className="flex h-screen items-center justify-center">
      <p className="text-gray-400">Cargando...</p>
    </main>
  )

  return (
    <main className="flex flex-col h-screen p-4 gap-3">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">🗺️ Mis Lugares</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-400 hover:text-gray-600 border rounded-lg px-3 py-1.5 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>

      <PanelFiltros
        filtros={filtros}
        onChange={actualizarFiltro}
        onReset={resetearFiltros}
        hayFiltrosActivos={hayFiltrosActivos}
        totalVisible={lugaresFiltrados.length}
        totalTotal={lugares.length}
      />

      <div className="flex-1">
        <MapaWrapper
          lugares={lugaresFiltrados}
          onCrear={crearLugar}
          onBorrar={borrarLugar}
        />
      </div>

    </main>
  )
}