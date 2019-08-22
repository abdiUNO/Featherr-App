import React from 'react'
import { View } from 'react-native'

import { connect } from 'react-redux'

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)
    //this._bootstrapAsync()
  }

  componentDidMount(): void {
    this._bootstrapAsync()
  }

  // eslint-disable-next-line no-underscore-dangle
  async _bootstrapAsync() {
    const { authData, navigation } = this.props
    if (authData && authData.user) {
      navigation.navigate('TabNav')
    } else {
      navigation.navigate('WelcomeScreen')
    }
  }

  // Render any loading content that you like here
  render() {
    return <View />
  }
}

const mapStateToProps = state => {
  return { authData: state.auth.data }
}

export default connect(
  mapStateToProps,
  {}
)(AuthLoadingScreen)
