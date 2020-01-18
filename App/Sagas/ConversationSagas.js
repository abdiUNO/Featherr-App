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
import ConversationActions from '../Redux/ConversationRedux'
import {NavigationActions} from 'react-navigation'
// import { ConversationSelectors } from '../Redux/ConversationRedux'

export function* getConversations(api, action) {
  const response = yield call(api.getConversations)
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(ConversationActions.conversationSuccess(response.data.groups))
  } else {
    yield put(ConversationActions.conversationFailure(response.data.error))
  }
}

export function* addConversations(api, action) {
  const {friendId} = action

  const response = yield call(api.createConversations, friendId)

  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(ConversationActions.addConversationSuccess(response.data.groups))
    yield put(ConversationActions.conversationRequest())
  } else {
    yield put(ConversationActions.addConversationFailure(response.data.error))
  }
}

export function* deleteConversations(api, action) {
  const {conversationId} = action
  const response = yield call(api.deleteConversation, conversationId)

  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(
      ConversationActions.deleteConversationSuccess(response.data.groupId),
    )
    yield put(NavigationActions.navigate({routeName: 'Friends'}))
  } else {
    yield put(
      ConversationActions.deleteConversationFailure(response.data.error),
    )
  }
}
