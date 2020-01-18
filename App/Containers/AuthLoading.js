import React from 'react'
import {View} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import {connect} from 'react-redux'
const HAS_LAUNCHED = 'HAS_LAUNCHED_FEATHERR'

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync()
  }

  // eslint-disable-next-line no-underscore-dangle
  async _bootstrapAsync() {
    const {user, navigation} = this.props

    const value = await AsyncStorage.getItem(HAS_LAUNCHED)

    console.log(value)

    if (value) {
      if (user) {
        navigation.navigate('AppNavigator')
      } else {
        navigation.navigate('AuthNavigator')
      }
    } else {
      navigation.navigate('TermsAndConditions')
    }
  }

  // Render any loading content that you like here
  render() {
    return <View />
  }
}

const mapStateToProps = state => {
  return {user: state.auth.user}
}

export default connect(
  mapStateToProps,
  {},
)(AuthLoadingScreen)
