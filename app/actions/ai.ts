'use server'
import { createClient } from "@/lib/supabase/server"
import { generateTaskTree } from "@/lib/ai"

export async function generateTreeAction(description: string) {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
        return { error: 'Not logged in' }
    }
    try {
        const result = await generateTaskTree(description)
        console.log(JSON.stringify(result, null, 2))
        return { status: result.status, message: result.message, tasks: result.tasks }
    } catch (error) {
        console.error(error)
        return { error: 'Could not generate tasks' }
    }
}