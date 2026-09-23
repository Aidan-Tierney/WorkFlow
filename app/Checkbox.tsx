'use client'
// must be the very first line. It marks a boundary: this file and everything it imports goes to the browser.

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Checkbox({
  task,
}: {
  task: { id: string; task_name: string; completed: boolean; task_date: string; task_time: string }
}) {
  const router = useRouter()

  async function toggle() {
    await supabase
      .from('tasks')
      .update({ completed: !task.completed })
      .eq('id', task.id)

    router.refresh()
    //Why the screen changes
  }

  return (
   <li className="flex items-center gap-3 py-3 border-b border-gray-200">
      <input type="checkbox" checked={task.completed} onChange={toggle} />
      <span className="text-sm">{task.task_name}</span>
      
    </li>
    

  )
}
