import { Button } from 'react-native'

export function TabbedCont ({ navigation }) {
  return (
      <Button
        title="Go to Welcome"
        onPress={() => navigation.navigate('Welcome')}
      />
  )
}
