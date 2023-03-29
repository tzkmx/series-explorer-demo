import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { WelcomeScreen } from './screens/WelcomeScreen'
import { LoginScreen } from './screens/LoginScreen'
import { TabNavigator } from './nav/TabNavigator'
import { TvShowDetails } from './screens/TvShowDetails'
import { SeriesDataMachineCtx } from './state/series-data-machine'

const Stack = createNativeStackNavigator()

export default function App () {
  return (
    <SeriesDataMachineCtx.Provider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={ { headerShown: false } }>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="ShowDetails" component={TvShowDetails} />
      </Stack.Navigator>
    </NavigationContainer>
    </SeriesDataMachineCtx.Provider>
  )
}
