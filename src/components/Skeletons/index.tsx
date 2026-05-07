import { css, cx } from '@/styled-system/css'

// ---------------------------------------------------------------------------
// Shared primitive helpers
// ---------------------------------------------------------------------------

const pulseClass = css({
  animation: 'pulse 1.8s ease-in-out infinite',
  backgroundColor: 'cardBackground',
  borderRadius: '4px',
})

/** A single shimmering line block */
const line = (w: string, h = '0.875rem') =>
  cx(css({ width: w, height: h, borderRadius: '4px' }), pulseClass)

/** A cluster of tag-pill-shaped blocks */
function TagsSkeleton({ count }: { count: number }) {
  const widths = ['3.5rem', '4.5rem', '3rem', '5rem', '3.75rem', '4rem']
  return (
    <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' })}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cx(
            css({ height: '1.375rem', borderRadius: '3.125rem' }),
            pulseClass,
          )}
          style={{ width: widths[i % widths.length] }}
        />
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// AsideHeader skeleton — mirrors the sticky left-panel layout
// ---------------------------------------------------------------------------

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
      {/* Logo row: circular avatar + name/headline lines */}
      <div className={css({ display: 'flex', alignItems: 'center', gap: '1rem' })}>
        <div
          className={cx(
            css({ width: '3.25rem', height: '3.25rem', borderRadius: '50%', flexShrink: 0 }),
            pulseClass,
          )}
        />
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 })}>
          <div className={line('9rem', '1.375rem')} />
          <div className={line('6.5rem', '0.875rem')} />
        </div>
      </div>

      {/* Bio paragraph lines */}
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.5rem' })}>
        <div className={line('100%')} />
        <div className={line('92%')} />
        <div className={line('78%')} />
      </div>

      {/* Nav item lines */}
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '1rem' })}>
        {(['58%', '72%', '64%'] as const).map((w, i) => (
          <div
            key={i}
            className={css({ display: 'flex', alignItems: 'center', gap: '0.875rem' })}
          >
            <div className={cx(css({ width: '2rem', height: '1px' }), pulseClass)} />
            <div className={line(w, '0.75rem')} />
          </div>
        ))}
      </div>

      {/* Social icon circles */}
      <div className={css({ display: 'flex', gap: '1.5rem', marginTop: 'auto' })}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cx(
              css({ width: '1.5rem', height: '1.5rem', borderRadius: '50%' }),
              pulseClass,
            )}
          />
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// AboutMe skeleton — mirrors the paragraph list in AboutMe
// ---------------------------------------------------------------------------

/** Matches the AboutMe paragraph list layout */
export function AboutMeSkeleton() {
  return (
    <div
      className={css({ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' })}
      aria-hidden="true"
    >
      {/* First paragraph — 4 lines */}
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.4rem' })}>
        <div className={line('100%')} />
        <div className={line('97%')} />
        <div className={line('93%')} />
        <div className={line('70%')} />
      </div>
      {/* Second paragraph — 3 lines */}
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.4rem' })}>
        <div className={line('100%')} />
        <div className={line('95%')} />
        <div className={line('60%')} />
      </div>
      {/* Third paragraph — 4 lines */}
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.4rem' })}>
        <div className={line('100%')} />
        <div className={line('98%')} />
        <div className={line('91%')} />
        <div className={line('55%')} />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// ExperienceList skeleton — mirrors the CardItem "experience" layout
// Each card: [date header] | [title + description lines + skill tags]
// ---------------------------------------------------------------------------

function ExperienceCardSkeleton() {
  return (
    <li
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        sm: { display: 'grid', gridTemplateColumns: 'minmax(200px, 20%) 1fr' },
        lg: { gridTemplateColumns: 'minmax(120px, 20%) 1fr' },
      })}
    >
      {/* Date header */}
      <div className={line('7rem', '0.75rem')} style={{ marginTop: '0.125rem' }} />

      {/* Card body */}
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '1rem' })}>
        {/* Title */}
        <div className={line('65%', '1rem')} />
        {/* Description lines */}
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.4rem' })}>
          <div className={line('100%')} />
          <div className={line('95%')} />
          <div className={line('80%')} />
        </div>
        {/* Skill tags */}
        <TagsSkeleton count={4} />
      </div>
    </li>
  )
}

/** Matches the ExperienceList ordered-list of CardItem[experience] */
export function ExperienceListSkeleton() {
  return (
    <ol
      className={css({ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%' })}
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <ExperienceCardSkeleton key={i} />
      ))}
    </ol>
  )
}

// ---------------------------------------------------------------------------
// ProjectList skeleton — mirrors the CardItem "project" layout
// Each card: [image thumbnail on top] | [title + description + tags]
// ---------------------------------------------------------------------------

function ProjectCardSkeleton() {
  return (
    <li
      className={css({
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: '1rem',
        sm: {
          display: 'grid',
          gridTemplateColumns: 'minmax(200px, 20%) 1fr',
          flexDirection: 'unset',
        },
        lg: { gridTemplateColumns: 'minmax(120px, 20%) 1fr' },
      })}
    >
      {/* Image thumbnail */}
      <div
        className={cx(
          css({
            width: '100%',
            maxWidth: '200px',
            aspectRatio: '16/9',
            borderRadius: '4px',
          }),
          pulseClass,
        )}
      />

      {/* Card body */}
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '1rem' })}>
        {/* Title */}
        <div className={line('70%', '1rem')} />
        {/* Description lines */}
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.4rem' })}>
          <div className={line('100%')} />
          <div className={line('90%')} />
          <div className={line('75%')} />
        </div>
        {/* Tag pills */}
        <TagsSkeleton count={3} />
      </div>
    </li>
  )
}

/** Matches the ProjectList ordered-list of CardItem[project] */
export function ProjectListSkeleton() {
  return (
    <ol
      className={css({ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%' })}
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </ol>
  )
}

// ---------------------------------------------------------------------------
// Generic fallback — kept for backwards compatibility / unknown sections
// ---------------------------------------------------------------------------

/** Generic section content skeleton (fallback) */
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
