import { View, Button, Text } from "react-native";
import { styles } from "./styles";

// Welcome Screen only has a background image full screen,
// a legend saying Welcome and buttons to Login (to Implement)
// and SignUp (not to be implemented yet)
export function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Welcome Screen</Text>
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('Login')} />
            <Button
                title="Go to SignUp"
                onPress={() => console.log('SignUp')} />
        </View>
    )
}