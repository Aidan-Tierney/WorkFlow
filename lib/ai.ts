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
  })),
})


export async function generateTaskTree(description: string){
    const {output} = await generateText({
        model:anthropic(process.env.AI_MODEL!),
        system: TASK_TREE_SYSTEM_PROMPT,
        prompt: `<mode>new_tree</mode>
        <assignment>${description}</assignment>`,
        output: Output.object({schema: taskTreeSchema})

    })
    return output
}