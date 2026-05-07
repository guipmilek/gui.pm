import type { Project } from '@/interfaces/cardItem'

export const projects: Project[] = [
  {
    id: '2',
    imagePath: '/images/guipm-dev.jpeg',
    title: 'guipm.dev',
    link: 'https://guipm.dev',
    description: [
      'Site pessoal desenvolvido com NextJS e uma API JSON Server para fornecimento das informações.',
      'Uma mescla de dois sites que me inspirei muito, trazendo elegância e dinâmica ao conteúdo apresentado!',
    ],
    additionalLinks: [
      { type: 'github', title: 'Repositório', url: 'https://github.com/guipmdev/guipm-dev' },
      { type: 'figma', title: 'Figma', url: 'https://www.figma.com/file/HjCbKGCHj9xffchp1dNpy0/Personal-website-V1' },
    ],
    tags: ['Next.js', 'Panda CSS', 'Figma', 'JSON Server'],
  },
  {
    id: '1',
    imagePath: '/images/borarachar.jpeg',
    title: 'BoraRachar',
    link: 'https://www.borarachar.com.br',
    description: [
      'Aplicação construída em equipe no final do módulo de React da Kenzie Academy Brasil, comprovando todo o conhecimento adquirido.',
      'A missão principal era consumir uma API JSON Server, mas decidimos ir além, construindo uma API Node antes mesmo de estudar sobre!',
    ],
    additionalLinks: [
      { type: 'github', title: 'Repositório', url: 'https://github.com/guipmdev/capstone-m3-borarachar' },
      { type: 'figma', title: 'Figma', url: 'https://www.figma.com/file/7dStA4hOO7fW3WMn9BjVEp/Capstone-M3' },
    ],
    tags: ['React.js', 'Styled-components', 'Figma', 'Node.js'],
  },
]
