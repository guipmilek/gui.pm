import type { Project } from '@/interfaces/cardItem'

export const projects: Project[] = [
  {
    id: '6',
    imagePath: null,
    title: 'Atrol UI Enhancements',
    link: null,
    description: [
      'Desenvolvimento de uma camada de melhorias sobre o sistema legado Atrol/LSWS usando JavaScript, CSS e JSON declarativo.',
      'Padronização de interfaces, tabelas, ações e componentes para reduzir duplicação e tornar a base mais sustentável para evoluções futuras.',
    ],
    additionalLinks: null,
    tags: ['JavaScript', 'CSS', 'JSON', 'SQL', 'Atrol/LSWS', 'UX/UI'],
  },
  {
    id: '5',
    imagePath: null,
    title: 'Servidor de Etiquetas',
    link: null,
    description: [
      'Aplicação Windows desenvolvida em AutoIt para intermediar impressão RAW via TCP local em etiquetadoras térmicas.',
      'Apoio a instalação, diagnóstico de spooler e compatibilidade com diferentes versões do Windows em ambientes heterogêneos.',
    ],
    additionalLinks: null,
    tags: ['AutoIt', 'Windows', 'TCP/IP', 'Impressão RAW', 'Inno Setup'],
  },
  {
    id: '4',
    imagePath: null,
    title: 'Automação de Cadastro de Usuários',
    link: null,
    description: [
      'Centralização do fluxo de cadastro de usuários com validações preventivas, geração automática de padrões e scripts de apoio.',
      'Redução do tempo de cadastro de aproximadamente 15–20 minutos para cerca de 2–3 minutos.',
    ],
    additionalLinks: null,
    tags: ['JavaScript', 'SQL', 'Atrol', 'STT', 'SkyMail'],
  },
  {
    id: '3',
    imagePath: null,
    title: 'Integrações EDI e Migração STT → Atrol',
    link: null,
    description: [
      'Análise de arquivos EDI, validação com SQL/PostgreSQL e correção de divergências em layouts NOTFIS, CONEMB, OCOREN e DOCCOB.',
      'Apoio na migração de aproximadamente 4.000 registros de agendamentos do sistema legado STT para o TMS Atrol.',
    ],
    additionalLinks: null,
    tags: ['SQL', 'PostgreSQL', 'EDI', 'NOTFIS', 'CONEMB', 'OCOREN', 'DOCCOB', 'API/FTP'],
  },
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
