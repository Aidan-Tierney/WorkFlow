//Addtask button
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ArrowUp, X } from 'lucide-react'

const supabase = createClient()
export default function Addtask({ projectId, parentTaskId, onCancel, compact }: { projectId?: string, parentTaskId?: string, onCancel?: () => void, compact?: boolean }) {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  async function add() {
    if (saving) return
    if (!title.trim()) return
    setSaving(true)
    setTitle('')
    const { error } = await supabase.from('tasks').insert({ task_name: title, project_id: projectId, task_date: dueDate ? dueDate : null, parent_task_id: parentTaskId })


    if (error) {
      setTitle(title)
      console.error(error)
    }
    else {
      onCancel?.()
    }
    router.refresh()
    setSaving(false)

  }
  if (compact) {
    return (
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') add()
          if (e.key === 'Escape') onCancel?.()
        }}
        placeholder="Task name"
        autoFocus
        className="w-full text-sm outline-none bg-transparent"
      />
    )
  }

  return (
    <div className="border border-line rounded-xl p-3 flex flex-col gap-2 bg-white focus-within:ring-2 focus-within:ring-accent">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') add()
          if (e.key === 'Escape') onCancel?.()
        }}
        placeholder="Task name"
        autoFocus
        className="w-full text-sm outline-none"
      />
      <div className="flex items-center justify-between">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="text-xs text-muted border border-line rounded-md px-2 h-7"
        />
        <div className="flex items-center gap-2">
          {onCancel && (
            <button onClick={onCancel} className="text-muted hover:text-foreground">
              <X size={18} />
            </button>
          )}
          <button
            onClick={add}
            disabled={saving || !title.trim()}
            className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center disabled:opacity-50"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
