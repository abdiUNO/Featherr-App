import React, {PureComponent, Component} from 'react'
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import {connect} from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import {NetworkConsumer} from 'react-native-offline'
import {human} from 'react-native-typography'

// Styles
import styles from './Styles/RootContainerStyles'
import Images from '../Themes/Images'

class OfflineNotice extends PureComponent {
  render() {
    return (
      <View style={styles.offlineContainer}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
          }}>
          <Image
            style={styles.image}
            source={Images.offline}
            resizeMode="contain"
          />
          <Text style={styles.offlineHeader}>You're Offline</Text>
          <Text style={styles.offlineSubHeader}>
            Please check your Internet Connection
          </Text>
        </View>
      </View>
    )
  }
}

class RootContainer extends Component {
  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render() {
    const {rehydrateComplete, setToken} = this.props
    return (
      <View style={{flex: 1}}>
        {(rehydrateComplete && setToken) === true ? (
          <NetworkConsumer>
            {({isConnected}) =>
              !isConnected ? (
                <View style={styles.applicationView}>
                  <OfflineNotice />
                </View>
              ) : (
                <View style={styles.applicationView}>
                  <StatusBar barStyle="light-content" />
                  <ReduxNavigation />
                </View>
              )
            }
          </NetworkConsumer>
        ) : null}
      </View>
    )
  }
}
const mapStateToProps = state => ({
  rehydrateComplete: state._persist
    ? state._persist.rehydrated
    : state._persist,
  setToken: state.auth.setToken,
})

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootContainer)
