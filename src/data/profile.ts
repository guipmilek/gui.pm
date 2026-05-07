import type { Link } from '@/interfaces/cardItem'

export interface Profile {
  headline: string
  bio: string
  links: Link[]
}

export const profile: Profile = {
  headline: 'Full-stack | React/Next.js | Node.js',
  bio: '👋 Olá! Meu nome é Guilherme, um desenvolvedor apaixonado por explorar o universo dos códigos e encarar desafios.',
  links: [
    { type: 'github', title: 'GitHub', url: 'https://github.com/guipmdev' },
    { type: 'linkedin', title: 'LinkedIn', url: 'https://www.linkedin.com/in/guilhermeprevedamilek' },
    { type: 'youtube', title: 'YouTube', url: 'https://www.youtube.com/@guipmdev' },
    { type: 'email', title: 'E-mail', url: 'mailto:guipm.dev@gmail.com' },
  ],
}
