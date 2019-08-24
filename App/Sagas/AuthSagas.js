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
  console.log(action)
  const { username, email, fullname, password, fcmToken } = action
  // get current data from Store
  // const currentData = yield select(AuthSelectors.getData)
  // make the call to the api
  const response = yield call(
    api.signUp,
    username,
    email,
    fullname,
    password,
    fcmToken
  )

  // success?
  if (response.ok) {
    console.log(response)

    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    const res = yield call(
      AsyncStorage.setItem,
      'jwtToken',
      response.data.user.jwtToken
    )

    yield call(api.setAuthToken, response.data.user.jwtToken)
    yield put(AuthActions.authSuccess(response.data.user))
    yield put(NavigationActions.navigate({ routeName: 'ImageUpload' }))
  } else {
    yield put(AuthActions.authFailure(response.data.error))
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

    yield call(api.setAuthToken, response.data.user.jwtToken)
    yield put(AuthActions.loginSuccess(response.data.user))
    yield put(NavigationActions.navigate({ routeName: 'Cliques' }))
  } else {
    yield put(AuthActions.loginFailure(response.data.error))
  }
}

export function* uploadImage(api, action) {
  const { formData } = action
  // get current data from Store
  // const currentData = yield select(AuthSelectors.getData)
  // make the call to the api
  const response = yield call(api.uploadImage, formData)

  console.log(response)

  // success?
  if (response.ok) {
    yield put(AuthActions.uploadSuccess(response.data.fileUrl))
    yield put(NavigationActions.navigate({ routeName: 'Friends' }))
  } else {
    yield put(AuthActions.uploadFailure(response.data.error))
  }
}
