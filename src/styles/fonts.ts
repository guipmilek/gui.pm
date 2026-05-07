 
import { Fira_Code, Inter } from 'next/font/google'

import { cx } from '@/styled-system/css'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
})

export const fontClassName = cx(inter.variable, firaCode.variable)
