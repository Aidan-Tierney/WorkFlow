import { generateText, Output } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { z } from 'zod'
import { TASK_TREE_SYSTEM_PROMPT } from './prompts'

const taskTreeSchema = z.object({
  status: z.enum(['ok', 'declined', 'nothing_to_add']),
  message: z.string().nullable().describe('a short friendly message for the student when status is not "ok", otherwise null'),
  tasks: z.array(z.object({
    id: z.string().describe('a temporary id like "t1", "t2", unique within this list'),
    name: z.string().describe('a short action, like "Find 3 sources"'),
    parent_id: z.string().nullable().describe('id of the parent task, or null for the one root task'),
    due_date: z.string().nullable().describe('a date in YYYY-MM-DD format, or null if no deadline is known'),
    
  })),
})




export async function generateTaskTree(description: string, pdf?: Uint8Array, outline?: string, today?: string, deadline?: string) {
    const assignmentText=pdf
    
    ? `See the attached PDF. Extra notes from the student: ${description}`
    : description
    const text = `<today>${today ?? 'unknown'}</today>
<deadline>${deadline || '(none given)'}</deadline>
<existing_tree>
${outline || '(empty, this project has no tasks yet)'}
</existing_tree>
<request>${assignmentText}</request>`
const content: any[] = [{ type: 'text', text }]


    if (pdf){
        content.push({ type: 'file', data: pdf, mediaType: 'application/pdf' })
    }
    const {output} = await generateText({
        model:anthropic(process.env.AI_MODEL!),
        system: TASK_TREE_SYSTEM_PROMPT,
        messages: [{ role: 'user', content }],
    output: Output.object({ schema: taskTreeSchema }),
    })
    return output
}