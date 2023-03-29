import { ImageBackground, Image } from 'react-native';
import styled from 'styled-components/native';

const FullScreenBackground = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
  align-items: center;
  resize-mode: stretch;
`;

const FullScreenContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`

const BgImage = styled(Image)`
    flex: 1;
    resizeMode: stretch;
    justifyContent: center;
`

export const FullScreen = ({ children, source }) => {
  return (
    <FullScreenBackground source={source}>
        <FullScreenContainer>        
            {children}
        </FullScreenContainer>
    </FullScreenBackground>
  );
};




