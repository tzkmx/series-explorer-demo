import { View, Image, Text } from "react-native";
import { styles } from "./styles";

type TvShowDetailsProperties = {
    name: string;
    image: string;
    description: string;
    seasons: number;
    nextEpisode: string;
    isFavorite: boolean;
}

export function TvShowDetails({ name, image, description, seasons, nextEpisode, isFavorite }: TvShowDetailsProperties) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: image }} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{name}</Text>
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>{seasons}</Text>
                </View>
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>{nextEpisode}</Text>
                </View>
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>{isFavorite}</Text>
                </View>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    )
}