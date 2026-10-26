import Workflowview from "./Workflowview";
export default function AuthCard({ title, children }: { title: string; children: React.ReactNode }) {
const DEMO = [
  { id: 'root', task_name: 'Goal', parent_task_id: null, completed: false },
  { id: 'a',    task_name: 'Task 3', parent_task_id: 'root', completed: false },
  { id: 'b',    task_name: 'Task 4', parent_task_id: 'root', completed: false },
  { id: 'a1', task_name: 'Task 1', parent_task_id: 'a', completed: false },
{ id: 'a2', task_name: 'Task 2', parent_task_id: 'a', completed: false },

]

 
    return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm flex flex-col gap-3">
          <h1 className="text-2xl font-semibold">{title}</h1>
          {children}
          </div>
      </div>
   <div className="items-center text-center hidden md:flex flex-1 bg-accent text-white flex-col justify-center p-12 gap-4">
        <p className="text-5xl font-bold">WorkFlow</p>
        <p className="text-lg opacity-80">Task tracker to stay organized and on track</p>               {/* the steps (children) */}
    <div className="w-[880px] max-w-full mt-10 text-foreground pointer-events-none">
  <Workflowview tasks={DEMO} />
</div>

  </div>
</div>
  )
}
