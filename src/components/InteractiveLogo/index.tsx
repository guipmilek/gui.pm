'use client'

import { MouseEvent, PointerEvent, useEffect, useId, useRef } from 'react'

import { LogoWrapper } from './styles'

const MAIN_MARK_PATH =
  'M294.48,200c0,9.61-1.44,18.87-4.1,27.61-6.33,33.27-30.58,55.6-61.22,62.28-9.18,2.98-18.98,4.59-29.16,4.59h0,0c-52.18,0-94.48-42.3-94.48-94.48,0-42.4,27.92-78.27,66.38-90.23,6.66-2.07,13.63-3.42,20.83-3.97,2.4-.18,4.82-.28,7.27-.28.98,0,1.96.02,2.94.05.28,0,.57.02.85.03.73.03,1.46.07,2.19.11.27.02.55.03.82.05.97.07,1.94.15,2.9.25.02,0,.04,0,.05,0,.95.1,1.89.21,2.83.34.25.03.5.07.75.11.76.11,1.51.22,2.27.35.22.04.43.07.65.11,1.93.33,3.84.73,5.73,1.18.18.04.36.09.53.13.83.2,1.66.42,2.48.64.12.03.24.06.35.1,1.94.54,3.85,1.14,5.73,1.79.07.03.15.05.22.08,21.42,7.52,39.32,22.54,50.53,41.92l91.35-52.74C338.6,40.24,274.02,0,200,0,89.54,0,0,89.54,0,200s89.54,200,200,200,200-89.54,200-200h-105.52ZM295.09,328.74c0-16.56-13.43-29.99-29.99-29.99,16.56,0,29.99-13.43,29.99-29.99,0,16.56,13.43,29.99,29.99,29.99-16.56,0-29.99,13.43-29.99,29.99Z'

const HELMET_CENTER_PATH =
  'M200,221c11.6,0,21-9.4,21-21s-9.4-21-21-21-21,9.4-21,21,9.4,21,21,21ZM216.05,204.12c-.64-10.1-8.01-18.56-17.92-20.59,11.42-.89,20.37,9.41,17.92,20.59Z'

const HELMET_SHELL_PATH =
  'M294.48,200h-63.33c0,17.17-13.97,31.15-31.15,31.15-4.25,0-8.31-.86-12.01-2.41,0,0,0,0,0,0,0,0,0,0,0,0-11.23-4.71-19.14-15.82-19.14-28.74,0-7.23,2.49-13.89,6.64-19.19-6.24,6.26-9.8,15.1-9.01,24.57,1.05,12.65,9.57,22.92,20.85,26.85,0,0,0,0,0,0-5.75,34.63,12.66,62.24,12.66,62.25h0c10.18,0,19.97-1.62,29.16-4.59-8.4,1.83-17.29,2.49-26.42,1.86,32.76-5.61,77.77-23.37,89.01-89.01.6,8.84.1,17.14-1.37,24.86,2.66-8.73,4.1-18,4.1-27.61Z'

const LOGO_IGNITE_EVENT = 'guipm:logo-ignite'

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

interface InteractiveLogoProps {
  className?: string
  tabIndex?: number
  variant?: 'default' | 'compact'
}

export function InteractiveLogo({
  className,
  tabIndex,
  variant = 'default',
}: InteractiveLogoProps) {
  const wrapperRef = useRef<HTMLButtonElement>(null)
  const entranceTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const igniteTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const isIgnitingRef = useRef(false)
  const uniqueId = useId().replace(/:/g, '')

  const helmetGlowId = `logo-helmet-glow-${uniqueId}`
  const sparkGlowId = `logo-spark-glow-${uniqueId}`

  useEffect(() => {
    const element = wrapperRef.current
    if (!element) return

    element.classList.add('is-entering')
    entranceTimeoutRef.current = setTimeout(() => {
      element.classList.remove('is-entering')
    }, 1600)

    return () => {
      clearTimeout(entranceTimeoutRef.current)
      clearTimeout(igniteTimeoutRef.current)
    }
  }, [])

  function setPointerVars(clientX: number, clientY: number) {
    const element = wrapperRef.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return

    const x = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100)
    const y = clamp(((clientY - rect.top) / rect.height) * 100, 0, 100)

    element.style.setProperty('--logo-pointer-x', `${x}%`)
    element.style.setProperty('--logo-pointer-y', `${y}%`)
    element.style.setProperty('--logo-tilt-x', `${(50 - y) * 0.12}deg`)
    element.style.setProperty('--logo-tilt-y', `${(x - 50) * 0.14}deg`)
  }

  function resetPointerVars() {
    const element = wrapperRef.current
    if (!element) return

    element.style.setProperty('--logo-pointer-x', '50%')
    element.style.setProperty('--logo-pointer-y', '45%')
    element.style.setProperty('--logo-tilt-x', '0deg')
    element.style.setProperty('--logo-tilt-y', '0deg')
  }

  function ignite() {
    const element = wrapperRef.current
    if (!element) return
    if (isIgnitingRef.current) return

    isIgnitingRef.current = true

    const rect = element.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    window.dispatchEvent(
      new CustomEvent(LOGO_IGNITE_EVENT, {
        detail: { x, y },
      }),
    )

    clearTimeout(igniteTimeoutRef.current)
    clearTimeout(entranceTimeoutRef.current)
    element.classList.remove('is-entering')
    element.classList.add('is-igniting')

    igniteTimeoutRef.current = setTimeout(() => {
      isIgnitingRef.current = false
      element.classList.remove('is-igniting')
    }, 900)
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return

    setPointerVars(event.clientX, event.clientY)
  }

  function handlePointerLeave() {
    resetPointerVars()
  }

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return

    if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
      setPointerVars(event.clientX, event.clientY)
    } else {
      resetPointerVars()
    }
  }

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (event.detail > 0) {
      setPointerVars(event.clientX, event.clientY)
    } else {
      resetPointerVars()
    }

    ignite()
  }

  return (
    <LogoWrapper
      ref={wrapperRef}
      type="button"
      className={['hoverable', className].filter(Boolean).join(' ')}
      tabIndex={tabIndex}
      data-variant={variant === 'compact' ? 'compact' : undefined}
      aria-label="Acionar animação do logotipo"
      title="Logotipo por graphitepoint"
      onPointerEnter={handlePointerMove}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
    >
      <span className="logo-field" aria-hidden="true" />

      <svg
        className="logo-svg"
        viewBox="0 0 400 400"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <radialGradient id={helmetGlowId} cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.98)" />
            <stop offset="38%" stopColor="rgba(186, 230, 253, 0.72)" />
            <stop offset="72%" stopColor="rgba(14, 165, 233, 0.18)" />
            <stop offset="100%" stopColor="rgba(14, 165, 233, 0)" />
          </radialGradient>

          <radialGradient id={sparkGlowId} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
            <stop offset="42%" stopColor="rgba(224, 242, 254, 0.86)" />
            <stop offset="100%" stopColor="rgba(14, 165, 233, 0)" />
          </radialGradient>
        </defs>

        <g className="logo-light-layer">
          <circle
            className="logo-helmet-glow"
            cx="200"
            cy="200"
            r="56"
            fill={`url(#${helmetGlowId})`}
          />
          <circle
            className="logo-spark-glow"
            cx="295.09"
            cy="298.75"
            r="34"
            fill={`url(#${sparkGlowId})`}
          />

          <g className="logo-helmet-orbit">
            <circle cx="200" cy="200" r="36" />
            <path d="M200 164c19.88 0 36 16.12 36 36" />
            <path d="M174 186c8.6-13.6 28.2-17.1 41.3-7.2" />
            <circle className="logo-helmet-glint" cx="225" cy="181" r="5" />
          </g>
        </g>

        <path className="logo-mark" d={MAIN_MARK_PATH} />

        <g className="logo-helmet-details">
          <path d={HELMET_CENTER_PATH} />
          <path d={HELMET_SHELL_PATH} />
        </g>

        <path className="logo-rim" d={MAIN_MARK_PATH} />
      </svg>
    </LogoWrapper>
  )
}
