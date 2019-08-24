import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  authRequest: ['username', 'email', 'fullname', 'password', 'fcmToken'],
  authSuccess: ['user'],
  authFailure: ['error'],
  loginRequest: ['email', 'password'],
  loginSuccess: ['user'],
  loginFailure: ['error'],
  uploadRequest: ['formData'],
  uploadSuccess: ['fileUrl'],
  uploadFailure: ['error'],
  flushErrors: ['']
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  user: null
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
  console.log(action)
  const { user } = action
  return state.merge({ fetching: false, error: null, user })
}

const imageUploadSuccess = (state, action) => {
  const { fileUrl } = action

  return state.merge({
    fetching: false,
    error: null,
    user: {
      ...state.user,
      image: fileUrl
    }
  })
}

// Something went wrong somewhere.
export const failure = (state, { error }) => {
  return state.merge({ fetching: false, error, payload: null })
}

export const flush = state => {
  return state.merge({ error: null, fetching: false })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTH_REQUEST]: request,
  [Types.AUTH_SUCCESS]: success,
  [Types.AUTH_FAILURE]: failure,

  [Types.UPLOAD_REQUEST]: request,
  [Types.UPLOAD_SUCCESS]: imageUploadSuccess,
  [Types.UPLOAD_FAILURE]: failure,

  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.FLUSH_ERRORS]: flush
})
