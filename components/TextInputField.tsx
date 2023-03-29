import React, { useState } from 'react'
import { TextInput as RNTextInput } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
  margin-bottom: 16px;
`

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
const Label = styled.Text`
  font-size: ${props => props.fontSize || 16}px;
  color: ${props => props.color || '#8c8c8c'};
  margin-bottom: 8px;
`

const TextInput = styled(RNTextInput)`
  height: 40px;
  border-radius: 4px;
  border-style: solid;
  border-color: #8c8c8c;
  border-bottom-width: 2px;
  padding: 8px;
  font-size: ${props => props.fontSize || 16}px;
  color: ${props => props.color || '#191919'};
`

const ErrorText = styled.Text`
  font-size: ${props => props.fontSize || 14}px;
  color: red;
  margin-top: 4px;
`
/* eslint-enable @typescript-eslint/strict-boolean-expressions */

interface TextInputFieldProps {
  label: string
  secureEntry?: boolean
  placeholder: string
  regex?: RegExp
  errorMessage?: string
  onChangeText: (text: string) => void
  value: string
  color?: string
  fontSize?: number
  autoFocus?: boolean
  placeholderTextColor?: string
}

export function TextInputField ({
  label,
  placeholder,
  errorMessage,
  onChangeText,
  value,
  color,
  fontSize,
  regex = /.*/,
  secureEntry = false,
  autoFocus = false,
  placeholderTextColor = '#8c8c8c',
  ...rest
}: TextInputFieldProps) {
  const [error, setError] = useState(false)
  const [withData, setWithData] = useState(false)

  const handleValidation = (text) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    setError(!regex?.test(text))
    setWithData(text.length > 0)
  }

  return (
        <Container>
            {withData
              ? <Label color={color} fontSize={fontSize}>
                {label}
            </Label>
              : null}
            <TextInput
                secureTextEntry={secureEntry}
                value={value}
                autoFocus={autoFocus}
                onBlur={handleValidation}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                color={color}
                fontSize={fontSize}
                {...rest} />
            {error ? <ErrorText>{errorMessage}</ErrorText> : null}
        </Container>
  )
}
