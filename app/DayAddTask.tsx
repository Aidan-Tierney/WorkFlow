'use client'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import Addtask from '@/app/Addtask'

export default function DayAddTask({ day }: { day: string }) {
    const [open, setOpen] = useState(false)

    if (!open) {
        return (
            <button onClick={() => setOpen(true)} className="flex items-center gap-3 h-10 px-2 text-sm text-muted hover:text-foreground">
                <Plus size={16} className="text-accent" />
                Add task
            </button>
        )
    }
    return <Addtask defaultDate={day} onCancel={() => setOpen(false)} />
}