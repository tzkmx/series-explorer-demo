import { useEffect } from 'react'
import { FlatList } from 'react-native'
import { SerieMediaObject } from './SerieMediaObject'
import styled from 'styled-components/native'
import { SectionTitle } from './Legends'

export type FavoriteShowProps = {
  id: string
  name: string
  image: string
  rating: number
}

type FavoritesScreenProps = {
  favoriteShows: FavoriteShowProps[]
}

const HomeContainer = styled.View`
  flex: 1;
  background-color: #000;
`

export function FavoritesList ({ favoriteShows }: FavoritesScreenProps) {
  useEffect(() => {
    console.log('FavoritesList', { favoriteShows })
  }, [favoriteShows])

  return (
        <HomeContainer>
            <SectionTitle>Favorites Screen</SectionTitle>
            <FlatList
                data={favoriteShows}
                renderItem={({ item }) => <SerieMediaObject
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    rating={item.rating}
                />}
                keyExtractor={item => item.id}
            />
        </HomeContainer>
  )
}
