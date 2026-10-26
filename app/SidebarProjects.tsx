'use client'
import { useState } from 'react'
import { ChevronDown, ChevronRight, Hash } from 'lucide-react'
import NavLink from '@/app/ui/NavLink'
import Link from 'next/link'

export default function SidebarProjects({ projects }: { projects: { id: string; project_name: string; canvas_course_id:number|null }[] }) {
  const [open, setOpen] = useState(true)
  const mine   = projects.filter((p) => !p.canvas_course_id)    // no canvas id
const canvas = projects.filter((p) => p.canvas_course_id)    // has a canvas id


  return (
    <div className="mt-6 flex flex-col gap-1">
      <div className="flex items-center justify-between px-3 h-8">
  <Link href="/projects" className="text-sm font-semibold text-muted hover:text-foreground">
    My Projects
  </Link>
  <button
    onClick={() => setOpen(!open)}
    title={open ? 'Hide projects' : 'Show projects'}
    className="text-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
  >
    {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
  </button>
</div>


      {open && mine.map((project) => (
        <NavLink
          key={project.id}
          href={`/projects/${project.id}`}
          label={project.project_name}
          icon={<Hash size={16} className="text-muted" />}
        />
      ))}
      {open && canvas.length > 0 && (
  <>
    <p className="text-sm font-semibold text-muted px-3 h-8 flex items-center mt-4">
      Canvas
    </p>
    {canvas.map((project) => (
      <NavLink
          key={project.id}
          href={`/projects/${project.id}`}
          label={project.project_name}
          icon={<Hash size={16} className="text-muted" />}
        />
    ))}
  </>
)}

    </div>
  )
}
