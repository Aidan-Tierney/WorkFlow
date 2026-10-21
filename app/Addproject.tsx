//add project button
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Button from '@/app/ui/Button'
import Input from '@/app/ui/Input'
const supabase = createClient()
export default function Addproject() {
  const [title, setTitle] = useState('')
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  async function add() {
    if (!title.trim()) return
    setSaving(true)
    setTitle('')
    const { error } = await supabase.from('projects').insert({ project_name: title })


    if (error) { setTitle(title)
       console.error(error) }
    router.refresh()
    setSaving(false)
  }


  return (
    <div>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a project"
        
      />
      <Button disabled={saving} onClick={add}>
        {saving ? 'Adding...' : 'Add'}
      </Button>
    </div>
  )
}