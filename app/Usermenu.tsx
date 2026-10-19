'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
const supabase = createClient()

export default function Usermenu({
    email
}: {
    email: string;
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
            <button
                onClick={() => setOpen(!open)}
                className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center"
            >
                {firstLetter}
            </button>
            {open && (
                <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow p-2">
                    <p className="text-sm text-gray-600 truncate">{email}</p>
                     <div>
         <Link href="/settings"className="w-full text-left text-sm py-1">Settings</Link>
       </div>
                    <button onClick={handleSignOut} className="w-full text-left text-sm py-1">
                        Sign out
                    </button>
                </div>
            )}
        </div>
    )
}
