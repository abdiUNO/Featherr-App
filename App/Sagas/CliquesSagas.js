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

import {call, put} from 'redux-saga/effects'
import CliquesActions from '../Redux/CliquesRedux'
import {NavigationActions} from 'react-navigation'
// import { CliquesSelectors } from '../Redux/CliquesRedux'

export function* getCliques(api, action) {
  // get current data from Store
  // const currentData = yield select(AuthSelectors.getData)
  // make the call to the api
  const response = yield call(api.getGroups)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(CliquesActions.cliquesSuccess(response.data.groups))
  } else {
    yield put(CliquesActions.cliquesFailure(response.data.error))
  }
}

export function* joinClique(api, action) {
  const response = yield call(api.joinClique)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(CliquesActions.joinCliqueSuccess(response.data.group))
  } else {
    yield put(CliquesActions.joinCliqueFailure(response.data.error))
  }
}

export function* leaveClique(api, action) {
  const {groupId} = action

  const response = yield call(api.leaveClique, groupId)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(CliquesActions.leaveCliqueSuccess(response.data.groupId))
    yield put(NavigationActions.navigate({routeName: 'Cliques'}))
  } else {
    yield put(CliquesActions.leaveCliqueFailure(response.data.error))
  }
}
