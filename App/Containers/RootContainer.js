import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render() {
    const { rehydrateComplete } = this.props
    return (
      <View style={{ flex: 1 }}>
        {rehydrateComplete == true ? (
          <View style={styles.applicationView}>
            <StatusBar barStyle="light-content" />
            <ReduxNavigation />
          </View>
        ) : null}
      </View>
    )
  }
}
const mapStateToProps = state => ({
  rehydrateComplete: state._persist ? state._persist.rehydrated : state._persist
})

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainer)
