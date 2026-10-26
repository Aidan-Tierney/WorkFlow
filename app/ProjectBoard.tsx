'use client'
import { useState } from 'react'
import Workflowview from './Workflowview'
import Button from '@/app/ui/Button'
import { generateTreeAction } from './actions/ai'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { buildOutline } from '@/app/tree'

export default function ProjectBoard({
    tasks, ghostIds, projectId,
}: { tasks: any[]; ghostIds: Set<string>; projectId: string }) {
    const [preview, setPreview] = useState<any[]>([])
    const [description, setDescription] = useState('')
    const [generating, setGenerating] = useState(false)
    const [message, setMessage] = useState('')
    const [saving, setSaving] = useState(false)
    const router = useRouter()
    const supabase = createClient()
    const [file, setFile] = useState<File | null>(null)


    async function generate() {
        setGenerating(true)
        setMessage('')
        const formData = new FormData()
        formData.append('description', description)
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
        }
        setSaving(false)
    }
    return (
        <div className="flex flex-col gap-4">
            <div className="max-w-md flex flex-col gap-2">
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Paste or describe an assignment..."
                    rows={4}
                    className="w-full border border-line rounded-lg p-2 text-sm"
                />
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    className="text-sm text-muted"
                />


                <Button
                    onClick={generate}
                    disabled={generating || (!description.trim() && !file)}
                >
                    {generating ? 'Generating...' : 'Generate with AI'}
                </Button>

                {message && <p className="text-sm text-muted">{message}</p>}
            </div>
            <Workflowview
                tasks={tasks}
                ghostIds={ghostIds}
                previewTasks={preview}
                onAiExtend={(name) => setDescription(`Add steps under "${name}": `)}
            />

            {preview.length > 0 && (
                <div className="flex gap-2">
                    <Button onClick={keep} disabled={saving}>
                        {saving ? 'Saving...' : 'Keep'}
                    </Button>
                    <button onClick={discard} className="text-sm text-muted hover:text-foreground px-3">
                        Discard
                    </button>
                </div>
            )}

        </div>

    )
}