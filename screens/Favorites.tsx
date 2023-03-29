import { View, FlatList, Text } from 'react-native'
import { styles } from './styles'
import { TvShow } from './TvShow'

export type FavoriteShowProps = {
  id: string
  name: string
  image: string
  rating: number
}

type FavoritesScreenProps = {
  page: number
  favoriteShows: FavoriteShowProps[]
}

export function FavoritesScreen ({ page, favoriteShows }: FavoritesScreenProps) {
  return (
        <View style={styles.container}>
            <Text>Favorites Screen</Text>
            <FlatList
                data={favoriteShows}
                renderItem={({ item }) => <TvShow name={item.name} image={item.image} rating={item.rating} />}
                keyExtractor={item => item.id}
            />
        </View>
  )
}
