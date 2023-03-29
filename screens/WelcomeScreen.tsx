import React from 'react'
import { WelcomeLayout } from '../components/FullScreen'
import { AppColor, Button } from '../components/Button'
import { cavill } from '../components/unauthimage'
import { ButtonGroup } from '../components/MiniLayouts'
import { PressableLink } from '../components/PressableLink'

export function WelcomeScreen ({ navigation }) {
  return (
    <WelcomeLayout source={cavill} title={'Welcome!'}>
      <ButtonGroup>
          <Button
              title="Sign up"
              onPress={() => { console.log('SignUp') }} />
          <Button
              title="Log in"
              bgColor={AppColor.light}
              onPress={() => navigation.navigate('Login')} />
          <PressableLink
              onPress={() => { console.log('Forgot Password')}}>
                Forgot Password?
          </PressableLink>
      </ButtonGroup>
    </WelcomeLayout>
  )
}
