import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { LugarInsert } from '@/types/lugar'

// GET → listar todos los lugares del usuario
export async function GET() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const { data, error } = await supabase
        .from('lugares')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}

// POST → crear un lugar nuevo
export async function POST(request: Request) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const body: LugarInsert = await request.json()

    const { data, error } = await supabase
        .from('lugares')
        .insert({ ...body, user_id: user.id })
        .select()
        .single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
}