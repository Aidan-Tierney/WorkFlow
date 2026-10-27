'use server'
import { createClient } from "@/lib/supabase/server"
import { generateTaskTree } from "@/lib/ai"
import { DAILY_LIMIT } from "@/lib/limits"

export async function generateTreeAction(formData: FormData) {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    const description = (formData.get('description') as string) ?? ''
const file = formData.get('file') as File | null
const hasFile= file && file.size>0
const outline = (formData.get('outline') as string) ?? ''

 if (!data.user) {
        return { error: 'Not logged in' }
    }
    if (!hasFile && !description.trim()){
        return {error: 'Type a description or attach a PDF'}
    }
    if (hasFile && file.type !== 'application/pdf'){
        return {error: 'Only PDF files are supported'}
}
if (hasFile && file.size > 4 * 1024 *1024){
    return {error: 'PDF must be under 4 MB'}
}

       
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { count } = await supabase
        .from('ai_usage')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', since)

    if ((count ?? 0) >= DAILY_LIMIT) {
        return { error: `You've used all ${DAILY_LIMIT} AI generations for today. Try again later.` }
    }

   
    const { error: usageError } = await supabase.from('ai_usage').insert({})
    if (usageError) {
        console.error(usageError)
        return { error: 'Could not start generation' }
    }
    const deadline = (formData.get('dueDate') as string) ?? ''
const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' })

    try {
        const pdf = hasFile ? new Uint8Array(await file.arrayBuffer()) : undefined
const result = await generateTaskTree(description, pdf, outline, today , deadline)

        console.log(JSON.stringify(result, null, 2))
        return { status: result.status, message: result.message, tasks: result.tasks }
    } catch (error) {
        console.error(error)
        return { error: 'Could not generate tasks' }
    }
}