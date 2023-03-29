import React from 'react'
import { FullScreen } from '../components/FullScreen'
import { Button } from '../components/Button'
import { cavill } from '../components/unauthimage'
import { ButtonGroup, JustifyBetween } from '../components/MiniLayouts'
import { BigTitle } from '../components/Legends'

export function WelcomeScreen ({ navigation }) {
  return (
    <FullScreen source={cavill}>
      <JustifyBetween>
        <BigTitle>Welcome</BigTitle>
        <JustifyBetween>
        <ButtonGroup>
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('Login')} />
            <Button
                title="Go to SignUp"
                onPress={() => { console.log('SignUp') }} />
        </ButtonGroup>
        </JustifyBetween>
      </JustifyBetween>
    </FullScreen>
  )
}
