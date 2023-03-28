
import { Button, Text, TextInput, View } from "react-native"
import { styles } from "./styles"

// For LoginScreen the sme layout as WelcomeScreen, but with a TextInput
// for email and password, and a button to try actual Login,
// as well as a link to forgot password?
export function LoginScreen ({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>Login Screen</Text>
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
          onPress={() => console.log('Forgot Password')} />
      </View>
    )
  }