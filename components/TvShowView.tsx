import styled from 'styled-components/native'
import { BigTitle } from './Legends'
import { JustifyBetween } from './MiniLayouts'

const HomeContainer = styled.View`
  flex: 1;
  background-color: #000;
`

const ImageContainer = styled.View`
  flex: 1;
  padding: 16px;
  align-items: center;
`

const Image = styled.Image`
  width: 100%;
  height: 70%;
  aspect-ratio: 4/3;
  border-radius: 8px;
`

const Description = styled.Text`
  margin-top: 16px;
  color: white;
  font-weight: bold;
`

const RText = styled.Text`
  color: white;
  font-weight: bold;
`

const DescriptionContainer = styled.View`
  flex: 1;
  padding: 16px;
  color: white;
  align-items: center;
`

export function TvShowView ({ name, image, description, seasons }) {
  return (
        <HomeContainer>
          <JustifyBetween>
            <ImageContainer>
              <Image source={{ uri: image }} />
            </ImageContainer>
            <DescriptionContainer>
              <BigTitle>{name}</BigTitle>
              <Description>{description}</Description>
              <RText>{seasons} temporadas</RText>
            </DescriptionContainer>
          </JustifyBetween>
        </HomeContainer>
  )
}
