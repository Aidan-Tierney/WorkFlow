import {createClient} from '@/lib/supabase/server'
import Checkbox from '@/app/Checkbox'

export default async function Completedpage(){
    const supabase = await createClient()
    const { data, error } = await supabase
    .from("tasks")
    .select()
    .is("completed", true)

    if (error) {
        return <p>Error: {error.message}</p>
    }

     return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-xl font-semibold">Completed Tasks</h1>
      <ul className="list-none">
        {data.map((task) => (
          <Checkbox key={task.id} task={task} />
        ))}
      </ul>
    </div>
  )
}