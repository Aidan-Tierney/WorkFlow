'use client'
import { useState } from 'react'
import { ChevronDown, ChevronRight, Hash } from 'lucide-react'
import NavLink from '@/app/ui/NavLink'
import Link from 'next/link'

export default function SidebarProjects({ projects }: { projects: { id: string; project_name: string }[] }) {
  const [open, setOpen] = useState(true)

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


      {open && projects.map((project) => (
        <NavLink
          key={project.id}
          href={`/projects/${project.id}`}
          label={project.project_name}
          icon={<Hash size={16} className="text-muted" />}
        />
      ))}
    </div>
  )
}
