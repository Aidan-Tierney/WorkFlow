import { createClient } from '@/lib/supabase/server'
import Checkbox from '@/app/Checkbox'
import DayAddTask from '@/app/DayAddTask'

const TIMEZONE = 'America/Chicago'
const DAYS_AHEAD = 7

export default async function Calendar() {
  // A. the next N days as "YYYY-MM-DD" strings
  const days: string[] = []
  for (let i = 0; i < DAYS_AHEAD; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    days.push(d.toLocaleDateString('en-CA', { timeZone: TIMEZONE }))
  }

  // B. tasks due in that range, not completed
  const supabase = await createClient()
  const { data: tasks } = await supabase
    .from('tasks')
    .select()
    .gte('task_date', days[0])                   // on or after the first day
    .lte('task_date', days[days.length -1])                   // on or before the last day
    .is('completed', false)

  // C. one section per day
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold">Upcoming</h1>
      {days.map((day) => (
        <section key={day} className="mt-6">
          <h2 className="text-sm font-semibold border-b border-line pb-2">{day}</h2>
          {(tasks ?? []).filter((t) => t.task_date===day).map((task) => (
            <Checkbox key={task.id} task={task} descendantIds={[]} />
          ))}
          <DayAddTask day={day} />
        </section>
      ))}
    </div>
  )
}
