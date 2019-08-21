/* ***********************************************************
 * A short word on how to use this automagically generated file.
 * We're often asked in the ignite gitter channel how to connect
 * to a to a third party api, so we thought we'd demonstrate - but
 * you should know you can use sagas for other flow control too.
 *
 * Other points:
 *  - You'll need to add this saga to sagas/index.js
 *  - This template uses the api declared in sagas/index.js, so
 *    you'll need to define a constant in that file.
 ************************************************************ */

import { call, put } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import AuthActions from '../Redux/AuthRedux'
import { AsyncStorage } from 'react-native'

// import { AuthSelectors } from '../Redux/AuthRedux'

export function* signUp(api, action) {
  const { username, email, password, fcmToken } = action
  // get current data from Store
  // const currentData = yield select(AuthSelectors.getData)
  // make the call to the api
  const response = yield call(api.signUp, username, email, password, fcmToken)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(AuthActions.authSuccess(response.data))
  } else {
    yield put(AuthActions.authFailure())
  }
}

export function* login(api, action) {
  const { email, password } = action
  // get current data from Store
  // const currentData = yield select(AuthSelectors.getData)
  // make the call to the api
  const response = yield call(api.login, email, password)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    const res = yield call(
      AsyncStorage.setItem,
      'jwtToken',
      response.data.user.jwtToken
    )
    console.log(res)

    yield put(AuthActions.loginSuccess(response.data))
    yield put(NavigationActions.navigate({ routeName: 'Friends' }))
  } else {
    yield put(AuthActions.loginFailure(response.data.error))
  }
}
