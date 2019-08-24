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
    const { user, navigation } = this.props
    if (user) {
      navigation.navigate('TabNav')
    } else {
      navigation.navigate('Welcome')
    }
  }

  // Render any loading content that you like here
  render() {
    return <View />
  }
}

const mapStateToProps = state => {
  return { user: state.auth.user }
}

export default connect(
  mapStateToProps,
  {}
)(AuthLoadingScreen)
