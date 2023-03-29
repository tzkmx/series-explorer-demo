import { ActivityIndicator, FlatList, Pressable, Text } from 'react-native'
import { SerieMediaObject } from '../components/SerieMediaObject'
import { SeriePosterItem } from '../components/SeriePosterItem'
import styled from 'styled-components/native'
import { SectionTitle } from '../components/Legends'
import { useEffect } from 'react'
import { SeriesDataMachineCtx } from '../state/series-data-machine'
import { seriesDataListBuilder } from '../api_modules/mappers'

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
  const [seriesState, send] = SeriesDataMachineCtx.useActor()
  const loadingPopular = seriesState.matches({ home: { popular: 'loading' } })
  const loadingRecommended = seriesState.matches({ home: { recommended: 'loading' } })

  const popularSeriesApi = SeriesDataMachineCtx.useSelector((state) =>
    seriesDataListBuilder(state, 'popular'))

  const recommendedSeriesApi = SeriesDataMachineCtx.useSelector((state) =>
    seriesDataListBuilder(state, 'recommended'))

  useEffect(() => {
    send('LOAD_HOME')
  }, [])

  return (
      <HomeContainer>
        <Container>
        <SectionTitle>Popular</SectionTitle>
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
              image={item.poster_path}
            />
          }}
        />
        }
        </Container>
        <SectionTitle>Recommendations</SectionTitle>
        {
          loadingRecommended
            ? <ActivityIndicator size="large" color="#fff" />
            : <FlatList
          data={recommendedSeriesApi}
          renderItem={({ item }) => {
            return <SerieMediaObject key={item.id}
              id={item.id}
              name={item.name}
              rating={item.vote_average}
              image={item.poster_path}
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
