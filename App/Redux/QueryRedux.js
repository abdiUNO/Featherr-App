import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  queryUsersRequest: ['query'],
  queryUsersSuccess: ['users'],
  queryUsersFailure: null
})

export const QueryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  users: [],
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const UsersSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state => state.merge({ fetching: true })

// successful api lookup
export const success = (state, payload) => {
  console.log(payload)
  const { users } = payload
  return state.merge({ fetching: false, error: null, users })
}

// Something went wrong somewhere.
export const failure = state => state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.QUERY_USERS_REQUEST]: request,
  [Types.QUERY_USERS_SUCCESS]: success,
  [Types.QUERY_USERS_FAILURE]: failure
})
