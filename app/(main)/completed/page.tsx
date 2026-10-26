import {createClient} from '@/lib/supabase/server'
import Workflowview from '@/app/Workflowview'
import { getDescendantIds, withAncestors } from '@/app/tree'

export default async function Completedpage(){
    const supabase = await createClient()
    const { data:allTasks, error } = await supabase
    .from("tasks")
    .select()
    .order('created_at')

    
    
    if (error) {
        return <p>Error: {error.message}</p>
    }

const tasks = allTasks ?? []
const done = tasks.filter((t) => t.completed)

const ids = new Set(withAncestors(done,tasks).map((t) => t.id))

for (const t of done){
  for (const childId of getDescendantIds(t.id, tasks)){
    ids.add(childId)
  }
}
const visible = tasks.filter((t)=> ids.has(t.id))

    const ghostIds= new Set(visible.filter((t) => !t.completed).map((t)=> t.id))
    const roots  = visible.filter((t) => !t.parent_task_id)
const others = visible.filter((t) => t.parent_task_id)

function lastDone(root: any) {
  const ids = [root.id, ...getDescendantIds(root.id, visible)]
  const times = visible
    .filter((t) => ids.includes(t.id) && t.completed_at)
    .map((t) => t.completed_at)
  return times.sort().at(-1) ?? ''
}

roots.sort((a, b) => lastDone(b).localeCompare(lastDone(a)))
const ordered = [...roots, ...others]

     return (
    <div >
      <h1 className="mb-8 text-3xl font-semibold">Completed Tasks</h1>
      <div>
        <Workflowview tasks={ordered} ghostIds={ghostIds} />
      </div>
    </div>
  )
}