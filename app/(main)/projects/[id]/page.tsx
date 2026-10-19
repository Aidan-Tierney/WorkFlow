import { createClient } from '@/lib/supabase/server'
import TaskRecursion from '@/app/TaskRecursion'
import Addtask from '@/app/Addtask'
export default async function Projectpage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: project } = await supabase
    .from('projects')
    .select()
    .eq('id', id)
    .single()

    const { data: tasks } = await supabase
    .from('tasks')
    .select()
    .eq('project_id', id).is('completed', false)

    if (!project) {
    return <p>Project not found</p>
  }
  const roots = (tasks ?? []).filter((task) => !task.parent_task_id)
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-xl font-semibold">{project.project_name}</h1>
      <Addtask projectId={id} />
      <ul className="list-none">
        {roots.map((task) => (
          <TaskRecursion key={task.id} task={task} alltasks={tasks??[]} />
        ))}
      </ul>
    </div>
  )
}
