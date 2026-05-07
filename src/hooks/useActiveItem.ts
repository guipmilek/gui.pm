import { useEffect, useState } from 'react'

export function useActiveItem(
  itemIds: (string | undefined)[],
  defaultActiveItemId?: string,
) {
  const [activeId, setActiveId] = useState<string>(defaultActiveItemId || '')

  useEffect(() => {
    if (window.location.hash) {
      const hashId = window.location.hash.substring(1)
      if (itemIds.includes(hashId)) {
        setActiveId(hashId)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` },
    )

    itemIds.forEach((id) => {
      if (!id) return

      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [itemIds])

  return activeId
}
