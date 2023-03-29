import React from "react";
import { FullScreen } from "../components/FullScreen";
import styled from 'styled-components/native';
import { Button } from "../components/Button";

// styled component for big title white
const BigTitle = styled.Text`
    font-size: 40px;
    color: white;
    font-weight: bold;
    margin-bottom: 20px;
`

// justify between component
const JustifyBetween = styled.View`
    padding: 30% 0;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
`

// component to containt group of buttons with not too much separation
const ButtonGroup = styled.View`
    flex: 1;
    flex-direction: column;
`

const image = require('../images/cavill.jpg')
// Welcome Screen only has a background image full screen,
// a legend saying Welcome and buttons to Login (to Implement)
// and SignUp (not to be implemented yet)
export function WelcomeScreen({ navigation }) {
    return (
    <FullScreen source={image}>
      <JustifyBetween>
        <BigTitle>Welcome</BigTitle>
            <ButtonGroup>
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('Login')} />
            <Button
                title="Go to SignUp"
                onPress={() => console.log('SignUp')} />
            </ButtonGroup>
      </JustifyBetween>  
    </FullScreen>
    )
}