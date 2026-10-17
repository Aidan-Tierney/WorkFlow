import { createClient } from '@/lib/supabase/server'
import Addproject from '@/app/Addproject'
import Link from 'next/dist/client/link'
export default async function ProjectPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('projects').select()

  if (error) {
    return <p>Error: {error.message}</p>
  }

 return (
  <div className="max-w-2xl mx-auto p-8">
    <h1 className="text-xl font-semibold">Projects</h1>
    <Addproject />
    <ul className="list-none">
      {data.map((project) => (
        <li key={project.id}>
            <Link href={`/projects/${project.id}`}>{project.project_name}</Link>
        </li>
      ))}
    </ul>
  </div>
)
}

