import '../fixtimerbug'

import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import {persistStore} from 'redux-persist'
import NotificationsController from './NotificationsController'
import {NetworkProvider} from 'react-native-offline'

// create our store
const {store, persistor} = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NetworkProvider>
          <NotificationsController />
          <RootContainer />
        </NetworkProvider>
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron ? console.tron.overlay(App) : App
