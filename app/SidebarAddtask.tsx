'use client'
import { useContext, useState } from 'react'
import { Plus } from 'lucide-react'
import Composer from '@/app/Composer'
import { PreviewContext } from './PreviewContext'

export default function SidebarAddtask() {
    const [open, setOpen] = useState(false)
    const {preview, setPreview} = useContext(PreviewContext)

        return (
            <>
            <div className='mt-3'>
            <button onClick={() => setOpen(true)} className="hover:bg-black/5 rounded-lg w-full cursor-pointer flex items-center gap-[6px] h-9 px-[6px] text-sm font-medium text-accent">
                <span className=" w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center">
                    <Plus size={16} />
                </span>
                Add task
            </button>
            </div>
{open && (
    <>
    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
    <div className="bg-white p-3 fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl shadow-lg rounded-xl">
         <Composer onDone={() => setOpen(false)} tasks={[]} projectId={null} preview={preview} setPreview={setPreview}/>
    </div>
  </>
)}
</>
)
}
