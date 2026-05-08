import { useEffect, useRef, useState } from 'react'

const TOP_SCROLL_THRESHOLD = 8

export function useActiveItem(
  itemIds: (string | undefined)[],
  defaultActiveItemId?: string,
) {
  const [activeId, setActiveId] = useState<string>(defaultActiveItemId || '')
  const explicitHashTargetRef = useRef<string | null>(null)
  const explicitHashReachedRef = useRef(false)

  useEffect(() => {
    const topItemId = itemIds.find((id): id is string => !!id) || ''
    const isAtPageTop = () => window.scrollY <= TOP_SCROLL_THRESHOLD
    const getCurrentHashId = () => window.location.hash.substring(1)

    const clearExplicitHashTarget = () => {
      explicitHashTargetRef.current = null
      explicitHashReachedRef.current = false
    }

    const clearActiveItem = () => {
      clearExplicitHashTarget()
      setActiveId('')

      if (window.location.hash) {
        const { pathname, search } = window.location
        window.history.replaceState(null, '', `${pathname}${search}`)
      }
    }

    const setExplicitHashTarget = (hashId: string) => {
      explicitHashTargetRef.current = hashId
      explicitHashReachedRef.current = hashId === topItemId && isAtPageTop()
      // Do not set activeId here to allow IntersectionObserver to animate
      // through sections during scroll.
    }

    const preserveExplicitTopHash = () => {
      if (explicitHashTargetRef.current !== topItemId) return false

      explicitHashReachedRef.current = true
      setActiveId(topItemId)

      if (getCurrentHashId() !== topItemId) {
        window.history.replaceState(null, '', `#${topItemId}`)
      }

      return true
    }

    const handleTopPosition = () => {
      if (!preserveExplicitTopHash()) {
        clearActiveItem()
      }
    }

    const handleScroll = () => {
      if (
        explicitHashTargetRef.current === topItemId &&
        explicitHashReachedRef.current &&
        !isAtPageTop()
      ) {
        clearExplicitHashTarget()
      }

      if (isAtPageTop()) {
        handleTopPosition()
      }
    }

    const handleHashChange = () => {
      const hashId = getCurrentHashId()

      if (itemIds.includes(hashId)) {
        setExplicitHashTarget(hashId)
      } else {
        clearExplicitHashTarget()
      }
    }

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]')
      const hashId = anchor?.hash.substring(1)

      if (hashId && itemIds.includes(hashId)) {
        setExplicitHashTarget(hashId)
      }
    }

    if (window.location.hash) {
      const hashId = getCurrentHashId()
      if (itemIds.includes(hashId)) {
        setExplicitHashTarget(hashId)
        setActiveId(hashId)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (isAtPageTop()) {
          handleTopPosition()
          return
        }

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newId = entry.target.id

            if (explicitHashTargetRef.current === newId) {
              explicitHashReachedRef.current = true
            } else {
              clearExplicitHashTarget()
            }

            setActiveId(newId)

            const currentHash = getCurrentHashId()
            if (currentHash !== newId) {
              window.history.replaceState(null, '', `#${newId}`)
            }
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` },
    )

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('hashchange', handleHashChange)
    document.addEventListener('click', handleDocumentClick)

    itemIds.forEach((id) => {
      if (!id) return

      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('hashchange', handleHashChange)
      document.removeEventListener('click', handleDocumentClick)
      observer.disconnect()
    }
  }, [itemIds])

  return activeId
}
