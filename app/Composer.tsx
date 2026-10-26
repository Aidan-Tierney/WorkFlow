'use client'
import { useState } from 'react'
import { generateTreeAction } from './actions/ai'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { buildOutline } from '@/app/tree'
import {Paperclip, Sparkles, ArrowUp} from 'lucide-react'
import Button from './ui/Button'

export default function Composer({
  projectId, tasks, preview, setPreview, onDone,
}: {
  projectId: string | null
  tasks: any[]
  preview: any[]
  setPreview: (p: any[]) => void
  onDone?: () => void
}) {
      const [description, setDescription] = useState('')
      const [generating, setGenerating] = useState(false)
      const [message, setMessage] = useState('')
      const [saving, setSaving] = useState(false)
      const [dueDate, setDueDate] = useState('')
      const router = useRouter()
      const supabase = createClient()
    const [file, setFile] = useState<File | null>(null)
  
  async function addTask() {
  const name = description.trim()
  if (!name) return
  setSaving(true)
  const { error } = await supabase.from('tasks').insert({
    task_name: name,
    project_id: projectId,
    task_date: dueDate || null,
  })
  if (error) {
    console.error(error)
    setMessage('Could not add the task')
  } else {
    setDescription('')
    setDueDate('')
    router.refresh()
    onDone?.()
  }
  setSaving(false)
}
function submit(useAI: boolean) {
  if (generating || saving) return          // ignore double-submits while busy
  if (file || useAI) generate()
  else addTask()
}

    async function generate() {
        setGenerating(true)
        setMessage('')
        const formData = new FormData()
        formData.append('description', description)
        formData.append('dueDate', dueDate)
        if (file) formData.append('file', file)
        const { outline, aliasToId } = buildOutline(tasks)
        formData.append('outline', outline)
        const result = await generateTreeAction(formData)




        if (result.error) {
            setMessage(result.error)
        } else if (result.status !== 'ok') {
            setMessage(result.message ?? 'Nothing to add')
        } else {
            const newIds = new Set(result.tasks!.map((t) => t.id))
            const broken = result.tasks!.some((t) =>
                t.parent_id !== null && !aliasToId.has(t.parent_id) && !newIds.has(t.parent_id)
            )
            if (broken) {
                setMessage('The AI made a mistake. Try generating again.')
                setGenerating(false)
                return
            }
            setPreview(result.tasks!.map((t) => ({
                id: `ai-${t.id}`,
                task_name: t.name,
                parent_task_id:
                    t.parent_id === null ? null
                        : aliasToId.has(t.parent_id) ? aliasToId.get(t.parent_id)
                            : `ai-${t.parent_id}`,

                project_id: projectId,
                completed: false,
            })))
        }
        setGenerating(false)
    }
    function discard() {
        setPreview([])
    }
    async function keep() {
        setSaving(true)
        const realId = new Map()
        for (const t of preview) {
            realId.set(t.id, crypto.randomUUID())
        }
        const rows = preview.map((t, i) => ({
            id: realId.get(t.id),
            task_name: t.task_name,
            parent_task_id: t.parent_task_id ? (realId.get(t.parent_task_id) ?? t.parent_task_id) : null,
            project_id: t.project_id,
            created_at: new Date(Date.now()+i).toISOString(),
        }))
        const { error } = await supabase.from('tasks').insert(rows)
        if (error) {
            console.error(error)
            setMessage('Could not save the tasks')
        } else {
            setPreview([])
            setDescription('')
            router.refresh()
            onDone?.()
        }
        setSaving(false)
    }

  return (
    <div className="flex flex-col gap-2">
      <div className="max-w-xl border border-line rounded-xl p-3 flex flex-col gap-2 bg-white focus-within:ring-2 focus-within:ring-accent">
  <textarea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        submit(e.ctrlKey || e.metaKey)
      }
    }}
    placeholder="Add a task, or paste an assignment and press Ctrl+Enter to plan it"
    rows={2}
    className="w-full text-sm outline-none resize-none"
  />

  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <label className="cursor-pointer text-muted hover:text-foreground" title="Attach an assignment PDF">
        <Paperclip size={16} />
        <input type="file" accept="application/pdf" className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      </label>
      {file && (
        <span className="text-xs text-muted truncate max-w-[10rem]">
          {file.name}
          <button onClick={() => setFile(null)} className="ml-1 hover:text-foreground">✕</button>
        </span>
      )}
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
        className="text-xs text-muted border border-line rounded-md px-2 h-7" />
    </div>

    <div className="flex items-center gap-2">
      <button onClick={() => submit(true)} disabled={generating || (!description.trim() && !file)}
        className="flex items-center gap-1 text-sm text-accent hover:underline disabled:opacity-50">
        <Sparkles size={16} /> {generating ? 'Planning...' : 'Plan with AI'}
      </button>
      <button onClick={() => submit(false)} disabled={saving || !description.trim() || !!file}
        className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center disabled:opacity-50">
        <ArrowUp size={16} />
      </button>
    </div>
  </div>
</div>
{message && <p className="">{message}</p>}
      {preview.length > 0 && (
  <div className="flex gap-2 items-center">
    <Button onClick={keep} disabled={saving}>
      {saving ? 'Saving...' : 'Saved'}
    </Button>
    <button onClick={discard}>Discard</button>
  </div>
)}

    </div>
  )
}
