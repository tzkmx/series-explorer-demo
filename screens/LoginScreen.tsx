
import { Text, TextInput, View } from 'react-native'
import { FullScreen } from '../components/FullScreen'
import { Button } from '../components/Button'
import { cavill } from '../components/unauthimage'
import { styles } from './styles'

// For LoginScreen the sme layout as WelcomeScreen, but with a TextInput
// for email and password, and a button to try actual Login,
// as well as a link to forgot password?
export function LoginScreen ({ navigation }) {
  return (
      <FullScreen source={cavill}>
        <TextInput
          style={styles.loginField}
          placeholder="Email"
        />
        <TextInput
          style={styles.loginField}
          placeholder="Password"
        />
        <Button
          title="Try Login"
          onPress={() => navigation.navigate('TabNavigator')}
        />
        <Button
          title="Forgot Password?"
          onPress={() => { console.log('Forgot Password') }} />
      </FullScreen>
  )
}
