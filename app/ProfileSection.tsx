'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Input from '@/app/ui/Input'

export default function ProfileSection({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName)
  const [status, setStatus] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function saveName() {
    const trimmed = name.trim()
    if (trimmed === initialName) return            // nothing changed, so don't save

    setStatus('Saving...')
    const { error } = await supabase.auth.updateUser({
      data: { display_name: name},
    })
    if (error) {
      console.error(error)
      setName(initialName)                         // undo on failure
      setStatus('Could not save')
      return
    }
    setStatus('Saved')
    router.refresh()                               // re-run the layout → the user menu shows the new name
  }

  return (
    <div className="flex flex-col items-start gap-2 max-w-sm">
      <label className="text-sm text-muted">Display name</label>
      <Input
        value={name}
        onChange={(e) => { setName(e.target.value); setStatus('') }}
        onBlur={saveName}
        onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur() }}
        placeholder="Your name"
      />
      {status && <p className="text-xs text-muted">{status}</p>}
    </div>
  )
}
