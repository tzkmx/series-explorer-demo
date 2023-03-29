
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TabbedCont } from "../components/TabbedCont"
import { HomeScreen, TabHeader } from '../screens/HomeScreen'

export function TabNavigator () {
    const Tab = createBottomTabNavigator()
    return (
      <Tab.Navigator screenOptions={({ navigation }) => ({
        headerRight: () => <TabHeader onPress={() => navigation.navigate('Welcome')} />
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Favorites" component={TabbedCont} />
        <Tab.Screen name="Recent" component={TabbedCont} />
        <Tab.Screen name="Search" component={TabbedCont} />
      </Tab.Navigator>
    )
  }