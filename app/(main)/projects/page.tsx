import { createClient } from '@/lib/supabase/server'
import Addproject from '@/app/Addproject'
import Link from 'next/link'
import {Hash} from 'lucide-react'
import DeleteProjectButton from '@/app/DeleteProjectButton'
export default async function ProjectPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('projects').select().order('created_at')
    

  if (error) {
    return <p>Error: {error.message}</p>
  }
const mine   = data.filter((p) => !p.canvas_course_id)    // no canvas id
const canvas = data.filter((p) => p.canvas_course_id)    // has a canvas id
 return (
  <div className="max-w-2xl mx-auto p-8">
    <h1 className="text-2xl font-bold">Projects</h1>
    <p className="text-sm font-semibold border-b border-line pb-2 mt-6">
      {mine.length} projects
    </p>
    
    <ul className="list-none mt-2">
      {mine.map((project) => (
        <li className="flex items-center" key={project.id}>
            <Link href={`/projects/${project.id}`} 
            className="flex-1 flex items-center gap-3 h-10 px-2 rounded-lg text-sm hover:bg-black/5">
            <Hash size={16} className="text-muted"/>
            {project.project_name}
            </Link>
            <DeleteProjectButton id={project.id} name={project.project_name}/>
        </li>
      ))}
    </ul>
    <Addproject />
    {canvas.length > 0 && (
  <>
    <p className="text-sm font-semibold border-b border-line pb-2 mt-8">
      {canvas.length} Canvas courses
    </p>

    <ul className="list-none mt-2">
      {canvas.map((project) => (
        <li key={project.id}>
          <Link href={`/projects/${project.id}`}
            className="flex items-center gap-3 h-10 px-2 rounded-lg text-sm hover:bg-black/5">
            <Hash size={16} className="text-muted" />
            {project.project_name}
          </Link>
        </li>
      ))}
    </ul>
  </>
)}

  </div>
)
}

