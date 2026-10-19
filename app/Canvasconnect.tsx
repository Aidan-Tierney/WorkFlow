'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
export default function CanvasConnect() {
  const [url, setUrl] = useState('')     
  const [token, setToken] = useState('')   
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function save() {
    if (!url.trim() || !token.trim()) return  
    setSaving(true)

    const { error } = await supabase
      .from('canvas')
      .upsert({ canvas_url: url, canvas_token: token })
    if (error) {
      console.error(error)
    } else {
      setToken('')                             
    }
    router.refresh()
    setSaving(false)
  }

  return (
    <div>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Canvas URL" />
      <input type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Canvas Token" />
      <button disabled={saving} onClick={save}>
        {saving ? 'Saving...' : 'Save'}
      </button>
    </div>
  )
}

