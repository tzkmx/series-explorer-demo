
import { WelcomeLayout } from '../components/FullScreen'
import { AppColor, Button } from '../components/Button'
import { cavill } from '../components/unauthimage'
import { TextInputField } from '../components/TextInputField'
import { PressableLink } from '../components/PressableLink'
import { useMachine, useSelector } from '@xstate/react'
import { authenticationMachine } from '../state/authentication-machine'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

const LoginError = styled.Text`
  text-align: center;
  color: red;
`

const UsernameInput = ({ setName, name, isLogginIn }) => {
  return (
    <TextInputField
          autoComplete="username"
          autoFocus={true}
          color={AppColor.light}
          disabled={isLogginIn}
          label="Name"
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor={AppColor.gray}
          textContentType="username"
          value={name}
        />
  )
}

const PasswordInput = ({ setPassword, password, isLogginIn }) => {
  return (
    <TextInputField
          autoComplete="password"
          color={AppColor.light}
          disabled={isLogginIn}
          label="Password"
          secureEntry={true}
          onChangeText={setPassword}
          textContentType="password"
          placeholder="Password"
          placeholderTextColor={AppColor.gray}
          value={password}
        />
  )
}

export function LoginScreen ({ navigation }) {
  const [authState, send, service] = useMachine(authenticationMachine, {
    actions: {
      goHome: () => navigation.navigate('TabNavigator', { screen: 'Home' }),
    },
  })

  const setName = (username) => { send({ type: 'SET_USERNAME', username }) }
  const setPassword = (password) => { send({ type: 'SET_PASSWORD', password }) }
  const name = useSelector(service, state => state.context.username ?? '')
  const password = useSelector(service, state => state.context.password ?? '')
  const loginError = useSelector(service, state => state.context.error ?? '')
  const showLoader = useSelector(service, state => state.context.isLoading)
  const isLogginIn = authState.matches('login_attempt')

  return (
      <WelcomeLayout source={cavill} title={'Welcome!'}>
        <UsernameInput
          setName={setName}
          name={name}
          isLogginIn={isLogginIn}
        />
        <PasswordInput
          setPassword={setPassword}
          password={password}
          isLogginIn={isLogginIn}
        />
        <Button
          title='Log in'
          bgColor={AppColor.light}
          onPress={() => send('LOGIN')} />
        {showLoader && <ActivityIndicator />}
        {loginError && <LoginError>{loginError}</LoginError>}
        <PressableLink
            onPress={() => navigation.navigate('Welcome')}>
            Forgot Password?
        </PressableLink>
      </WelcomeLayout>
  )
}
