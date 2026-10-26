'use client'
import { useState } from 'react'
import Workflowview from './Workflowview'
import Composer from './Composer'

export default function ProjectBoard({ tasks, ghostIds, projectId }: { tasks: any[]; ghostIds: Set<string>; projectId: string }) {
  const [preview, setPreview] = useState<any[]>([])

  return (
    <div className="flex flex-col gap-4">
      <Composer tasks={tasks} projectId={projectId} preview={preview} setPreview={setPreview}/>
      <Workflowview ghostIds={ghostIds} tasks={tasks} previewTasks={preview} />
    </div>
  )
}
