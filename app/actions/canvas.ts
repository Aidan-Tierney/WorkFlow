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
    const response = await fetch(`${connection.canvas_url}/api/v1/courses?per_page=100`, {
        headers: {
            'Authorization': `Bearer ${connection.canvas_token}`
        }
    })
    if (!response.ok) {
        return { error: `Canvas said ${response.status}` }
    }
    const courses = await response.json()
    const rows = courses
    .filter((course: {id: number, name?: string}) => course.name)
    .map((course: {id: number, name: string}) => ({
        project_name: course.name,
        canvas_course_id: course.id,
        user_id: data.user.id
    }))
    const { error: saveError } = await supabase
    .from('projects')
    .upsert(rows, { onConflict: 'user_id,canvas_course_id', ignoreDuplicates: true })
    if (saveError) {
        return { error: `Failed to save projects: ${saveError.message}` }
    }
    return { count: rows.length }
}
