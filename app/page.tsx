

import { supabase } from '@/lib/supabase'
import TaskRow from './TaskRow'
export default async function Home() {
  const { data, error } = await supabase.from('tasks').select()

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
  <ul>
    {data.map((task) => (
      <TaskRow key={task.id} task={task} />
    ))}
  </ul>
)
}

