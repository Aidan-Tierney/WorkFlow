//Pressing on the user icon will show a dropdown menu with the user's email, a link to settings, and a sign-out button.
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ChevronDown, Settings,LogOut } from 'lucide-react'
const supabase = createClient()
const ROW = 'flex items-center gap-3 w-full px-4 h-9 text-sm hover:bg-black/5'

export default function Usermenu({
    email,
    name
}: {
    email: string;
    name:string;
}) {
    const firstLetter = email[0].toUpperCase()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    async function handleSignOut() {
        await supabase.auth.signOut()
        router.push('/signin')
        router.refresh();
    }
    return (
        <div className="relative">
           <button onClick={() => setOpen(!open)} className="flex items-center gap-2 px-2 h-9 rounded-lg hover:bg-black/5">
  <span className="w-7 h-7 rounded-full bg-accent text-white text-sm flex items-center justify-center">
    {firstLetter}
  </span>
  <span className="text-sm font-medium truncate max-w-[8rem]">{name}</span>
  <ChevronDown size={14} className="text-muted" />
</button>

            {open && (
  <>
    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
    <div className="absolute left-0 mt-2 w-64 bg-white border border-line rounded-xl shadow-lg py-2 z-50">
      {/* header */}
      <div className="px-4 py-2">
        <p className="text-sm font-semibold truncate">{name}</p>
        <p className="text-xs text-muted truncate">{email}</p>
      </div>

      <div className="border-t border-line my-1" />

      <Link href="/settings" onClick={() => setOpen(false)} className={ROW}>
        <Settings size={16} className="text-muted" /> Settings
      </Link>

      <div className="border-t border-line my-1" />

      <button onClick={handleSignOut} className={ROW}>
        <LogOut size={16} className="text-muted" /> Log out
      </button>
    </div>
  </>
)}

        </div>
    )
}
