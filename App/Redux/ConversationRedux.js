import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'
import firebase from 'react-native-firebase'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  conversationRequest: ['backgroundFetch'],
  conversationSuccess: ['groups'],
  conversationFailure: null,
  addConversationRequest: ['friendId'],
  addConversationSuccess: ['group'],
  addConversationFailure: null,
  deleteConversationRequest: ['conversationId'],
  deleteConversationSuccess: ['groupId'],
  deleteConversationFailure: null,
  setTimeStamp: ['timestamp'],
})

export const ConversationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  all: [],
  fetching: null,
  payload: null,
  error: null,
  lastMessageReceivedTimestamp: 0,
})

/* ------------- Selectors ------------- */

export const ConversationSelectors = {
  getData: state => state.data,
}

/* ------------- Reducers ------------- */

export const request = (state, action) => {
  const {data, backgroundFetch} = action

  return state.merge({
    fetching: !backgroundFetch,
    data,
    payload: null,
  })
}

// successful api lookup
export const success = (state, action) => {
  const {groups} = action

  groups.forEach(group => {
    firebase.messaging().subscribeToTopic(group.id)
  })

  return state.merge({fetching: false, error: null, all: groups || []})
}

export const addSuccess = (state, action) => {
  const {payload} = action
  return state.merge({fetching: false, error: null, payload})
}

export const deleteSuccess = (state, action) => {
  const {groupId} = action

  firebase.messaging().unsubscribeFromTopic(groupId)

  return state.merge({
    fetching: false,
    error: null,
    all: state.all.filter(group => group.id !== groupId),
  })
}

export const setLastTimestamp = (state, action) => {
  const {timestamp} = action
  return state.merge({lastMessageReceivedTimestamp: timestamp})
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({fetching: false, error: true, payload: null})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONVERSATION_REQUEST]: request,
  [Types.CONVERSATION_SUCCESS]: success,
  [Types.CONVERSATION_FAILURE]: failure,
  [Types.ADD_CONVERSATION_REQUEST]: request,
  [Types.ADD_CONVERSATION_SUCCESS]: addSuccess,
  [Types.ADD_CONVERSATION_FAILURE]: failure,
  [Types.DELETE_CONVERSATION_REQUEST]: request,
  [Types.DELETE_CONVERSATION_SUCCESS]: deleteSuccess,
  [Types.DELETE_CONVERSATION_FAILURE]: failure,
  [Types.SET_TIME_STAMP]: setLastTimestamp,
})
