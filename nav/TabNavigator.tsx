
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AppColor } from '../components/Button'
import { TabbedCont } from '../components/TabbedCont'
import { HomeScreen, TabHeader } from '../screens/HomeScreen'
import styled from 'styled-components/native'
import { SeriesDataMachineCtx } from '../state/series-data-machine'

export function TabNavigator () {
  const Tab = createBottomTabNavigator()
  return (
    <SeriesDataMachineCtx.Provider>
      <Tab.Navigator
        screenOptions={({ navigation }) => ({
          headerRight: () => <TabHeader onPress={() => navigation.navigate('Welcome')} />,
          tabBarActiveBackgroundColor: AppColor.gray,
          tabBarInactiveBackgroundColor: AppColor.dark,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: AppColor.dark,
          },
          headerTintColor: AppColor.gray,
          headerTitleAlign: 'center',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen}
          options={{
            tabBarIcon: () => <Icon item={'🏠'}/>,
          }}
        />
        <Tab.Screen name="Favorites" component={TabbedCont}
          options={{
            tabBarIcon: () => <Icon item={'❤️'}/>,
          }}
        />
        <Tab.Screen name="Recent" component={TabbedCont}
          options={{
            tabBarIcon: () => <Icon item={'🕒'}/>,
          }}
        />
        <Tab.Screen name="Search" component={TabbedCont}
          options={{
            tabBarIcon: () => <Icon item={'🔍'}/>,
          }}
        />
      </Tab.Navigator>
    </SeriesDataMachineCtx.Provider>
  )
}

const IconContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
const IconItem = styled.Text`
  font-size: 13px;
  color: ${AppColor.dark};
`

function Icon({ item }) {
  return (
    <IconContainer>
        <IconItem>{item}</IconItem>
    </IconContainer>
  )
}

// unicode icons:
// home: 🏠
// favorites: ❤️
// recent: 🕒
// search: 🔍