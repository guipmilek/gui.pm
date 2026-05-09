'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import guipmdevLogo from '@/assets/guipmdev-logo.svg'

import { LogoWrapper } from './styles'

// Magnetic pull strength and spring-back config
const PULL_STRENGTH = 0.35
const TILT_STRENGTH = 15 // degrees
const LERP_SPEED = 0.12
const RETURN_LERP = 0.08
const ACTIVATION_RADIUS = 160 // px — cursor influence zone

interface Vec2 {
  x: number
  y: number
}

export function InteractiveLogo() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const rafRef = useRef<number>(0)
  const currentRef = useRef<Vec2>({ x: 0, y: 0 })
  const targetRef = useRef<Vec2>({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
  }, [])

  const animate = useCallback(() => {
    const cur = currentRef.current
    const tgt = targetRef.current
    const speed = hovering ? LERP_SPEED : RETURN_LERP

    cur.x += (tgt.x - cur.x) * speed
    cur.y += (tgt.y - cur.y) * speed

    // Snap to zero when close enough
    if (Math.abs(cur.x) < 0.01 && Math.abs(cur.y) < 0.01 && !hovering) {
      cur.x = 0
      cur.y = 0
    }

    if (imgRef.current) {
      const tiltX = -(cur.y * TILT_STRENGTH)
      const tiltY = cur.x * TILT_STRENGTH
      imgRef.current.style.transform = `translate3d(${cur.x * 20}px, ${cur.y * 20}px, 0) rotate3d(${tiltX}, ${tiltY}, 0, ${Math.sqrt(tiltX * tiltX + tiltY * tiltY)}deg)`
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [hovering])

  useEffect(() => {
    if (prefersReducedMotion.current) return

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [animate])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion.current || !wrapperRef.current) return

      const rect = wrapperRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < ACTIVATION_RADIUS) {
        const strength = (1 - dist / ACTIVATION_RADIUS) * PULL_STRENGTH
        targetRef.current = {
          x: (dx / ACTIVATION_RADIUS) * strength,
          y: (dy / ACTIVATION_RADIUS) * strength,
        }
        if (!hovering) setHovering(true)
      } else {
        targetRef.current = { x: 0, y: 0 }
        if (hovering) setHovering(false)
      }
    },
    [hovering],
  )

  const handleMouseLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0 }
    setHovering(false)
  }, [])

  return (
    <LogoWrapper
      ref={wrapperRef}
      data-hovering={hovering}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        ref={imgRef}
        src={guipmdevLogo}
        alt=""
        title="Logotipo por graphitepoint"
        priority
      />
    </LogoWrapper>
  )
}
