import { useEffect, useRef, useState } from 'react'

const TOP_SCROLL_THRESHOLD = 8

export function useActiveItem(
  itemIds: (string | undefined)[],
  defaultActiveItemId?: string,
) {
  const [activeId, setActiveId] = useState<string>(() => {
    if (typeof window === 'undefined') return defaultActiveItemId || ''

    const hashId = window.location.hash.substring(1)
    return itemIds.includes(hashId) ? hashId : defaultActiveItemId || ''
  })
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

    const setExplicitHashTarget = (hashId: string, updateActive = true) => {
      explicitHashTargetRef.current = hashId
      explicitHashReachedRef.current = hashId === topItemId && isAtPageTop()

      if (updateActive) {
        setActiveId(hashId)
      }
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

    const updateFromAnchorTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return

      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]')
      const hashId = anchor?.hash.substring(1)

      if (hashId && itemIds.includes(hashId)) {
        setExplicitHashTarget(hashId)
      }
    }

    const handleDocumentPointerDown = (event: PointerEvent) => {
      updateFromAnchorTarget(event.target)
    }

    const handleDocumentClick = (event: MouseEvent) => {
      updateFromAnchorTarget(event.target)
    }

    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return

      const target = event.target

      updateFromAnchorTarget(target)
    }

    if (window.location.hash) {
      const hashId = getCurrentHashId()
      if (itemIds.includes(hashId)) {
        setExplicitHashTarget(hashId, false)
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
            const explicitHashTarget = explicitHashTargetRef.current

            if (explicitHashTarget && explicitHashTarget !== newId) {
              return
            }

            clearExplicitHashTarget()

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
    document.addEventListener('pointerdown', handleDocumentPointerDown, {
      passive: true,
    })
    document.addEventListener('click', handleDocumentClick)
    document.addEventListener('keydown', handleDocumentKeyDown)

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
      document.removeEventListener('pointerdown', handleDocumentPointerDown)
      document.removeEventListener('click', handleDocumentClick)
      document.removeEventListener('keydown', handleDocumentKeyDown)
      observer.disconnect()
    }
  }, [itemIds])

  return activeId
}
