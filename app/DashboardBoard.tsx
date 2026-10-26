'use client'
import { useContext } from 'react'
import Workflowview from './Workflowview'
import { PreviewContext } from './PreviewContext';

export default function DashboardBoard({ tasks, ghostIds }: { tasks: any[]; ghostIds: Set<string> }) {
  const { preview } = useContext(PreviewContext)
  return <Workflowview tasks={tasks} ghostIds={ghostIds} previewTasks={preview} />
}
