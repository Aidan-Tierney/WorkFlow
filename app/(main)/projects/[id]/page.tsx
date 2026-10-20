import { createClient } from '@/lib/supabase/server'
import TaskRecursion from '@/app/TaskRecursion'
import Addtask from '@/app/Addtask'
import { layoutTasks } from '@/app/tree'
import Workflowview from '@/app/Workflowview'
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
  
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-xl font-semibold">{project.project_name}</h1>
      <Addtask projectId={id} />
      <Workflowview tasks={tasks ?? []} />
      </div>
  )
}
