import { FlatList, View, Text } from "react-native";
import { FavoriteShowProps } from "./Favorites";
import { styles } from "./styles";
import { TvShow } from "./TvShow";

type AiringLastEpisodesShowListProps = {
    episodes: FavoriteShowProps[];
}

export function AiringLastEpisodesScreen({ episodes }: AiringLastEpisodesShowListProps) {
    return (
        <View style={styles.container}>
            <Text>Airing Last Episodes Screen</Text>
            <FlatList
                data={episodes}
                renderItem={({ item }) => <TvShow name={item.name} image={item.image} rating={item.rating} />}
                keyExtractor={item => item.id}
            />
        </View>
    )
}