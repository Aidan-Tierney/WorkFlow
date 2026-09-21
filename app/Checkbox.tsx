'use client'
// must be the very first line. It marks a boundary: this file and everything it imports goes to the browser.

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function TaskRow({
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
    <li>
      <input type="checkbox" checked={task.completed} onChange={toggle} />
      {task.task_name}
    </li>
  )
}
