import { cva } from '@/styled-system/css'

export const sectionTitleContainerStyles = cva({
  base: {
    display: 'block',
    position: 'sticky',
    isolation: 'isolate',
    top: 0,
    zIndex: 10,
    overflow: 'visible',

    lg: { display: 'none' },

    width: '100%',

    padding: 0,

    color: 'title',
    textStyle: 'sm',
    fontWeight: 'bold',

    '& h2': {
      position: 'relative',
      zIndex: 1,
      minWidth: 0,
      margin: 0,
      lineHeight: 1,
    },

    '& .mobile-section-header-row': {
      position: 'relative',
      zIndex: 1,

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '0.75rem',

      minHeight: '2.375rem',
    },

    '& .mobile-section-picker': {
      position: 'relative',
      minWidth: 0,
      flex: '1 1 auto',
    },

    '& .mobile-section-picker-trigger': {
      appearance: 'none',
      WebkitAppearance: 'none',

      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.375rem',

      maxWidth: '100%',
      marginLeft: '-0.375rem',
      padding: '0.25rem 0.375rem',
      border: 0,
      borderRadius: '0.5rem',

      background: 'transparent',
      color: 'inherit',

      textStyle: 'sm',
      fontWeight: 'bold',
      textAlign: 'left',

      cursor: 'pointer',
      transform: 'translate3d(0, 0, 0)',
      transition:
        'color 0.18s ease-out, background-color 0.18s ease-out, transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',

      '& .mobile-section-picker-arrow': {
        display: 'grid',
        placeItems: 'center',
        flex: '0 0 auto',
        width: '1rem',
        height: '1rem',

        opacity: 0,
        transform: 'translate3d(-0.25rem, 0, 0) scale(0.7)',
        filter: 'blur(4px)',
        color: 'currentColor',
        transition:
          'opacity 0.26s cubic-bezier(0.16, 1, 0.3, 1), transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), filter 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
      },

      '& .mobile-section-picker-arrow svg': {
        flex: '0 0 auto',
        transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
      },

      '&:disabled': {
        cursor: 'default',
      },

      '&:focus-visible': {
        outline: '1px solid',
        outlineColor: 'primary',
        outlineOffset: '0.125rem',
        color: 'primary',
      },

      '@media (hover: hover) and (pointer: fine)': {
        '&:hover:not(:where(.hover-stale *)), &.scroll-hover': {
          color: 'primary',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          transform: 'translate3d(0.125rem, 0, 0)',
        },
      },
    },

    '& .mobile-section-picker-title': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },

    '& .mobile-section-picker.is-open .mobile-section-picker-trigger': {
      color: 'primary',

      '& .mobile-section-picker-arrow svg': {
        transform: 'rotate(180deg)',
      },
    },

    '&.pinned .mobile-section-picker-arrow, & .mobile-section-picker.is-pinned .mobile-section-picker-arrow': {
      opacity: 1,
      transform: 'translate3d(0, 0, 0) scale(1)',
      filter: 'blur(0)',
      transitionDelay: '120ms, 120ms, 120ms',
    },

    '& .mobile-section-picker-menu-shell': {
      position: 'absolute',
      top: 'calc(100% + 0.625rem)',
      left: '-0.375rem',
      zIndex: 20,

      width: 'min(17rem, calc(100vw - (var(--layout-x) * 2)))',

      animation: 'mobileSectionPickerIn 0.24s cubic-bezier(0.16, 1, 0.3, 1) both',
      transformOrigin: 'left top',
    },

    '& .mobile-section-picker-menu': {
      width: '100%',
      boxShadow: '0 18px 42px rgba(0, 0, 0, 0.26)',
    },

    '& .mobile-section-picker-menu .glass-ui-card-content': {
      position: 'relative',
      zIndex: 1,
      padding: '0.45rem',
    },

    '& .mobile-section-picker-options': {
      display: 'grid',
      gap: '0.125rem',
    },

    '& .mobile-section-picker-option': {
      display: 'flex',
      alignItems: 'center',
      gap: '0.625rem',

      minHeight: '2.25rem',
      padding: '0.4rem 0.55rem',
      borderRadius: '0.625rem',

      color: 'text',
      textStyle: 'xs',
      fontWeight: 'bold',
      textDecoration: 'none',

      transition:
        'color 0.18s ease-out, background-color 0.18s ease-out, transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',

      '&:focus-visible': {
        outline: '1px solid',
        outlineColor: 'primary',
        outlineOffset: '0.125rem',
        color: 'primary',
      },

      '@media (hover: hover) and (pointer: fine)': {
        '&:hover:not(:where(.hover-stale *)), &.scroll-hover': {
          color: 'title',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          transform: 'translate3d(0.125rem, 0, 0)',
        },
      },
    },

    '& .mobile-section-picker-option-line': {
      flex: '0 0 auto',
      width: '1.25rem',
      height: '1px',
      backgroundColor: 'subtitle',
      transition:
        'width 0.28s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.18s ease-out',
    },

    '& .mobile-section-picker-option.is-active': {
      color: 'primary',
      backgroundColor: 'rgba(125, 211, 252, 0.075)',

      '& .mobile-section-picker-option-line': {
        width: '2rem',
        backgroundColor: 'primary',
      },
    },

    '& .mobile-section-logo': {
      display: 'grid',
      placeItems: 'center',
      flex: '0 0 auto',
      width: '2.125rem',
      height: '2.125rem',

      visibility: 'hidden',
      opacity: 0,
      pointerEvents: 'none',
      transform: 'translate3d(0.75rem, -0.125rem, 0) scale(0.76)',
      filter: 'blur(6px)',
      transition:
        'opacity 0.32s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s cubic-bezier(0.16, 1, 0.3, 1), visibility 0s linear 0.4s',
    },

    '&.pinned .mobile-section-logo': {
      visibility: 'visible',
      opacity: 1,
      pointerEvents: 'auto',
      transform: 'translate3d(0, 0, 0) scale(1)',
      filter: 'blur(0)',
      transitionDelay: '80ms, 80ms, 80ms, 0s',
    },

    '& .header-glass-card': {
      '--section-header-glass-opacity': '0',
      '--section-header-glass-y': '-0.375rem',

      width: 'calc(100% + (var(--layout-x) * 2))',
      marginLeft: 'calc(var(--layout-x) * -1)',
      borderRadius: '0 !important',

      '& .glass-liquid-surface': {
        opacity: 'var(--section-header-glass-opacity)',
        transform: 'translate3d(0, var(--section-header-glass-y), 0)',
        willChange: 'opacity, transform',
      },

      '& .glass-ui-card-content': {
        position: 'relative',
        zIndex: 1,
        padding: '0.875rem var(--layout-x)',
        overflow: 'visible !important',
      },
    },

    '&.pinned .header-glass-card': {
      '--section-header-glass-opacity': '1',
      '--section-header-glass-y': '0',
    },

    '@media (prefers-reduced-motion: reduce)': {
      '& .header-glass-card .glass-liquid-surface': {
        transition: 'none !important',
        transform: 'none',
        willChange: 'auto',
      },

      '& .mobile-section-picker-trigger, & .mobile-section-picker-arrow, & .mobile-section-picker-trigger svg, & .mobile-section-picker-option, & .mobile-section-picker-option-line, & .mobile-section-logo': {
        transition: 'none !important',
      },

      '& .mobile-section-picker-menu-shell, &.pinned .mobile-section-logo, &.pinned .mobile-section-picker-arrow': {
        animation: 'none !important',
      },

      '&.pinned .mobile-section-picker-arrow': {
        opacity: 1,
        transform: 'none',
        filter: 'none',
      },

      '&.pinned .mobile-section-logo': {
        opacity: 1,
        transform: 'none',
        filter: 'none',
      },
    },
  },
})
