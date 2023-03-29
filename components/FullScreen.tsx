import { ImageBackground } from 'react-native'
import styled from 'styled-components/native'
import { BigTitle } from './Legends'
import { ButtonGroup } from './MiniLayouts'

const FullScreenBackground = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
  align-items: center;
  resize-mode: stretch;
`

const FullScreenContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 30px 0;
`

type FullScreenProps = {
  children: React.ReactNode
  source: any
  title: string
}

export function WelcomeLayout ({ children, source, title }: FullScreenProps) {
  return (
    <FullScreenBackground source={source}>
      <FullScreenContainer>
        <BigTitle>{title}</BigTitle>
        <ButtonGroup>
          {children}
        </ButtonGroup>
      </FullScreenContainer>
    </FullScreenBackground>
  )
}
