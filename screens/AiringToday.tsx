import { FlatList, View, Text } from 'react-native'
import { type FavoriteShowProps } from './Favorites'
import { styles } from './styles'
import { TvShow } from './TvShow'

type AiringTodayShowListProps = {
  page: number
  airingTodayShows: AiringTodayShowProps[]
}

type AiringTodayShowProps = FavoriteShowProps

export function AiringTodayScreen ({ page, airingTodayShows }: AiringTodayShowListProps) {
  return (
        <View style={styles.container}>
            <Text>Airing Today Screen</Text>
            <FlatList
                data={airingTodayShows}
                renderItem={({ item }) => <TvShow name={item.name} image={item.image} rating={item.rating} />}
                keyExtractor={item => item.id}
            />
        </View>
  )
}
