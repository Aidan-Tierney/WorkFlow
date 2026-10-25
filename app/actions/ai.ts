'use server'
import { createClient } from "@/lib/supabase/server"
import { generateTaskTree } from "@/lib/ai"
import { isFileUIPart } from "ai"

export async function generateTreeAction(formData: FormData) {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    const description = (formData.get('description') as string) ?? ''
const file = formData.get('file') as File | null
const hasFile= file && file.size>0
    if (!hasFile && !description.trim()){
        return {error: 'Type a description or attach a PDF'}
    }
    if (hasFile && file.type !== 'application/pdf'){
        return {error: 'Only PDF files are supported'}
}
if (hasFile && file.size > 4 * 1024 *1024){
    return {error: 'PDF must be under 4 MB'}
}
    if (!data.user) {
        return { error: 'Not logged in' }
    }
    try {
        const pdf = hasFile ? new Uint8Array(await file.arrayBuffer()) : undefined
const result = await generateTaskTree(description, pdf)

        console.log(JSON.stringify(result, null, 2))
        return { status: result.status, message: result.message, tasks: result.tasks }
    } catch (error) {
        console.error(error)
        return { error: 'Could not generate tasks' }
    }
}