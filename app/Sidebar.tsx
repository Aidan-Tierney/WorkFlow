'use client'
import { useState } from 'react'

export default function Sidebar({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(true)
    return (
        <aside className={`${open ? 'w-64' : 'w-20'} border-r border-line bg-surface p-4 relative`} >
            <button className="absolute top-4 right-4 h-8 w-8 flex items-center" onClick={() => setOpen(!open)}>{open ? '«' : '»'}</button>
            {open && children}
        </aside>
    )
}
