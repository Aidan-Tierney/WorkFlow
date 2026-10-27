'use client'
import Checkbox from "@/app/Checkbox";
import { layoutTasks } from "@/app/tree";
import Link from "next/link";
import { useState } from 'react'
import { Plus, X, Check } from 'lucide-react'
import Addtask from "./Addtask";
import { getDescendantIds } from "@/app/tree";
import { useRef } from "react";
import { useEffect } from "react";
const COLUMN_WIDTH = 280
const ROW_HEIGHT = 80
const BOX_WIDTH = 240
const BOX_HEIGHT = 60
const LEFT_GUTTER = 40



export default function Workflowview({ tasks, ghostIds, previewTasks, onAiExtend, onKeep, onRemove }: { tasks: any[]; ghostIds?: Set<string>; previewTasks?: any[]; onAiExtend?: (name: string) => void; onKeep?: () => void; onRemove?: (id: string) => void }) {
    const [draftParentId, setDraftParentId] = useState<string | null>(null)
    const baseTasks = [...tasks, ...(previewTasks ?? [])]
    const [width, setWidth] = useState<number | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const observer = new ResizeObserver((entries) => {
            setWidth(entries[0].contentRect.width)
        })
        observer.observe(el)
        return () => observer.disconnect()
            }, [])
const seen = useRef<Set<string> | null>(null)

useEffect(() => {
  const ids = baseTasks.map((t) => t.id)

  if (seen.current === null) {
    seen.current = new Set(ids)
    return
  }

  const newId = ids.find((id) => !seen.current!.has(id))
  if (newId) {
    document.getElementById(`task-${newId}`) 
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  seen.current = new Set(ids)
}, [tasks,previewTasks])                              
    const draftParent = baseTasks.find((t) => t.id === draftParentId)
    const shownTasks = draftParent

        ? [...baseTasks, {
            id: 'draft',
            task_name: 'New Task',
            parent_task_id: draftParent.id,
            project_id: draftParent.project_id,
        }]
        : baseTasks
    const maxColumns = width
        ? Math.max(1, Math.floor((width - LEFT_GUTTER - BOX_WIDTH) / COLUMN_WIDTH) + 1)
        : Infinity

    const { positions, wrapped } = layoutTasks(shownTasks, maxColumns)
    const wrapInfo = new Map(wrapped.map((w) => [w.childId, w]))

    let maxColumn = 0
    let maxRow = 0
    for (const pos of positions.values()) {
        if (pos.column > maxColumn) maxColumn = pos.column
        if (pos.row > maxRow) maxRow = pos.row
    }

    function boxLeft(pos: { column: number }) {
        return LEFT_GUTTER + (maxColumn - pos.column) * COLUMN_WIDTH
    }
    function boxTop(pos: { row: number }) {
        return pos.row * ROW_HEIGHT
    }
    return (

        <div ref={containerRef}
            className="w-full">
            <div
                className="relative ml-auto"
                style={{ width: (maxColumn + 1) * COLUMN_WIDTH + LEFT_GUTTER, height: (maxRow + 1) * ROW_HEIGHT }}
            >
                <svg className="absolute inset-0 pointer-events-none"
                    width={(maxColumn + 1) * COLUMN_WIDTH + LEFT_GUTTER}
                    height={(maxRow + 1) * ROW_HEIGHT}
                >
                    {shownTasks.map((task) => {

                        if (!task.parent_task_id) return null
                        const child = positions.get(task.id)
                        const parent = positions.get(task.parent_task_id)
                        if (!child || !parent) return null
                        const wrap = wrapInfo.get(task.id)
                        if (wrap) {                           
                            const pLeft = boxLeft(parent)                                  
                            const pMid = boxTop(parent) + BOX_HEIGHT / 2                   
                            const lane = pLeft - (10 + (wrap.bandIndex % 4) * 8)           
                            const gapY = boxTop({ row: wrap.bandRow - 1 }) + BOX_HEIGHT / 2 
                            const right = boxLeft(child) + BOX_WIDTH                        
                            const busX = right + (COLUMN_WIDTH - BOX_WIDTH) / 2             
                            const cy = boxTop(child) + BOX_HEIGHT / 2                     
                            return (
                                <path
                                    key={task.id}
                                    d={`M ${pLeft} ${pMid} H ${lane} V ${gapY} H ${busX} V ${cy} H ${right}`}


                                    stroke="gray"
                                    fill="none"
                                    strokeWidth={2}
                                />
                            )
                        }



                        const x1 = boxLeft(child) + BOX_WIDTH
                        const y1 = boxTop(child) + (BOX_HEIGHT / 2)
                        const x2 = boxLeft(parent)
                        const y2 = boxTop(parent) + (BOX_HEIGHT / 2)
                        const midX = (x1 + x2) / 2
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
                        const isTop = !task.parent_task_id?.startsWith('ai-')
                        return (
                            <div key={task.id} id={`task-${task.id}`}
 className="absolute border rounded p-2 bg-white  flex items-center text-sm"
                                style={{ left: boxLeft(pos), top: boxTop(pos), width: BOX_WIDTH, height: BOX_HEIGHT }}
                            >
                                <span className="line-clamp-2 opacity-50">{task.task_name}</span>
                                <div className="ml-auto flex gap-1 shrink-0">
                                {isTop && (
                                    <button onClick={onKeep} className=" text-muted hover:text-accent">
                                        <Check size={16} />
                                    </button>
                                )}
                                <button onClick={() => onRemove?.(task.id)} className="text-muted hover:text-red-600">
                                    <X size={16} />
                                </button>
</div>
                            </div>
                        )
                    }

                    if (task.id === 'draft') {
                        return (
                            <div
                                key={task.id}
                                className="absolute border-2 border-accent rounded p-2 bg-white flex items-center"
                                style={{ left: boxLeft(pos), top: boxTop(pos), width: BOX_WIDTH, height: BOX_HEIGHT }}
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

                    if (isGhost) {
                        return (< Link
                            key={task.id}
                            id={`task-${task.id}`}
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
                            id={`task-${task.id}`}
                            className="absolute border rounded p-2 bg-white flex items-center gap-1"
                            style={{
                                left: boxLeft(pos),
                                top: boxTop(pos),
                                width: BOX_WIDTH,
                                height: BOX_HEIGHT
                            }}
                        >
                             {!task.completed && (
                                <button
                                    onClick={() => setDraftParentId(task.id)}
                                    className="text-muted hover:text-accent">
                                    <Plus size={16} />
                                </button>
                            )}
                            <Checkbox task={task} descendantIds={getDescendantIds(task.id, tasks)} onAiExtend={onAiExtend} boxRight />
                           
                        </div>



                    )
                })}
            </div>
        </div >
    )
}
