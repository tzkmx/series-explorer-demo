import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const RoundButton = styled(TouchableOpacity)`
  background-color: ${props => props.bgColor || '#ffd233'};
  border-radius: ${props => props.borderRadius || 20}px;
  padding: ${props => props.padding || '12px 24px'};
  margin-bottom: 10px;
`;

const ButtonText = styled.Text`
  color: ${props => props.textColor || '#191919'};
  font-size: ${props => props.fontSize || '16px'};
  font-weight: bold;
  text-align: center;
`;

type ButtonProperties = {
    title: string;
    onPress: () => void;
    bgColor?: string;
    borderRadius?: number;
    padding?: string;
    textColor?: string;
    fontSize?: string;
}

export function Button({ title, onPress, bgColor, borderRadius, padding, textColor, fontSize }: ButtonProperties) {
    return (
        <RoundButton onPress={onPress} bgColor={bgColor} borderRadius={borderRadius} padding={padding}>
            <ButtonText textColor={textColor} fontSize={fontSize}>{title}</ButtonText>
        </RoundButton>
    );
}