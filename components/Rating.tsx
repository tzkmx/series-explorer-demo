import { View, Text } from 'react-native'
import { AppColor } from './Button'

export function Rating ({ rating }) {
  const stars: JSX.Element[] = []
  for (let i = 0; i < 5; i++) {
    stars.push(<StarIcon key={i} filled={i < rating} />)
  }
  return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {stars}
          </View>
  )
}

function StarIcon ({ filled }: { filled: boolean }) {
  return (
      <Text style={{ fontSize: 20, color: filled ? '#8c8c8c' : AppColor.dark }}>★</Text>
  )
}
