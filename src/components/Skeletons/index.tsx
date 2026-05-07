import { css, cx } from '@/styled-system/css'

const pulseClass = css({
  animation: 'pulse 1.8s ease-in-out infinite',
  backgroundColor: 'cardBackground',
  borderRadius: '4px',
})

const line = (w: string, h = '0.875rem') =>
  cx(
    css({ width: w, height: h, borderRadius: '4px' }),
    pulseClass,
  )

/** Matches the AsideHeader two-column aside layout */
export function AsideHeaderSkeleton() {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%',
      })}
      aria-hidden="true"
    >
      {/* Logo row */}
      <div className={css({ display: 'flex', alignItems: 'center', gap: '1rem' })}>
        <div
          className={cx(
            css({ width: '3rem', height: '3rem', borderRadius: '50%' }),
            pulseClass,
          )}
        />
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.5rem' })}>
          <div className={line('8rem', '1.25rem')} />
          <div className={line('6rem')} />
        </div>
      </div>
      {/* Bio lines */}
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.5rem' })}>
        <div className={line('100%')} />
        <div className={line('90%')} />
        <div className={line('80%')} />
      </div>
      {/* Nav lines */}
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '1rem' })}>
        {(['60%', '70%', '65%'] as const).map((w, i) => (
          <div key={i} className={css({ display: 'flex', alignItems: 'center', gap: '1rem' })}>
            <div className={cx(css({ width: '2rem', height: '1px' }), pulseClass)} />
            <div className={line(w, '0.75rem')} />
          </div>
        ))}
      </div>
    </div>
  )
}

/** Single generic section content skeleton */
export function SectionSkeleton() {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        width: '100%',
      })}
      aria-hidden="true"
    >
      {([0, 1, 2] as const).map((i) => (
        <div key={i} className={css({ display: 'flex', flexDirection: 'column', gap: '0.75rem' })}>
          <div className={line('40%', '1rem')} />
          <div className={line('100%')} />
          <div className={line('95%')} />
          <div className={line('85%')} />
        </div>
      ))}
    </div>
  )
}
