import { createClient } from '@/lib/supabase/server'
import Checkbox from '@/app/Checkbox'
import DayAddTask from '@/app/DayAddTask'

const TIMEZONE = 'America/Chicago'
const DAYS_AHEAD = 7

export default async function Calendar() {
  const days: string[] = []
  for (let i = 0; i < DAYS_AHEAD; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    days.push(d.toLocaleDateString('en-CA', { timeZone: TIMEZONE }))
  }


  const supabase = await createClient()
  const { data: tasks } = await supabase
    .from('tasks')
    .select()
    .gte('task_date', days[0])                 
    .lte('task_date', days[days.length -1])                 
    .is('completed', false)

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-semibold ">Upcoming</h1>
      {days.map((day) => (
        <section key={day} className="mt-6">
          <h2 className="text-sm font-semibold border-b border-line pb-2">{day}</h2>
          {(tasks ?? []).filter((t) => t.task_date===day).map((task) => (
           <div key={task.id} className="flex items-center h-10 px-2 rounded-lg hover:bg-black/5">
  <Checkbox task={task} descendantIds={[]} href={task.project_id ? `/projects/${task.project_id}` : '/'}
/>
</div>

          ))}
          <DayAddTask day={day} />
        </section>
      ))}
    </div>
  )
}
