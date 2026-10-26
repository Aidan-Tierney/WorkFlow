'use client'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import Addtask from './Addtask'

export default function SidebarAddtask() {
    const [open, setOpen] = useState(false)

        return (
            <>
            <button onClick={() => setOpen(true)} className="flex items-center gap-2 h-9 px-1 text-sm font-medium text-accent">
                <span className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center">
                    <Plus size={16} />
                </span>
                Add task
            </button>
{open && (
    <>
    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl shadow-lg rounded-xl">
      <Addtask onCancel={() => setOpen(false)} />
    </div>
  </>
)}
</>
)
}
