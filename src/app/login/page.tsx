'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const supabase = createClient()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [esRegistro, setEsRegistro] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [cargando, setCargando] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setCargando(true)
        setError(null)

        const { error } = esRegistro
            ? await supabase.auth.signUp({ email, password })
            : await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setError(error.message)
        } else {
            router.push('/')
            router.refresh()
        }

        setCargando(false)
    }

    return (
        <main className="flex h-screen items-center justify-center bg-gray-50">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-5">

                <div>
                    <h1 className="text-2xl font-bold">🗺️ Mis Lugares</h1>
                    <p className="text-sm text-gray-400 mt-1">
                        {esRegistro ? 'Crea tu cuenta' : 'Inicia sesión para continuar'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    {error && (
                        <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={cargando}
                        className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg py-2 text-sm font-medium transition-colors"
                    >
                        {cargando ? 'Cargando...' : esRegistro ? 'Crear cuenta' : 'Entrar'}
                    </button>
                </form>

                <button
                    onClick={() => setEsRegistro(prev => !prev)}
                    className="text-sm text-gray-400 hover:text-gray-600 text-center transition-colors"
                >
                    {esRegistro
                        ? '¿Ya tienes cuenta? Inicia sesión'
                        : '¿No tienes cuenta? Regístrate'}
                </button>

            </div>
        </main>
    )
}