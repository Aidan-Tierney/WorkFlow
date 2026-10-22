//add project button
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Button from '@/app/ui/Button'
import Input from '@/app/ui/Input'
import {Plus} from 'lucide-react'
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
    <div>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a project"
        
      />
      <Button disabled={saving} onClick={add}>
        {saving ? 'Adding...' : 'Add'}
      </Button>
    </div>
  )
}