'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

export default function ProjectTitle({ id, name }: { id: string; name: string }) {
  const [value, setValue] = useState(name)
  const router = useRouter()

  async function save() {
    const trimmed = value.trim()
    if (!trimmed || trimmed === name) {   // empty, or nothing changed
      setValue(name)                      // put the original back
      return
    }
    const { error } = await supabase.from('projects').update({ project_name: trimmed }).eq('id', id)
    if (error) {
      console.error(error)
      setValue(name)
      return
    }
    router.refresh()                      // so the sidebar shows the new name too
  }

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={save}
      onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur() }}
      className="text-3xl font-semibold w-full bg-transparent outline-none rounded px-1 -mx-1 mb-6"
    />
  )
}
