'use client'
// must be the very first line. It marks a boundary: this file and everything it imports goes to the browser.

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
const supabase = createClient()

export default function Checkbox({
  task,
}: {
  task: { id: string; task_name: string; completed: boolean; task_date: string; task_time: string }
}) {
  const router = useRouter()
  const [checked, setChecked] = useState(task.completed)


  async function toggle() {
    const newChecked = !checked
    setChecked(newChecked)
    //Screen changes here
    const { error } = await supabase
      .from('tasks')
      .update({ completed: newChecked })
      .eq('id', task.id)
    if (error) {
      setChecked(!newChecked)
    }

    router.refresh()


  }

  return (
    <li className="flex items-center gap-3 py-3 border-b border-gray-200">
      <input type="checkbox" checked={checked} onChange={toggle} />
      <span className="text-sm">{task.task_name}</span>

    </li>


  )
}
