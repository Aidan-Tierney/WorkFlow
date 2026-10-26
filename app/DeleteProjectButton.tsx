'use client'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { X } from 'lucide-react'

const supabase = createClient()

export default function DeleteProjectButton({ id, name }: { id: string; name: string }) {
  const router = useRouter()

  async function remove() {
    if (!confirm(`Delete "${name}" and all its tasks?`)) return
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) {
      console.error(error)
      return
    }
    router.refresh()
  }

  return (
    <button onClick={remove} title="Delete project" className="p-1 text-muted hover:text-red-600">
      <X size={16} />
    </button>
  )
}
