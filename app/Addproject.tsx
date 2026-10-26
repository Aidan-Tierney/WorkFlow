//add project button
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {Plus,Hash} from 'lucide-react'
const supabase = createClient()
export default function Addproject() {
  const [title, setTitle] = useState('')
  const [saving, setSaving] = useState(false)
  const [open, setOpen] = useState(false)

  const router = useRouter()

  async function add() {
    if (!title.trim()) return
    setSaving(true)
    setTitle('')
    const { error } = await supabase.from('projects').insert({ project_name: title })


    if (error) { setTitle(title)
       console.error(error) }
      else {
      setOpen(false)
      }
    router.refresh()
    setSaving(false)
  }
  if (!open){
    return  (
      <button
      onClick={() => setOpen(true)}
      className="flex items-center gap-3 h-10 px-2 text-sm text-muted hover:text-foreground">
        <Plus size={16} className="text-accent"/>
        Add Project
      </button>
    )
  }
  return (
  <div className="flex items-center gap-3 h-10 px-2">
    <Hash size={16} className="text-muted" />
    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') add()
        if (e.key === 'Escape') setOpen(false)
      }}
      placeholder="Project name"
      autoFocus
      className="flex-1 text-sm outline-none bg-transparent"
    />
  </div>
)

}