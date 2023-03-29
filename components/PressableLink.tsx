import React, { useState } from 'react'
import styled from 'styled-components/native'
import { AppColor } from './Button'

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
const LinkText = styled.Text`
  color: ${props => props.isPressed ? AppColor.accent : AppColor.light};
  text-decoration-line: underline;
  text-align: center;
`

const PressableBackgroundSwitch = styled.Pressable`
  background-color: ${props => props.isPressed ? '#999999' : 'transparent'};
  padding: 5px;
  border-radius: 5px;
`
/* eslint-enable @typescript-eslint/strict-boolean-expressions */

export function PressableLink ({ onPress, children }) {
  const [isPressed, setIsPressed] = useState(false)

  return (
        <PressableBackgroundSwitch
            onPress={onPress}
            onPressIn={() => { setIsPressed(true) }}
            onPressOut={() => { setIsPressed(false) }}
            isPressed={isPressed}
        >
            <LinkText isPressed={isPressed}>
                {children}
            </LinkText>
        </PressableBackgroundSwitch>
  )
}
