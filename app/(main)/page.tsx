export const dynamic = 'force-dynamic'
//This tell the page to change faster but slows down the page
import { supabase } from '@/lib/supabase'
import Checkbox from '../Checkbox'
export default async function Home() {
  const { data, error } = await supabase.from('tasks').select()

  if (error) {
    return <p>Error: {error.message}</p>
  }

 return (
  <div className="max-w-2xl mx-auto p-8">
    <ul className="list-none">
      {data.map((task) => (
        <Checkbox key={task.id} task={task} />
      ))}
    </ul>
  </div>
)
}

