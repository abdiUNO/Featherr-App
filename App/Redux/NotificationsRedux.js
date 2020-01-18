import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addNotification: ['topic', 'message'],
  addNotificationSuccess: ['topic', 'message'],
  clearNotification: ['topic'],
  notificationsFailure: null,
})

export const NotificationsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  groups: {},
  fetching: false,
  payload: null,
  error: null,
})

/* ------------- Selectors ------------- */

export const NotificationsSelectors = {
  getData: state => state.data,
}

/* ------------- Reducers ------------- */

// request the data from an api
export const addNotifications = (state, action) => {
  const { topic, message } = action
  return state.merge({
    fetching: true,
    error: null,
  })
}

export const addNotificationsSuccess = (state, action) => {
  const { topic, message } = action
  return state.merge({
    groups: {
      ...state.groups,
      [topic]: {
        unread_messages: state.groups[topic]
          ? state.groups[topic].unread_messages + 1
          : 1,
        last_message: message,
      },
      unread_sum: state.groups.unread_sum ? state.groups.unread_sum + 1 : 1,
    },
  })
}

// successful api lookup
export const clearNotifications = (state, action) => {
  const { topic, message } = action

  const group = state.groups[topic] || {
    unread_messages: 0,
  }

  return state.merge({
    groups: {
      ...state.groups,
      [topic]: {
        ...state.groups[topic],
        unread_messages: 0,
      },

      unread_sum: state.groups.unread_sum - group.unread_messages,
    },
  })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_NOTIFICATION]: addNotificationsSuccess,
  [Types.ADD_NOTIFICATION_SUCCESS]: addNotificationsSuccess,
  [Types.CLEAR_NOTIFICATION]: clearNotifications,
})
