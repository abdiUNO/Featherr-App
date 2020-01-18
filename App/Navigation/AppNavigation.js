import {createSwitchNavigator, createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs'

import React from 'react'
import {TouchableOpacity, Text, View} from 'react-native'
import {Icon as ElementIcon} from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import CliquesScreen from '../Containers/CliquesScreen'
import FriendsScreen from '../Containers/FriendsScreen'
import LoginScreen from '../Containers/LoginScreen'
import AuthLoadingScreen from '../Containers/AuthLoading'
import CliqueInfoScreen from '../Containers/CliqueInfoScreen'
import ConversationInfoScreen from '../Containers/ConversationInfoScreen'
import AccountScreen from '../Containers/AccountScreen'
// import ChatScreen from '../Containers/ChatScreen'
// import GroupsScreen from '../Containers/GroupsScreen'
import ChatScreen from '../Containers/ChatScreen'
import WelcomeScreen from '../Containers/WelcomeScreen'
import SignUpScreen from '../Containers/SignUpScreen'
import SignUpTwoScreen from '../Containers/SignUpTwoScreen'
import SignUpThreeScreen from '../Containers/SignUpThreeScreen'
import {connect} from 'react-redux'
import colors from '../Themes/Colors'
import IconWithBadge from '../Components/IconWithBadge'
import ImageUploadScreen from '../Containers/ImageUploadScreen'
import EditProfileScreen from '../Containers/EditProfileScreen'
import ChangePasswordScreen from '../Containers/ChangePasswordScreen'
import VerifyEmailScreen from '../Containers/VerifyEmailScreen'
import TermsAndConditions from '../Containers/TermsAndConditions'

const IconBadge = ({badgeCount, color, name, routeName}) => {
  let iconName = ''
  if (routeName === 'Friends') {
    iconName = `ios-contacts`
  } else if (routeName === 'Cliques') {
    iconName = `ios-chatboxes`
  } else if (routeName === 'Settings') {
    iconName = `ios-settings`
  }

  return (
    <IconWithBadge
      name={iconName}
      size={27}
      color={color}
      badgeCount={badgeCount}
    />
  )
}
const ConnectedIcon = connect(
  (state, props) => {
    const reducer = (accumulator, currentValue) => {
      if (accumulator && currentValue)
        return accumulator.unread_messages + currentValue.unread_messages

      if (currentValue || accumulator) return 1

      return 0
    }

    const groups = state.cliques.groups.map(
      group => state.notifications.groups[group.id],
    )

    const conversations = state.conversations.all.map(
      group => state.notifications.groups[group.id],
    )

    const badges = {
      Cliques:
        groups.length > 0
          ? groups.length === 1 && groups[0] !== undefined
            ? groups[0].unread_messages
            : groups.reduce(reducer)
          : 0,
      Friends:
        conversations.length > 0
          ? conversations.length === 1 && conversations[0] !== undefined
            ? conversations[0].unread_messages
            : conversations.reduce(reducer)
          : 0,
      Settings: 0,
    }

    return {
      badgeCount: badges[props.routeName],
    }
  },
  {},
)(IconBadge)

const TabBarComponent = props => <BottomTabBar {...props} />

const TabNav = createBottomTabNavigator(
  {
    Cliques: CliquesScreen,
    Friends: FriendsScreen,
    Settings: AccountScreen,
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
            height: -2,
          },
          shadowOpacity: 0.35,
          shadowRadius: 3,
        }}
      />
    ),
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName, params} = navigation.state
        const IconComponent = Ionicons

        // You can return any component that you like here!
        return <ConnectedIcon color={tintColor} routeName={routeName} />
      },
    }),
    tabBarOptions: {
      activeTintColor: '#0AADB0',
      inactiveTintColor: 'gray',
      showLabel: false,
    },
  },
)

TabNav.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index]
  const {params} = navigation.state.routes[navigation.state.index]

  // You can do whatever you like here to pick the title based on the route name
  const headerTitle = routeName

  var props = {
    headerTitle,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#05BEAE',
      borderBottomColor: '#05BEAE',
      color: '#fff',
    },
    animationEnabled: true,
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
            borderRadius: 20,
          }}
          hitSlop={{top: 15, bottom: 15, left: 15, right: 5}}>
          <Icon
            style={{
              fontWeight: 'bold',
              color: '#0AADB0',
            }}
            name="account-plus"
            size={18}
            color="#fff"
          />
        </TouchableOpacity>
      ),
    }
  } else if (routeName === 'Cliques') {
    return {
      ...props,
      headerRight: (
        <TouchableOpacity
          style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            if (params) params.joinGroup()
          }}
          hitSlop={{top: 15, bottom: 15, left: 15, right: 5}}>
          <ElementIcon
            style={{
              color: '#FFF',
            }}
            iconStyle={{marginRight: 2}}
            name="plus"
            type="font-awesome"
            size={15}
            color="#fff"
          />
          <Text
            style={{
              color: '#fff',
              fontWeight: '600',
              marginRight: 5,
              fontSize: 16,
            }}>
            Join
          </Text>
        </TouchableOpacity>
      ),
    }
  }

  return props
}

const getCurrentRouteName = navigationState => {
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

const AuthNavigator = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Login: LoginScreen,
    SignUp: SignUpScreen,
    SignUpTwo: SignUpTwoScreen,
    SignUpThree: SignUpThreeScreen,
    ImageUpload: ImageUploadScreen,
    VerifyEmail: VerifyEmailScreen,
  },
  {
    headerMode: 'none',
    animationEnabled: true,
  },
)

const AppNavigator = createStackNavigator(
  {
    TabNav,
    Chat: ChatScreen,
    CliqueInfo: CliqueInfoScreen,
    ConversationInfo: ConversationInfoScreen,
    EditProfile: EditProfileScreen,
    ChangePassword: ChangePasswordScreen,
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      const {index, routes} = navigation.state

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
          color: '#fff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        animationEnabled: true,
      }
    },
  },
)

const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoadingScreen,
    TermsAndConditions,
    AuthNavigator,
    AppNavigator,
  },
  {
    initialRouteName: 'AuthLoadingScreen',
  },
)

export default createAppContainer(SwitchNavigator)
