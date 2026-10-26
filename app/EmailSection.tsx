'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Input from '@/app/ui/Input'
import Button from '@/app/ui/Button'

export default function EmailSection({ currentEmail }: { currentEmail: string }) {
  const [newEmail, setNewEmail] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const supabase = createClient()

  async function changeEmail() {
    const trimmed = newEmail.trim()
    if (!trimmed) return
    if (trimmed === currentEmail) {
      setMessage("That's already your email.")
      return
    }

    setSaving(true)
    setMessage('')
    const { error } = await supabase.auth.updateUser({ email: trimmed })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage(`Check your inbox at ${trimmed} to confirm the change.`)
      setNewEmail('')
    }
    setSaving(false)
  }

  return (
    <div className="flex flex-col gap-2 max-w-sm items-start">
      <p className="text-sm">
        <span className="text-muted">Current email: </span>{currentEmail}
      </p>
      <Input
        type="email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        placeholder="New email"
      />
      <Button onClick={changeEmail} disabled={saving || !newEmail.trim()}>
        {saving ? 'Sending...' : 'Change email'}
      </Button>
      {message && <p className="text-xs text-muted">{message}</p>}
    </div>
  )
}
