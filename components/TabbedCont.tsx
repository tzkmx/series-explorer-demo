import { Button } from 'react-native'

export function TabbedCont ({ navigation, route }) {
  const path = route.name
  return (
      <Button
        title="Go to Welcome"
        onPress={() => navigation.navigate('Welcome')}
      />
  )
}
