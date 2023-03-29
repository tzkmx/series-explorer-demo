import React, { useCallback, useEffect } from 'react'
import { View, Pressable } from 'react-native'
import styled from 'styled-components/native'
import { SeriesDataMachineCtx } from '../state/series-data-machine'
import { PressableLink } from './PressableLink'
import { Rating } from './Rating'

type SerieMediaObjectProps = {
  id: string | number
  image: string
  name: string
  rating: number
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
export function SerieMediaObject ({ id, image, name, rating }: SerieMediaObjectProps) {
  const actor = SeriesDataMachineCtx.useActorRef()
  const isFavorited = SeriesDataMachineCtx.useSelector(({ context: { favorites }}) => {
    return favorites[id]?.favorited
  })

  useEffect(() => {
    console.log('MediaObject', { id, isFavorited })
  }, [isFavorited])

  const addFavoriteCallback = useCallback(() => {
    console.log('addFavoriteCallback', id)
    actor.send({ type: 'ADD_TO_FAVORITES', seriesId: id, date: new Date() })
  }, [isFavorited])

  const removeFavoriteCallback = useCallback(() => {
    console.log('removeFavoriteCallback', id)
    actor.send({ type: 'REMOVE_FROM_FAVORITES', seriesId: id, date: new Date() })
  }, [isFavorited])

  return (
        <Container>
            <Image source={{ uri: image }} />
            <View style={{ flex: 1, flexDirection: 'column', marginLeft: 10 }}>
                <Title>{name}</Title>
                <Rating rating={rating}/>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <PressableLink onPress={() => {
                  console.log('watch now', id)
                }}>Watch Now</PressableLink>
                <ToggleFavorite id={id} isFavorite={isFavorited}
                  addFavoriteCallback={addFavoriteCallback}
                  removeFavoriteCallback={removeFavoriteCallback}
                />
            </View>
        </Container>
  )
}

type ToggleFavoriteProps = {
  id: string | number
  isFavorite: boolean
  addFavoriteCallback: (id: string | number) => void
  removeFavoriteCallback: (id: string | number) => void
}

const HeartIconWithAir = styled(HeartIcon)`
    margin-top: 10px;
`

function ToggleFavorite ({ id, isFavorite, addFavoriteCallback, removeFavoriteCallback }: ToggleFavoriteProps) {
  return (
    <Pressable
      onPress={() => {
        if (isFavorite) {
          removeFavoriteCallback(id)
        } else {
          addFavoriteCallback(id)
        }
      }}
      >
      <HeartIconWithAir favorited={isFavorite} />
    </Pressable>
  )
}

function HeartIcon ({ favorited }: { favorited: boolean }) {
  return (
    <HeartIconStyled>{ favorited ? '♥' : '♡'}</HeartIconStyled>
  )
}

const HeartIconStyled = styled.Text`
    font-size: 30px;
    color: #ffd233;
`
