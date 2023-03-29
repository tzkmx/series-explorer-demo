import { ActivityIndicator, FlatList, Pressable, Text } from 'react-native'
import { SerieMediaObject } from '../components/SerieMediaObject'
import { SeriePosterItem } from '../components/SeriePosterItem'
import styled from 'styled-components/native'
import { BigTitle } from '../components/Legends'
import { useEffect } from 'react'
import { useMachine, useSelector } from '@xstate/react'
import { seriesDataMachine } from '../state/series-data-machine'

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
  const [seriesState, send, service] = useMachine(seriesDataMachine)
  const loadingPopular = seriesState.matches({ home: { popular: 'loading' } })
  const loadingRecommended = seriesState.matches({ home: { recommended: 'loading' } })

  const popularSeriesApi = useSelector(service, (state) => {
    const items = state.context.popular.items ?? []
    const series = state.context.commonIndex
    return items.map((item) => {
      return { ...series[item] }
    })
  })

  const recommendedSeriesApi = useSelector(service, (state) => {
    const items = state.context.recommended.items ?? []
    const series = state.context.commonIndex
    return items.map((item) => {
      return { ...series[item] }
    })
  })

  let sub
  useEffect(() => {
    sub = service.subscribe((state) => {
      console.log(state.value)
      if (state.changed) {
        console.log(state.context)
      }
    })

    send('LOAD_HOME')

    return () => { sub.unsubscribe() }
  }, [])

  return (
      <HomeContainer>
        <Container>
        <BigTitle>Popular</BigTitle>
        {
          loadingPopular
            ? <ActivityIndicator size="large" color="#fff" />
            : <FlatList
          horizontal
          data={popularSeriesApi}
          renderItem={({ item }) => {
            return <SeriePosterItem key={item.id}
              name={item.name}
              rating={item.vote_average}
              image={getFullImageUrl(item.poster_path)}
            />
          }}
        />
        }
        </Container>
        <BigTitle>Recommendations</BigTitle>
        {
          loadingRecommended
            ? <ActivityIndicator size="large" color="#fff" />
            : <FlatList
          data={recommendedSeriesApi}
          renderItem={({ item }) => {
            const isFavorite = item.id === 3
            return <SerieMediaObject key={item.id}
              id={item.id}
              name={item.name}
              rating={item.vote_average}
              image={getFullImageUrl(item.poster_path)}
              isFavorite={isFavorite}
            />
          }}
        />
      }
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

function getFullImageUrl (path: string, size: string = 'w500') {
  return `https://image.tmdb.org/t/p/${size}/${path}`
}
