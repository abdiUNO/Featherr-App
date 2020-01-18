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
  flushErrors: [''],
  loginLoad: [],
  loginLoadSuccess: [],
  userLogout: [],
  updateRequest: ['id', 'username', 'email', 'fullname'],
  updateSuccess: ['user'],
  updateFailure: ['error'],
  changePasswordRequest: ['id', 'oldPassword', 'newPassword'],
  changePasswordSuccess: [],
  changePasswordFailure: ['error'],
  sendCodeRequest: ['userId'],
  sendCodeSuccess: ['codeSent'],
  sendCodeFailure: ['error'],
  verifyEmailRequest: ['userId', 'code', 'skipUpload'],
  verifyEmailSuccess: ['isValid'],
  verifyEmailFailure: ['error'],
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  user: null,
})

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  getData: state => state.data,
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state =>
  state.merge({
    fetching: true,
  })

// successful api lookup
export const success = (state, action) => {
  const { user } = action
  return state.merge({ fetching: false, error: null, user })
}

export const userUpdateSuccess = (state, action) => {
  const { user } = action
  return state.merge({ fetching: false, error: null, user })
}

export const changeUserPassword = (state, action) => {
  return state.merge({ fetching: false, error: null })
}

const imageUploadSuccess = (state, action) => {
  const { fileUrl } = action

  return state.merge({
    fetching: false,
    error: null,
    user: {
      ...state.user,
      image: fileUrl,
    },
  })
}

const verifySuccess = (state, action) => {
  const { isValid } = action

  return state.merge({
    fetching: false,
    error: null,
    user: {
      ...state.user,
      emailVerified: true,
    },
  })
}

const sendSuccess = (state, action) => {
  const { isValid } = action

  return state.merge({
    fetching: false,
    error: null,
  })
}

// Something went wrong somewhere.
export const failure = (state, { error }) => {
  return state.merge({ fetching: false, error, payload: null })
}

export const flush = state => {
  return state.merge({ error: null, fetching: false })
}

// we're attempting to load token from startup sagas
export const load = state =>
  state.merge({ fetching: true, setToken: false, error: null })

export const loadSuccess = state =>
  state.merge({ fetching: false, setToken: true })

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
  [Types.FLUSH_ERRORS]: flush,
  [Types.LOGIN_LOAD]: load,
  [Types.LOGIN_LOAD_SUCCESS]: loadSuccess,

  [Types.UPDATE_REQUEST]: request,
  [Types.UPDATE_SUCCESS]: userUpdateSuccess,
  [Types.UPDATE_FAILURE]: failure,

  [Types.CHANGE_PASSWORD_REQUEST]: request,
  [Types.CHANGE_PASSWORD_SUCCESS]: changeUserPassword,
  [Types.CHANGE_PASSWORD_FAILURE]: failure,

  [Types.SEND_CODE_REQUEST]: request,
  [Types.SEND_CODE_SUCCESS]: sendSuccess,
  [Types.SEND_CODE_FAILURE]: failure,

  [Types.VERIFY_EMAIL_REQUEST]: request,
  [Types.VERIFY_EMAIL_SUCCESS]: verifySuccess,
  [Types.VERIFY_EMAIL_FAILURE]: failure,
})
