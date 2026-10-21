import Checkbox from "@/app/Checkbox";
import AddSubtask from "@/app/AddSubtask";
import { layoutTasks } from "@/app/tree";
const COLUMN_WIDTH = 220
const ROW_HEIGHT = 70
const BOX_WIDTH = 180
const BOX_HEIGHT = 50

export default function Workflowview({ tasks }: { tasks: any[] }) {
    const positions = layoutTasks(tasks)
    let maxColumn = 0
    let maxRow = 0
    for (const pos of positions.values()) {
        if (pos.column > maxColumn) maxColumn = pos.column
        if (pos.row > maxRow) maxRow = pos.row
    }
    function boxLeft(pos: {column: number}){
        return (maxColumn - pos.column) * COLUMN_WIDTH
    }
    function boxTop(pos: {row:number}){
        return pos.row * ROW_HEIGHT
    }
    return (
        <div
            className="relative ml-auto"
            style={{ width: (maxColumn + 1) * COLUMN_WIDTH, height: (maxRow + 1) * ROW_HEIGHT }}
        >
            <svg className="absolute inset-0 pointer-events-none" width={(maxColumn + 1) * COLUMN_WIDTH} height={(maxRow + 1) * ROW_HEIGHT}>
            {tasks.map((task) => {
                if (!task.parent_task_id) return null
                const child = positions.get(task.id)
                const parent = positions.get(task.parent_task_id)
                if (!child || !parent) return null
                const x1=boxLeft(child) + BOX_WIDTH
                const y1=boxTop(child) + (BOX_HEIGHT/2)
                const x2=boxLeft(parent) 
                const y2=boxTop(parent) + (BOX_HEIGHT/2)
                const midX = (x1+x2)/2
                return (
                    <path
                    key={task.id}
                    d={`M ${x1} ${y1} H ${midX} V ${y2} H ${x2}`}
                    stroke="gray"
                    fill="none"
                    strokeWidth={2}
                    />
                )
            })}
            </svg>
            {tasks.map((task) => {
                const pos = positions.get(task.id)
                if (!pos) return null
                return (
                    < div
                        key={task.id}
                        className="absolute border rounded p-2 bg-white flex items-center gap-1"
                        style={{
                            left: boxLeft(pos),
                            top: boxTop(pos),
                            width: BOX_WIDTH,
                            height: BOX_HEIGHT
                        }}
                    >
                        <Checkbox task={task} />
                        <AddSubtask projectId={task.project_id} parentTaskId={task.id} />
                    </div>
                )
            })}
        </div >
    )
}
