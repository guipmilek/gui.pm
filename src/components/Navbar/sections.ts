export interface SectionInfo {
  id: string
  text: string
}

export const sectionInfos: SectionInfo[] = [
  { id: 'about', text: 'SOBRE' },
  { id: 'experience', text: 'EXPERIÊNCIA' },
  { id: 'education', text: 'FORMAÇÃO' },
  { id: 'certifications', text: 'CERTIFICAÇÕES' },
  { id: 'languages', text: 'IDIOMAS' },
  { id: 'projects', text: 'PROJETOS' },
]

export const sectionIds = sectionInfos.map((sectionInfo) => sectionInfo.id)
