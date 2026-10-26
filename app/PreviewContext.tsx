
'use client'
import { createContext, useState } from 'react'

// 1. CREATE: the outlet. The {} is a placeholder default.
export const PreviewContext = createContext<any>({})

// 2. PROVIDE: a component that owns the state and plugs it into the outlet
export default function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [preview, setPreview] = useState<any[]>([])
  return (
    <PreviewContext.Provider value={{ preview, setPreview}}>
      {children}
    </PreviewContext.Provider>
  )
}
