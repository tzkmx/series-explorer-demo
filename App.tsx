import React from 'react'
import { Button, StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Stack = createNativeStackNavigator()

const Tab = createBottomTabNavigator()

// write typeScript definition according to usage as children of navigator
const TabbedCont: React.FC<{ navigation: any, route: any }>
 = ({ navigation, route }) => {
  const path = route.name
  return (
    <View style={styles.container}>
      <Text>Tabbed Screen {path}</Text>
      <Button
        title="Go to Welcome"
        onPress={() => navigation.navigate('Welcome')}
      />
    </View>
  )
}

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={TabbedCont} options={{header: TabHeader}} />
      <Tab.Screen name="Recent" component={TabbedCont} options={{header: TabHeader}} />
      <Tab.Screen name="Search" component={TabbedCont} options={{header: TabHeader}} />
    </Tab.Navigator>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
})

// Welcome Screen only has a background image full screen,
// a legend saying Welcome and buttons to Login (to Implement)
// and SignUp (not to be implemented yet)
const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome Screen</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Go to SignUp"
        onPress={() => console.log('SignUp')} />
    </View>
  )
}

// For LoginScreen the sme layout as WelcomeScreen, but with a TextInput
// for email and password, and a button to try actual Login,
// as well as a link to forgot password?
const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <TextInput
        style={styles.loginField}
        placeholder="Email"
      />
      <TextInput
        style={styles.loginField}
        placeholder="Password"
      />
      <Button
        title="Try Login"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Forgot Password?"
        onPress={() => console.log('Forgot Password')} />
    </View>
  )
}

// For HomeScreen a layout of two ScrollViews, a horizontal one for popular TV series,
// and a vertical one for recommended series
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={{ backgroundColor: 'red', width: 200, height: 100 }} />
        <View style={{ backgroundColor: 'blue', width: 200, height: 100 }} />
        <View style={{ backgroundColor: 'green', width: 200, height: 100 }} />
        <View style={{ backgroundColor: 'yellow', width: 200, height: 100 }} />
        <View style={{ backgroundColor: 'orange', width: 200, height: 100 }} />
      </ScrollView>
      <ScrollView>
        <View style={{ backgroundColor: 'red', width: 200, height: 100 }} />
        <View style={{ backgroundColor: 'blue', width: 200, height: 100 }} />
        <View style={{ backgroundColor: 'green', width: 200, height: 100 }} />
        <View style={{ backgroundColor: 'yellow', width: 200, height: 100 }} />
        <View style={{ backgroundColor: 'orange', width: 200, height: 100 }} />
      </ScrollView>
    </View>
  )
}


// Component for Tab Headers with a Button to Logout, that sends me back to WelcomeScreen
const TabHeader = ({ navigation, route }) => {

  return (
    <View>
      <Text>{route.name}</Text>
      <Button
        title="Logout"
        onPress={() => navigation.navigate('Welcome')}
      />
    </View>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={ { headerTitle: '' } }>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}