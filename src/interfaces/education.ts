export interface EducationItem {
  id: string
  institution: string
  course: string
  focus: string
  status: 'Em andamento' | 'Concluído'
  period: string
  locationText?: string | null
  description: string
}
