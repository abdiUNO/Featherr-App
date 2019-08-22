import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  BottomTabBar
} from 'react-navigation'

import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Sample from '../Containers/Sample'
import CliquesScreen from '../Containers/CliquesScreen'
import FriendsScreen from '../Containers/FriendsScreen'
import LoginScreen from '../Containers/LoginScreen'
import AuthLoadingScreen from '../Containers/AuthLoading'
import ChatScreen from '../Containers/ChatScreen'
import GroupsScreen from '../Containers/GroupsScreen'
import ChatKitScreen from '../Containers/ChatKitScreen'

import colors from '../Themes/Colors'
import IconWithBadge from '../Components/IconWithBadge'

const TabBarComponent = props => <BottomTabBar {...props} />

const TabNav = createBottomTabNavigator(
  {
    Cliques: CliquesScreen,
    Friends: FriendsScreen,
    Settings: Sample
  },
  {
    tabBarComponent: props => (
      <TabBarComponent
        {...props}
        style={{
          paddingBottom: 2.5,
          paddingHorizontal: 35,
          borderTopColor: colors.white,
          shadowColor: colors.grey0,
          shadowOffset: {
            height: -2
          },
          shadowOpacity: 0.35,
          shadowRadius: 3
        }}
      />
    ),
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        const IconComponent = Ionicons
        let badgeCount
        let iconName

        if (routeName === 'Friends') {
          iconName = `ios-contacts`
          badgeCount = 1
        } else if (routeName === 'Cliques') {
          iconName = `ios-chatboxes`
        } else if (routeName === 'Settings') {
          iconName = `ios-settings`
        }

        // You can return any component that you like here!
        return (
          <IconWithBadge
            name={iconName}
            size={27}
            color={tintColor}
            badgeCount={badgeCount}
          />
        )
      }
    }),
    tabBarOptions: {
      activeTintColor: '#0AADB0',
      inactiveTintColor: 'gray',
      showLabel: false
    }
  }
)

TabNav.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index]
  const { params } = navigation.state.routes[navigation.state.index]

  // You can do whatever you like here to pick the title based on the route name
  const headerTitle = routeName

  var props = {
    headerTitle,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#05BEAE',
      borderBottomColor: '#05BEAE',
      color: '#fff'
    },
    animationEnabled: true
  }

  if (routeName === 'Friends') {
    return {
      ...props,
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            if (params) params.addFriend()
          }}
          style={{
            backgroundColor: '#fff',
            marginRight: 12,
            paddingVertical: 3,
            paddingHorizontal: 5,
            borderRadius: 20
          }}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 5 }}>
          <Icon
            style={{
              fontWeight: 'bold',
              color: '#0AADB0'
            }}
            name="account-plus"
            size={18}
            color="#fff"
          />
        </TouchableOpacity>
      )
    }
  } else if (routeName === 'Cliques') {
    return {
      ...props,
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            if (params) params.joinGroup()
          }}
          style={{
            backgroundColor: '#fff',
            marginRight: 12,
            paddingVertical: 3,
            paddingHorizontal: 5,
            borderRadius: 20
          }}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 5 }}>
          <Icon
            style={{
              fontWeight: 'bold',
              color: '#0AADB0'
            }}
            name="account-plus"
            size={18}
            color="#fff"
          />
        </TouchableOpacity>
      )
    }
  }

  return props
}

const getCurrentRouteName = navigationState => {
  console.log(navigationState)
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route)
  }
  return route.routeName
}

const AppNavigator = createStackNavigator(
  { TabNav, Chat: ChatKitScreen },
  {
    defaultNavigationOptions: ({ navigation }) => {
      const { index, routes } = navigation.state

      let routeName = navigation.state.routeName

      if (navigation.state.routes) {
        routeName = getCurrentRouteName(navigation.state)
      }

      // You can do whatever you like here to pick the title based on the route name
      const headerTitle = routeName

      return {
        headerTitle,
        headerStyle: {
          backgroundColor: '#05BEAE',
          borderBottomColor: '#05BEAE',
          color: '#fff'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        animationEnabled: true
      }
    }
  }
)

const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoadingScreen,
    LoginScreen,
    AppNavigator
  },
  {
    initialRouteName: 'AuthLoadingScreen'
  }
)

export default createAppContainer(SwitchNavigator)
