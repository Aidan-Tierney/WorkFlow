'use client'
// must be the very first line. It marks a boundary: this file and everything it imports goes to the browser.

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { Trash2, Star } from 'lucide-react'
const supabase = createClient()

export default function Checkbox({
  task,
  descendantIds,
  onAiExtend,
}: {
  task: { id: string; task_name: string; completed: boolean; task_date: string; task_time: string }
  descendantIds: string[]
  onAiExtend?: (name:string)=>void
}) {
  const router = useRouter()
  const [checked, setChecked] = useState(task.completed)
  const [expanded, setExpanded] = useState(false)
  const [name, setName] = useState(task.task_name)
  const [date, setDate] = useState(task.task_date ?? '')

  async function saveName() {
    const trimmed = name.trim()
    if (!trimmed || trimmed === task.task_name) {
      setName(task.task_name)
      return
    }
    const { error } = await supabase
      .from('tasks')
      .update({ task_name: trimmed })
      .eq('id', task.id)
    if (error) {
      setName(task.task_name)
      console.error(error)
    }
    router.refresh
  }
  async function saveDate(newDate: string) {
    const { error } = await supabase
      .from('tasks')
      .update({ task_date: newDate || null })
      .eq('id', task.id)
    if (error) {
      setName(task.task_date ?? '')
      console.error(error)
    }
    router.refresh
  }

  async function deleteTask() {
    const count = descendantIds.length
    const message = count > 0
      ? `Delete "${task.task_name}" and its ${count} subtask${count === 1 ? '' : 's'}?`
      : `Delete "${task.task_name}"?`
    if (!confirm(message)) return

    const { error } = await supabase.from('tasks').delete().eq('id', task.id)
    if (error) {
      console.error(error)
      return
    }
    setExpanded(false)
    router.refresh()
  }


  async function toggle() {
    const newChecked = !checked

    setChecked(newChecked)
    const ids = newChecked ? [task.id, ...descendantIds] : [task.id]
    //Screen changes here
    const { error } = await supabase
      .from('tasks')
      .update({ completed: newChecked })
      .in('id', ids)
    if (error) {
      setChecked(!newChecked)
    }

    router.refresh()


  }

  return (
    <li className="flex items-center gap-3 min-w-0 flex-1">
      <input type="checkbox" checked={checked} onChange={toggle} />
      <span onClick={() => setExpanded(true)} className="text-sm line-clamp-2 cursor-pointer">{task.task_name}</span>
      {expanded && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setExpanded(false)} />
          <div className="left-0 absolute top-0 z-20 w-72 bg-white border border-line rounded-xl shadow-lg p-3 flex flex-col gap-2">
            <textarea
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={saveName}
              onKeyDown={(e) => {
                if (e.key === 'Enter') { e.preventDefault(); e.currentTarget.blur() }
              }}
              autoFocus
              rows={3}
              className="text-sm w-full resize-none outline-none"
            />
            <div className="flex items-center justify-between">
              <input
                type="date"
                value={date}
                onChange={(e) => { setDate(e.target.value); saveDate(e.target.value) }}
                className="text-xs text-muted border border-line rounded-md px-2 h-7 w-fit"
              />
              
                {onAiExtend && (
  <button
    onClick={() => { onAiExtend(task.task_name); setExpanded(false) }}
    className="text-xs text-accent hover:underline"
  >
   <Star size={16} /> Add steps with AI
  </button>
)}
<button onClick={deleteTask} className="text-muted hover:text-danger">

                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </li>
  )
}
