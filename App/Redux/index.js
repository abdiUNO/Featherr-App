import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import {createNavigationReducer} from 'react-navigation-redux-helpers'
import AsyncStorage from '@react-native-community/async-storage'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  auth: require('./AuthRedux').reducer,
  cliques: require('./CliquesRedux').reducer,
  friends: require('./FriendsRedux').reducer,
  query: require('./QueryRedux').reducer,
  giphy: require('./GiphyRedux').reducer,
  conversations: require('./ConversationRedux').reducer,
  notifications: require('./NotificationsRedux').reducer,
})

export default () => {
  const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
      const HAS_LAUNCHED = 'HAS_LAUNCHED_FEATHERR_APP'
      AsyncStorage.setItem(HAS_LAUNCHED, 'true', () => {
        AsyncStorage.removeItem('persist:primary')
      })
    }
    return reducers(state, action)
  }

  let finalReducers = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
      state = undefined
    }

    return rootReducer(state, action)
  }

  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, rootReducer)
  }

  let {store, sagasManager, sagaMiddleware, persistor} = configureStore(
    finalReducers,
    rootSaga,
  )

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas)
      })
    })
  }

  return {store, persistor}
}
