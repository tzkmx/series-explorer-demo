import React from 'react'
import styled from 'styled-components/native'
import { Rating } from './Rating'

type SeriePosterItemProps = {
  image: string
  name: string
  rating: number
}

const Container = styled.View`
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    width: 150px;
`

const Image = styled.Image`
    width: 120px;
    height: 200px;
    border-radius: 10px;
    resize-mode: contain;
`

const Title = styled.Text`
    font-size: 14px;
    font-weight: semibold;
    margin: 4px 0;
    color: white;
`

export function SeriePosterItem ({ image, name, rating }: SeriePosterItemProps) {
  return (
        <Container>
            <Image source={{ uri: image }} />
            <Title>{name}</Title>
            <Rating rating={rating}/>
        </Container>
  )
}
