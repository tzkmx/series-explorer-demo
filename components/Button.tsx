import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

const RoundButton = styled(TouchableOpacity)`
  background-color: ${props => props.bgColor || '#ffd233'};
  border-radius: ${props => props.borderRadius || 20}px;
  padding: ${props => props.padding || '12px 24px'};
  margin-bottom: 10px;
`

const ButtonText = styled.Text`
  color: ${props => props.textColor || '#191919'};
  font-size: ${props => props.fontSize || '16px'};
  font-weight: bold;
  text-align: center;
`

export enum AppColor {
  dark = '#191919',
  light = '#ffffff',
  accent = '#ffd233',
  gray = '#8c8c8c',
}

type ButtonProperties = {
  title: string
  onPress: () => void
  bgColor?: AppColor
  borderRadius?: number
  padding?: string
  textColor?: AppColor
  fontSize?: string
}

export function Button ({ title, onPress, bgColor, borderRadius, padding, textColor, fontSize }: ButtonProperties) {
  return (
        <RoundButton onPress={onPress} bgColor={bgColor} borderRadius={borderRadius} padding={padding}>
            <ButtonText textColor={textColor} fontSize={fontSize}>{title}</ButtonText>
        </RoundButton>
  )
}
