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
import FriendsActions from '../Redux/FriendsRedux'
// import { FriendsSelectors } from '../Redux/FriendsRedux'

export function* getFriends(api, action) {
  // get current data from Store
  // const currentData = yield select(FriendsSelectors.getData)
  // make the call to the api
  const response = yield call(api.getFriends)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(FriendsActions.friendsSuccess(response.data.friends))
  } else {
    yield put(FriendsActions.friendsFailure())
  }
}

export function* addFriend(api, action) {
  const { userId } = action
  // get current data from Store
  // const currentData = yield select(FriendsSelectors.getData)
  // make the call to the api
  const response = yield call(api.addFriend, userId)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(FriendsActions.addFriendSuccess(response.data.friendships.friend))
  } else {
    yield put(FriendsActions.addFriendFailure())
  }
}
