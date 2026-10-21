//Button to sync the canvas with the server.
'use client'
import { useState } from 'react'
import {syncCanvas} from '@/app/actions/canvas'
import Button from '@/app/ui/Button'

export default function SyncButton() {
  const [syncing, setSyncing] = useState(false)
  const [message, setMessage] = useState('')

    async function handleSync() {
        setSyncing(true)
        setMessage('')
        const result = await syncCanvas()

    if (result.error) {
        setMessage(`Error: ${result.error}`)
    } else {
        setMessage(`Sync successful! ${result.count} items updated.`)
    }
    setSyncing(false)
}

return (
    <div className="flex flex-col gap-2">
        <Button
            disabled={syncing}
            onClick={handleSync}
        >
            {syncing ? 'Syncing...' : 'Sync Canvas'}
        </Button>
        {message && <p>{message}</p>}
    </div>
)
}