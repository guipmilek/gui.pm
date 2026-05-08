'use client'

import { createContext, ReactNode, useCallback, useContext, useState } from 'react'

interface ExpandContextData {
  isDescriptionExpanded: boolean
  toggleDescription: () => void
  isTagsExpanded: boolean
  toggleTags: () => void
}

const ExpandContext = createContext<ExpandContextData | null>(null)

export function ExpandProvider({ children }: { children: ReactNode }) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [isTagsExpanded, setIsTagsExpanded] = useState(false)

  const toggleDescription = useCallback(() => {
    setIsDescriptionExpanded((prev) => {
      const next = !prev
      // Expandir ou colapsar a descrição reflete nas pílulas
      setIsTagsExpanded(next)
      return next
    })
  }, [])

  const toggleTags = useCallback(() => {
    // Expandir ou colapsar as pílulas afeta APENAS as pílulas
    setIsTagsExpanded((prev) => !prev)
  }, [])

  return (
    <ExpandContext.Provider
      value={{
        isDescriptionExpanded,
        toggleDescription,
        isTagsExpanded,
        toggleTags,
      }}
    >
      {children}
    </ExpandContext.Provider>
  )
}

export function useExpand() {
  const context = useContext(ExpandContext)
  if (!context) {
    throw new Error('useExpand must be used within an ExpandProvider')
  }
  return context
}
