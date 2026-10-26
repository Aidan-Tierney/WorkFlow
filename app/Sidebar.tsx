'use client'
import { useState } from 'react'
import { PanelLeft, PanelRight } from "lucide-react";
import Button from './ui/Button';
export default function Sidebar({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(true)
    return (
        <aside className={`${open ? 'w-64 border-r border-line bg-surface': 'w-16'} z-40 sticky top-0 h-screen shrink-0 flex flex-col  p-4 `} >
            <Button className="absolute top-4 right-4 h-8 w-8 flex items-center" onClick={() => setOpen(!open)}><PanelLeft size={18}/>
            </Button>
            {open && children}
        </aside>
    )
}
