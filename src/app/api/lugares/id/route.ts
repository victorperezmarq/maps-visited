import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { LugarInsert } from '@/types/lugar'

type Params = { params: Promise<{ id: string }> }

// PUT → editar un lugar
export async function PUT(request: Request, { params }: Params) {
    const supabase = await createClient()
    const { id } = await params

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const body: Partial<LugarInsert> = await request.json()

    const { data, error } = await supabase
        .from('lugares')
        .update(body)
        .eq('id', id)
        .select()
        .single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}

// DELETE → borrar un lugar
export async function DELETE(_request: Request, { params }: Params) {
    const supabase = await createClient()
    const { id } = await params

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const { error } = await supabase
        .from('lugares')
        .delete()
        .eq('id', id)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}