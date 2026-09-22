//Fix this

import { supabase } from '@/lib/supabase'
import Checkbox from './Checkbox'
import Addtask from './Addtask'
export default async function Home() {
  const { data, error } = await supabase.from('tasks').select()

  if (error) {
    return <p>Error: {error.message}</p>
  }

 return (
  <>
    <Addtask />
    <ul>
      {data.map((task) => (
        <Checkbox key={task.id} task={task} />
      ))}
    </ul>
  </>
)
}

