import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  authRequest: ['username', 'email', 'password', 'fcmToken'],
  authSuccess: ['payload'],
  authFailure: ['error'],
  loginRequest: ['email', 'password'],
  loginSuccess: ['user'],
  loginFailure: ['error']
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state =>
  state.merge({
    fetching: true
  })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

const loginSuccess = (state, user) =>
  state.merge({ fetching: false, error: null, data: user })

// Something went wrong somewhere.
export const failure = (state, { error }) => {
  console.log(error)
  return state.merge({ fetching: false, error, payload: null })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTH_REQUEST]: request,
  [Types.AUTH_SUCCESS]: success,
  [Types.AUTH_FAILURE]: failure,

  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: failure
})
