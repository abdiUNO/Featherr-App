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

import {call, put, select} from 'redux-saga/effects'
import {NavigationActions} from 'react-navigation'
import AuthActions from '../Redux/AuthRedux'
import AsyncStorage from '@react-native-community/async-storage'
import storage from 'redux-persist/es/storage'
import firebase from 'react-native-firebase'

// import { AuthSelectors } from '../Redux/AuthRedux'
export const selectAuthToken = state =>
  state.auth.user ? state.auth.user.jwtToken : null
export const selectUserId = state =>
  state.auth.user ? state.auth.user.id : null

export function* signUp(api, action) {
  const {username, email, fullname, password} = action
  // get current data from Store
  // const currentData = yield select(AuthSelectors.getData)
  // make the call to the api
  const fcmToken = yield call(AsyncStorage.getItem, 'fcmToken')

  const response = yield call(
    api.signUp,
    username,
    email,
    fullname,
    password,
    fcmToken,
  )

  // success?
  if (response.ok) {
    yield call(api.setAuthToken, response.data.user.jwtToken)
    yield put(AuthActions.authSuccess(response.data.user))
    yield put(AuthActions.sendCodeRequest(response.data.user.id))
    yield put(NavigationActions.navigate({routeName: 'VerifyEmail'}))
  } else {
    yield put(AuthActions.authFailure(response.data.error))
  }
}

export function* login(api, action) {
  const {email, password} = action
  // get current data from Store
  // const currentData = yield select(AuthSelectors.getData)
  // make the call to the api

  const fcmToken = yield call(AsyncStorage.getItem, 'fcmToken')

  const response = yield call(api.login, email, password, fcmToken)

  // success?
  if (response.ok) {
    yield call(api.setAuthToken, response.data.user.jwtToken)
    yield put(AuthActions.loginSuccess(response.data.user))

    // if (response.data.user.emailVerified) {
    yield put(NavigationActions.navigate({routeName: 'Cliques'}))
    // } else {
    //   yield put(AuthActions.sendCodeRequest(response.data.user.id))
    //   yield put(NavigationActions.navigate({routeName: 'VerifyEmail'}))
    // }
  } else {
    yield put(AuthActions.loginFailure(response.data.error))
  }
}

export function* updateProfile(api, action) {
  const {id, username, email, fullname} = action
  // get current data from Store
  // const currentData = yield select(AuthSelectors.getData)
  // make the call to the api
  const response = yield call(api.updateUser, id, username, email, fullname)

  // success?
  if (response.ok) {
    yield put(AuthActions.updateSuccess(response.data.user))
    yield put(NavigationActions.navigate({routeName: 'Settings'}))
  } else {
    yield put(AuthActions.updateFailure(response.data.error))
  }
}

export function* changePassword(api, action) {
  const {id, oldPassword, newPassword} = action
  // get current data from Store
  // const currentData = yield select(AuthSelectors.getData)
  // make the call to the api
  const response = yield call(api.changePassword, id, oldPassword, newPassword)

  // success?
  if (response.ok) {
    yield put(AuthActions.changePasswordSuccess())
    yield put(NavigationActions.navigate({routeName: 'Settings'}))
  } else {
    yield put(AuthActions.changePasswordFailure(response.data.error))
  }
}

// loads the login
export function* loginLoad(api) {
  const authToken = yield select(selectAuthToken)
  const userId = yield select(selectUserId)
  // only set the token if we have it
  if (authToken) {
    yield call(api.setAuthToken, authToken)
  }

  if (userId) {
    firebase.messaging().subscribeToTopic(userId)
  }

  yield put(AuthActions.loginLoadSuccess())
}

export function* uploadImage(api, action) {
  const {formData} = action
  // get current data from Store
  // const currentData = yield select(AuthSelectors.getData)
  // make the call to the api
  const response = yield call(api.uploadImage, formData)

  // success?
  if (response.ok) {
    yield put(AuthActions.uploadSuccess(response.data.fileUrl))
    yield put(NavigationActions.navigate({routeName: 'Cliques'}))
  } else {
    yield put(AuthActions.uploadFailure(response.data.error))
  }
}

export function* logout(api, action) {
  yield call(storage.removeItem, 'persist:root')
  yield put(NavigationActions.navigate({routeName: 'AuthNavigator'}))
}

export function* sendCode(api, action) {
  const {userId} = action
  const response = yield call(api.generateOtp, userId)

  // success?
  if (response.ok) {
    yield put(AuthActions.sendCodeSuccess(response.data.codeSent))
  } else {
    yield put(AuthActions.sendCodeFailure(response.data.error))
  }
}

export function* verifyEmail(api, action) {
  const {userId, code, skipUpload} = action
  const response = yield call(api.verifyOtp, userId, code)

  // success?
  if (response.ok) {
    yield put(AuthActions.verifyEmailSuccess(response.data.isValid))

    if (skipUpload === true)
      yield put(NavigationActions.navigate({routeName: 'Cliques'}))
    else yield put(NavigationActions.navigate({routeName: 'ImageUpload'}))
  } else {
    yield put(AuthActions.verifyEmailFailure(response.data.error))
  }
}
