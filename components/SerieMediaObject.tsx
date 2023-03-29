import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'
import { Rating } from './Rating'

type SerieMediaObjectProps = {
  id: string | number
  image: string
  name: string
  rating: number
  isFavorite: boolean
}

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 10px 0;
`

const Image = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 10px;
`

const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-left: 10px;
    color: white;
`

/**
 * The media object has two columns, one left with the image and one right with the title and rating
 * and link to watchNow and add to favorites, with the heart showing if it is already a favorite.
 *
 */
export function SerieMediaObject ({ image, name, rating, isFavorite }: SerieMediaObjectProps) {
  return (
        <Container>
            <Image source={{ uri: image }} />
            <View style={{ flex: 1, flexDirection: 'column', marginLeft: 10 }}>
                <Title>{name}</Title>
                <Rating rating={rating}/>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Text style={{ color: '#8c8c8c' }}>Watch Now</Text>
                <HeartIcon favorited={isFavorite}/>
            </View>
        </Container>
  )
}

function HeartIcon ({ favorited }: { favorited: boolean }) {
  return (
    <HeartIconStyled>{ favorited ? '♥' : '♡'}</HeartIconStyled>
  )
}

const HeartIconStyled = styled.Text`
    font-size: 20px;
    color: #ffd233;
`
