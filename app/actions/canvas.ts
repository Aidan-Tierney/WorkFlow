'use server'
import { createClient } from '@/lib/supabase/server'

export async function syncCanvas() {
     const supabase = await createClient()
     const { data } = await supabase.auth.getUser()
     if (!data.user) {
         return { error: 'Not logged in'}  
       }
const { data: connection } = await supabase
    .from('canvas')
    .select('canvas_url, canvas_token')
    .maybeSingle()

    if (!connection) {
        return { error: 'Canvas not connected' }
    }
    const response = await fetch(`${connection.canvas_url}/api/v1/courses`, {
        headers: {
            'Authorization': `Bearer ${connection.canvas_token}`
        }
    })
    if (!response.ok) {
        return { error: `Canvas said ${response.status}` }
    }
    const courses = await response.json()
    return { count: courses.length }
}
