'use client'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import Addtask from './Addtask'

export default function SidebarAddtask() {
    const [open, setOpen] = useState(false)

    if (!open) {
        return (
            <button onClick={() => setOpen(true)} className="flex items-center gap-2 h-9 px-1 text-sm font-medium text-accent">
                <span className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center">
                    <Plus size={16} />
                </span>
                Add task
            </button>
        )
    }
    return <Addtask onCancel={()=> setOpen(false)}/>
}
