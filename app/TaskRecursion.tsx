import Checkbox from '@/app/Checkbox'
export default function TaskRecursion({ task,alltasks }: { task:any ;alltasks: any[] }) {
    const children = alltasks.filter((t) => t.parent_task_id === task.id)
    return(
        <div className="ml-6">
            <Checkbox task={task}/>
            {children.map((child) => (
                <TaskRecursion key={child.id} task={child} alltasks={alltasks} />
            ))}
        </div>
    )
}