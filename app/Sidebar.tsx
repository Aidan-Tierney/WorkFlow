'use client'
import { useState } from 'react'
import { PanelLeft, PanelRight } from "lucide-react";
import Button from './ui/Button';
export default function Sidebar({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(true)
    return (
        <aside className={`${open ? 'w-64' : 'w-20'} shrink-0 border-r border-line bg-surface p-4 relative`} >
            <Button className="absolute top-4 right-4 h-8 w-8 flex items-center" onClick={() => setOpen(!open)}>{open ? <PanelLeft size={18} /> : <PanelLeft size={18} />}
            </Button>
            {open && children}
        </aside>
    )
}
