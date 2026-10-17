'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
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
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a project"
        
      />
      <button disabled={saving} onClick={add}>
        {saving ? 'Adding...' : 'Add'}
      </button>
    </div>
  )
}