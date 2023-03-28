
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TabbedCont } from "../components/TabbedCont"
import { HomeScreen, TabHeader } from '../screens/HomeScreen'

export function TabNavigator () {
    const Tab = createBottomTabNavigator()
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{headerRight: () => <TabHeader />}} />
        <Tab.Screen name="Favorites" component={TabbedCont} options={{headerRight: () => <TabHeader />}} />
        <Tab.Screen name="Recent" component={TabbedCont} options={{headerRight: () => <TabHeader />}} />
        <Tab.Screen name="Search" component={TabbedCont} options={{headerRight: () => <TabHeader />}} />
      </Tab.Navigator>
    )
  }