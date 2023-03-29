
import { WelcomeLayout } from '../components/FullScreen'
import { AppColor, Button } from '../components/Button'
import { cavill } from '../components/unauthimage'
import { TextInputField } from '../components/TextInputField'
import { useState } from 'react'
import { PressableLink } from '../components/PressableLink'

// For LoginScreen the sme layout as WelcomeScreen, but with a TextInput
// for name and password, and a button to try actual Login,
// as well as a link to forgot password?
export function LoginScreen ({ navigation }) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  return (
      <WelcomeLayout source={cavill} title={'Welcome!'}>
        <TextInputField
          label="Name"
          placeholder="Name"
          value={name}
          onChangeText={setName}
          autoFocus={true}
          placeholderTextColor={AppColor.gray}
        />
        <TextInputField
          label="Password"
          secureEntry={true}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={AppColor.gray}
        />
        <Button
          title="Login"
          bgColor={AppColor.light}
          onPress={() => navigation.navigate('TabNavigator')}
        />
        <PressableLink
          onPress={() => navigation.navigate('Welcome')}>
            Forgot Password?
        </PressableLink>
      </WelcomeLayout>
  )
}
