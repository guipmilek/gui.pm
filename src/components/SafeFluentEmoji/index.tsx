'use client'

import { FluentEmoji, type FluentEmojiProps } from '@lobehub/fluent-emoji'
import { useEffect, useState } from 'react'

export function SafeFluentEmoji({ emoji, ...props }: FluentEmojiProps) {
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    // Small delay to ensure the browser has painted the static version
    const timer = setTimeout(() => setShowAnimation(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: props.size,
    height: props.size,
    verticalAlign: 'middle',
    ...props.style,
  }

  const staticStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // We fade the static version out with a slight delay
    // so it stays solid while the animation starts to appear,
    // but eventually disappears completely to avoid duplication.
    opacity: showAnimation ? 0 : 1,
    transition: 'opacity 0.4s ease-in-out 0.2s', // 0.2s delay, 0.4s fade out
    pointerEvents: 'none',
    zIndex: 1,
  }

  const animationStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 2,
    opacity: showAnimation ? 1 : 0,
    transition: 'opacity 0.6s ease-in-out',
  }

  return (
    <span style={containerStyle}>
      {/* Static version is always rendered on server/initial hydration */}
      <span style={staticStyle} aria-hidden={true}>
        {emoji}
      </span>

      {/* Animated version is only mounted on client */}
      {showAnimation && (
        <div style={animationStyle}>
          <FluentEmoji emoji={emoji} {...props} style={{ display: 'block' }} />
        </div>
      )}
    </span>
  )
}
