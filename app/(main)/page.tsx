export const dynamic = 'force-dynamic'
//This tell the page to change faster but slows down the page
import { createClient } from '@/lib/supabase/server'
import DashboardBoard from '../DashboardBoard'
import { withAncestors } from '../tree'
export default async function Home() {
  const supabase = await createClient()
  const { data: allTasks, error } = await supabase.from('tasks').select().is('project_id', null).order('created_at')
const tasks = allTasks ?? []
const visible = withAncestors(tasks.filter((t) => !t.completed), tasks)
const ghostIds = new Set(visible.filter((t) => t.completed).map((t)=> t.id))


  if (error) {
    return <p>Error: {error.message}</p>
  }

 return (
  <div>
  <h1 className="text-xl font-semibold"> Dashboard</h1>
    <DashboardBoard tasks={visible} ghostIds={ghostIds} />
    </div>
)
}
