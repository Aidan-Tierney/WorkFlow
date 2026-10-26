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
     return (
    <div className="p-8 w-full">
      <h1 className="text-2xl font-bold">Completed Tasks</h1>
      <div>
        <Workflowview tasks={visible} ghostIds={ghostIds} />
      </div>
    </div>
  )
}