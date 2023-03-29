import { Button, FlatList, Pressable, Text } from 'react-native'
import { SerieMediaObject } from '../components/SerieMediaObject'
import { SeriePosterItem } from '../components/SeriePosterItem'
import styled from 'styled-components/native'
import { BigTitle } from '../components/Legends'

const popularSeries = [
  {
    title: 'Popular',
    data: [
      {
        id: 1,
        name: 'The Walking Dead',
        image: 'https://image.tmdb.org/t/p/w500/8kOWDBK6XlPUzckuHDo3wwVRFwt.jpg',
        rating: 4,
      },
      {
        id: 2,
        name: 'The Flash',
        image: 'https://image.tmdb.org/t/p/w500/lJA2RCMfsWoskqlQhXPSLFQGXEJ.jpg',
        rating: 3,
      },
    ],
  },
]

const recommendedSeries = [
  {
    title: 'Recommendations',
    data: [
      {
        id: 3,
        name: 'The Simpsons',
        image: 'https://image.tmdb.org/t/p/w500/2IWouZK4gkgHhJa3oyYuSWfSqbG.jpg',
        rating: 5,
      },
      {
        id: 4,
        name: 'The Big Bang Theory',
        image: 'https://image.tmdb.org/t/p/w500/ooBGRQBdbGzBxAVfExiO8r7kloA.jpg',
        rating: 4,
      },
      {
        id: 5,
        name: 'The Good Doctor',
        image: 'https://image.tmdb.org/t/p/w500/6tfT03sGp9k4c0J3dypjrI8TSAI.jpg',
        rating: 3,
      },
      {
        id: 6,
        name: 'The Mandalorian',
        image: 'https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg',
        rating: 5,
      },
    ],
  },
]

// View Component full screen dark background
const HomeContainer = styled.View`
  flex: 1;
  background-color: #000;
`

const Container = styled.View`
`

/**
 * This component has two sectionList, one horizontal and one vertical.
 * The horizontal sectionList is scrollable to the left.
 * The vertical sectionList is scrollable to the bottom.
 * Title of first horizontal is "Popular".
 * Title of first vertical is "Recommendations".
 *
 * We display in both sectionList a list of SerieMediaObject.
 *
 * Only use styled components, not import from styles.ts
 *
 * @param param0
 * @returns
 */
export function HomeScreen ({ navigation }) {
  return (
      <HomeContainer>
        <Container>
        <BigTitle>Popular</BigTitle>
        <FlatList
          horizontal
          data={popularSeries}
          renderItem={({ item: { data } }) => {
            return data.map((item) => {
              const isFavorite = item.id === 1
              const itemProps = { ...item, isFavorite }
              return <SeriePosterItem key={item.id} {...itemProps} />
            })
          }}
        />
        </Container>
        <BigTitle>Recommendations</BigTitle>
        <FlatList
          data={recommendedSeries}
          renderItem={({ item: { data } }) => {
            return data.map((item) => {
              const isFavorite = item.id === 3
              const itemProps = { ...item, isFavorite }
              return <SerieMediaObject key={item.id} {...itemProps} />
            })
          }}
        />
      </HomeContainer>
  )
}

const PressableCentered = styled(Pressable)`
  align-items: center;
  justify-content: center;
`

export function TabHeader ({ onPress }) {
  // Pressable with gear icon, onPress should navigate to SettingsScreen
  return (
    <PressableCentered onPress={onPress}>
      <Text>⚙️</Text>
    </PressableCentered>
  )
}
