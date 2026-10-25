'use client'
import Checkbox from "@/app/Checkbox";
import { layoutTasks } from "@/app/tree";
import Link from "next/link";
import {useState} from 'react'
import {Plus} from 'lucide-react'
import Addtask from "./Addtask";
import { getDescendantIds } from "@/app/tree";
const COLUMN_WIDTH = 220
const ROW_HEIGHT = 70
const BOX_WIDTH = 180
const BOX_HEIGHT = 50

export default function Workflowview({ tasks, ghostIds, previewTasks}: { tasks: any[]; ghostIds?: Set<string>; previewTasks?: any[]}) {
    const [draftParentId, setDraftParentId] = useState<string | null> (null)
    const baseTasks = [...tasks, ...(previewTasks ?? [])]
    const draftParent = baseTasks.find((t) => t.id === draftParentId)
    const shownTasks = draftParent 
    ? [...baseTasks, {
        id: 'draft',
        task_name: 'New Task',
        parent_task_id: draftParent.id,
        project_id: draftParent.project_id,
    }]
    : baseTasks
    
    const positions = layoutTasks(shownTasks)
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
            {shownTasks.map((task) => {
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
            {shownTasks.map((task) => {
                const pos = positions.get(task.id)
                if (!pos) return null
                if (task.id.startsWith('ai-')) {
  return (
    <div key={task.id} className="absolute border rounded p-2 bg-white opacity-50 flex items-center text-sm" 
    style={{ left: boxLeft(pos), top: boxTop(pos), width: BOX_WIDTH, height: BOX_HEIGHT }}
>
      <span className="truncate">{task.task_name}</span>
    </div>
  )
}

                if (task.id === 'draft'){
                    return (
                        <div
                        key={task.id}
                        className="absolute border-2 border-accent rounded p-2 bg-white flex items-center"
                        style={{left: boxLeft(pos), top: boxTop(pos), width: BOX_WIDTH, height: BOX_HEIGHT}}
                        >
                            <Addtask
                            compact
                            projectId={task.project_id}
                            parentTaskId={task.parent_task_id}
                            onCancel={() => setDraftParentId(null)}
                            />
                            </div>
                    )
                }
                const isGhost = ghostIds?.has(task.id) ?? false

                if (isGhost){
                    return (< Link
                        key={task.id}
                        href={task.completed ? '/completed' : 
                            (task.project_id ? `/projects/${task.project_id}` : '/')}
                        className="absolute border rounded p-2 border-dashed opacity-50 flex items-center gap-1"
                        style={{
                            left: boxLeft(pos),
                            top: boxTop(pos),
                            width: BOX_WIDTH,
                            height: BOX_HEIGHT
                        }}
                    >
                
                        {task.task_name}
                    </Link>
                )
                }
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
                        <Checkbox task={task} descendantIds={getDescendantIds(task.id,tasks)} />
                        {!task.completed && (
                            <button
                            onClick={() => setDraftParentId(task.id)}
                                className="text-muted hover:text-accent">
                                <Plus size={16}/>
                                </button>
                        )}
                    </div>
                )
            })}
        </div >
    )
}
