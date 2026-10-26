import { createClient } from '@/lib/supabase/server'
import Addtask from '@/app/Addtask'
import { layoutTasks, withAncestors } from '@/app/tree'
import ProjectBoard from '@/app/ProjectBoard'
import ProjectTitle from '@/app/ProjectTitle'
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

  const { data: allTasks } = await supabase
    .from('tasks')
    .select()
    .eq('project_id', id)
    .order('created_at')

  if (!project) {
    return <p>Project not found</p>
  }
  const tasks = allTasks ?? []
const visible = withAncestors(tasks.filter((t) => !t.completed), tasks)
const ghostIds = new Set(visible.filter((t) => t.completed).map((t)=> t.id))

  return (
    <div className="w-full ">
      <ProjectTitle id={project.id} name={project.project_name} />
<ProjectBoard tasks={visible} ghostIds={ghostIds} projectId={id} />


    </div>
  )

}
