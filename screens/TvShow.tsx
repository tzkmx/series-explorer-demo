import React from 'react'
import { View, Image, Text } from 'react-native'
import { styles } from './styles'

interface TvShowProperties {
  name: string
  image: string
  rating: number
}

export function TvShow ({ name, image, rating }: TvShowProperties) {
  return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: image }} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{name}</Text>
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>{rating}</Text>
                </View>
            </View>
        </View>
  )
}
