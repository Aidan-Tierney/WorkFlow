'use client'
import { useContext } from 'react'
import Workflowview from './Workflowview'
import { PreviewContext } from './PreviewContext';
import { useRouter } from 'next/navigation';
import { savePreview } from '@/lib/savePreview';
import { getDescendantIds } from './tree';

export default function DashboardBoard({ tasks, ghostIds }: { tasks: any[]; ghostIds: Set<string> }) {
const router = useRouter()
const { preview, setPreview} = useContext(PreviewContext)
async function handleKeep(){
    const error = await savePreview(preview)
    if (error) {
      console.error(error)
      return                     
    }
    setPreview([])               
    router.refresh()              
  }
  function handleRemove(id: string) {
  const gone = [id, ...getDescendantIds(id, preview)]
  setPreview(preview.filter((t:any) => !gone.includes(t.id)))
}
  return <Workflowview tasks={tasks} ghostIds={ghostIds} previewTasks={preview} onKeep={handleKeep} onRemove={handleRemove}  />
}
