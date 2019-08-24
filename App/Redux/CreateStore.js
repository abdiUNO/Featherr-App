import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import Rehydration from '../Services/Rehydration'
import ReduxPersist from '../Config/ReduxPersist'
import Config from '../Config/DebugConfig'

import createSagaMiddleware from 'redux-saga'
import ScreenTracking from './ScreenTrackingMiddleware'
import { appNavigatorMiddleware } from '../Navigation/ReduxNavigation'

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Navigation Middleware ------------ */
  middleware.push(appNavigatorMiddleware)

  /* ------------- Analytics Middleware ------------- */
  middleware.push(ScreenTracking)

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = Config.useReactotron
    ? console.tron.createSagaMonitor()
    : null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middleware.push(sagaMiddleware)

  /* ------------ Logger Middleware ------------ */
  middleware.push(logger)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = Config.useReactotron
    ? console.tron.createStore
    : createStore
  const store = createAppropriateStore(rootReducer, compose(...enhancers))

  let persistor = null

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    persistor = Rehydration.updateReducers(store)
  }

  // kick off root saga
  let sagasManager = sagaMiddleware.run(rootSaga)

  return {
    store,
    sagasManager,
    sagaMiddleware,
    persistor
  }
}
