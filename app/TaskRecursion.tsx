import Checkbox from '@/app/Checkbox'
import Addsubtask from '@/app/AddSubtask'
export default function TaskRecursion({ task,alltasks }: { task:any ;alltasks: any[] }) {
    const children = alltasks.filter((t) => t.parent_task_id === task.id)
    return(
        <div className="ml-6">
            <Checkbox task={task}/>
            <Addsubtask projectId={task.project_id} parentTaskId={task.id} />
            {children.map((child) => (
                <TaskRecursion key={child.id} task={child} alltasks={alltasks} />
            ))}
        </div>
    )
}