'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Workflowview from './Workflowview'
import Composer from './Composer'
import { savePreview } from '@/lib/savePreview'
import { getDescendantIds } from './tree'

export default function ProjectBoard({ tasks, ghostIds, projectId}: { tasks: any[]; ghostIds: Set<string>; projectId: string}) {
  const [preview, setPreview] = useState<any[]>([])
const router = useRouter()

async function handleKeep(){
    const error = await savePreview(preview)
    if (error) {
      console.error(error)
      return                     
    }
    setPreview([])                  // clear the draft
    router.refresh()              // re-fetch from the server so the real ones show
  }
  function handleRemove(id: string) {
  const gone = [id, ...getDescendantIds(id, preview)]
  setPreview(preview.filter((t) => !gone.includes(t.id)))
}

  return (
    <div className="flex flex-col gap-4">
      <Composer tasks={tasks} projectId={projectId} preview={preview} setPreview={setPreview}/>
      <Workflowview ghostIds={ghostIds} tasks={tasks} previewTasks={preview} onKeep={handleKeep} onRemove={handleRemove}/>
    </div>
  )
}
