
'use client'
import { createContext, useState } from 'react'

export const PreviewContext = createContext<any>({})


export default function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [preview, setPreview] = useState<any[]>([])
  return (
    <PreviewContext.Provider value={{ preview, setPreview}}>
      {children}
    </PreviewContext.Provider>
  )
}
