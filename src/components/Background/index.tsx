import { InteractiveGrid } from './interactive-grid'
import { BackgroundContainer, GridFallback } from './styles'

export function Background() {
  return (
    <BackgroundContainer>
      <GridFallback id="grid-fallback" />
      <InteractiveGrid />
    </BackgroundContainer>
  )
}
