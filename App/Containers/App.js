import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import Reactotron from 'reactotron-react-native'
import { persistStore } from 'redux-persist'

// create our store
const { store, persistor } = createStore()

Reactotron.onCustomCommand({
  command: 'clear',
  handler: () => persistor.purge(),
  // Optional settings
  title: 'Clear Storage', // This shows on the button
  description: 'flush async local storage' // This shows below the button
})

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
        <RootContainer />
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron ? console.tron.overlay(App) : App