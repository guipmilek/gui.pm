import type { Link } from '@/interfaces/cardItem'

export interface Profile {
  name: string
  fullName: string
  headline: string
  bio: string
  links: Link[]
}

export const profile: Profile = {
  name: 'Guilherme Milék',
  fullName: 'Guilherme Preveda Milék',
  headline: 'Analista de Suporte e Desenvolvimento Interno',
  bio: '👋 Atuo entre suporte, operação e desenvolvimento, transformando problemas recorrentes em ferramentas, automações e melhorias para sistemas internos.',
  links: [
    { type: 'github', title: 'GitHub', url: 'https://github.com/guipmdev' },
    { type: 'linkedin', title: 'LinkedIn', url: 'https://www.linkedin.com/in/guilhermeprevedamilek' },
    { type: 'whatsapp', title: 'WhatsApp', url: 'https://wa.me/5549984090926' },
    { type: 'youtube', title: 'YouTube', url: 'https://www.youtube.com/@guipmdev' },
    { type: 'email', title: 'E-mail', url: 'mailto:guilhermeprevedamilek@gmail.com' },
    { type: 'website', title: 'guipm.dev', url: 'https://guipm.dev' },
  ],
}
