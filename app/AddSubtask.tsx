'use client'
import { useState } from 'react'
import Addtask from './Addtask'

export default function AddSubtask({
    projectId, parentTaskId
}: {
    projectId: string, parentTaskId: string
}) {

    const [open, setOpen] = useState(false)
    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center"
            >
                {"+"}
            </button>
            {open && <Addtask projectId={projectId} parentTaskId={parentTaskId} onCancel={()=> setOpen(false)}/>}
        </div>
    
    )
}
