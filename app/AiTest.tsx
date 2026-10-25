//Button to sync the canvas with the server.
'use client'
import { useState } from 'react'
import {generateTreeAction} from '@/app/actions/ai'
import Button from '@/app/ui/Button'

export default function AiTest() {
  const [syncing, setSyncing] = useState(false)
  const [message, setMessage] = useState('')
  const [description, setDescription] = useState('')

    async function handleSync() {
        setSyncing(true)
        setMessage('')
        setDescription('')
        const result = await generateTreeAction(description)

    if (result.error) {
        setMessage(`Error: ${result.error}`)
    } else {
        setMessage(`Status: ${result.status}, ${result.tasks} tasks`)
    }
    setSyncing(false)
}

return (
    <div className="flex flex-col gap-2">
        <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Describe an assignment..."
  rows={4}
  className="w-full border border-line rounded-lg p-2 text-sm"
/>

        <Button
            disabled={syncing || !description.trim()}
            onClick={handleSync}
        >
            {syncing ? 'Syncing...' : 'Sync Canvas'}
        </Button>
        {message && <p>{message}</p>}
    </div>
)
}