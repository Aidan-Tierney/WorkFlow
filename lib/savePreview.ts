
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

export async function savePreview(preview: any[]) {
 const realId = new Map()
        for (const t of preview) {
            realId.set(t.id, crypto.randomUUID())
        }
        const rows = preview.map((t, i) => ({
            id: realId.get(t.id),
            task_name: t.task_name,
            parent_task_id: t.parent_task_id ? (realId.get(t.parent_task_id) ?? t.parent_task_id) : null,
            project_id: t.project_id,
            created_at: new Date(Date.now()+i).toISOString(),
        }))
        const { error } = await supabase.from('tasks').insert(rows)
  return error          // the caller decides what to do with it
}
