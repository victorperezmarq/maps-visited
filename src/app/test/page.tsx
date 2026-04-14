import { createClient } from '@/lib/supabase/server'

export default async function TestPage() {
    const supabase = await createClient()
    const { data, error } = await supabase.from('lugares').select('*')

    return (
        <div>
            <p>Lugares: {data?.length ?? 0}</p>
            {error && <p>Error: {error.message}</p>}
        </div>
    )
}