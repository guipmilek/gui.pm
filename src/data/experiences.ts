import type { Experience } from '@/interfaces/cardItem'

export const experiences: Experience[] = [
  {
    id: '2',
    startMonthYear: { month: 1, year: 2023 },
    endMonthYear: { month: 6, year: 2023 },
    title: 'Instrutor M4 Pleno',
    companyName: 'Kenzie Academy Brasil',
    link: 'https://kenzie.com.br',
    location: { countryCode: 'BR', postalCode: '89506505' },
    locationName: 'Remota',
    description: [
      '- Responsável pela orientação prática de Node.js, TypeScript, Express e integração com bancos de dados PostgreSQL, atuando na prestação de suporte individual aos alunos com dúvidas técnicas em geral.',
      '- Gestão eficiente dos monitores do quarto módulo, fornecimento de feedbacks constante sobre os processos rotineiros da equipe de ensino e sobre os próprios alunos, visando tomadas de decisões.',
      '- Auxílio a todos os desenvolvedores quando necessário e aplicação de melhorias constante dos conteúdos do módulo a cada nova iteração de turma, incluindo gravação de videoaulas.',
      '- Gerenciamento de processos de HTML, CSS e JavaScript, controle de introdução em Programação Orientada a Objetos (POO) e aplicação de entrevistas técnicas para avaliação do Dev durante o módulo.',
      '',
      '🏆 Criação de um serviço web (API) que realizava a extração de boletins da plataforma usada, para a distribuição do conteúdo do curso (Canvas), sendo utilizado como desejasse.',
      '🏆 Desenvolvimento de um curso de curta duração sobre como construir uma API em JAVA, visando as entrevistas de emprego e introdução a tecnologia.',
      '🏆 Produção de conteúdo em vídeo, visando o suporte no entendimento dos alunos com relação aos conteúdos que era inicialmente em texto.',
    ],
    additionalLinks: null,
    skills: ['PostgreSQL', 'TypeORM', 'Node.js', 'TypeScript', 'API REST'],
  },
  {
    id: '1',
    startMonthYear: { month: 3, year: 2022 },
    endMonthYear: { month: 1, year: 2023 },
    title: 'Instrutor M2 Junior',
    companyName: 'Kenzie Academy Brasil',
    link: 'https://kenzie.com.br',
    location: { countryCode: 'BR', postalCode: '89506505' },
    locationName: 'Remota',
    description: [
      '- Orientação prática de HTML, CSS e JS avançados, e POO, bem como melhoria de conteúdos relacionados, além da aplicação de entrevistas técnicas que avaliam o conhecimento do dev.',
      '- Auxílio de alunos com dúvidas técnicas em atividades e projetos, e correção dessas avaliações.',
      '- Gestão de monitores e turmas do segundo módulo.',
    ],
    additionalLinks: null,
    skills: ['Desenvolvimento de front-end', 'Liderança', 'Gestão de equipes', 'Entrevistas', 'Google Apps Script', 'Planilhas Google'],
  },
]
