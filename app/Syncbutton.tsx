'use client'
import { useState } from 'react'
import {syncCanvas} from '@/app/actions/canvas'

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
        <button
            disabled={syncing}
            onClick={handleSync}
        >
            {syncing ? 'Syncing...' : 'Sync Canvas'}
        </button>
        {message && <p>{message}</p>}
    </div>
)
}