'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Input from '@/app/ui/Input'
import Button from '@/app/ui/Button'

export default function PasswordSection() {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const supabase = createClient()

  async function changePassword() {
    if (!current || !next || !confirm) {
      setMessage('Fill in all three fields.')
      return
    }
    if (next !== confirm) {
      setMessage("The new passwords don't match.")
      return
    }
    if (next.length < 8) {
      setMessage('Use at least 8 characters.')
      return
    }
    if (next === current) {
      setMessage('Pick a password different from your current one.')
      return
    }

    setSaving(true)
    setMessage('')
    const { error } = await supabase.auth.updateUser({
      password: next,
      current_password: current,
    })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Password updated ✓')
      setCurrent('')
      setNext('')
      setConfirm('')
    }
    setSaving(false)
  }

  return (
    <div className="flex flex-col gap-2 max-w-sm items-start">
      <Input type="password" autoComplete="current-password" placeholder="Current password"
        value={current} onChange={(e) => setCurrent(e.target.value)} />
      <Input type="password" autoComplete="new-password" placeholder="New password"
        value={next} onChange={(e) => setNext(e.target.value)} />
      <Input type="password" autoComplete="new-password" placeholder="Confirm new password"
        value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      <Button onClick={changePassword} disabled={saving}>
        {saving ? 'Updating...' : 'Change password'}
      </Button>
      {message && <p className="text-xs text-muted">{message}</p>}
    </div>
  )
}
