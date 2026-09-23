'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Addtask() {
  const [title, setTitle] = useState('')
  const router = useRouter()

  async function add() {
    if (!title.trim()) return

    await supabase.from('tasks').insert({ task_name: title })

    setTitle('')
    router.refresh()
  }

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task"
      />
      <button onClick={add}>Add</button>
    </div>
  )
}
