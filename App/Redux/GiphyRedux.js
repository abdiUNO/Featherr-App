import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  giphyRequest: [''],
  giphySuccess: ['data'],
  giphyFailure: null
})

export const GiphyTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  gifs: [],
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const GiphySelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data })

// successful api lookup
export const success = (state, action) => {
  const { data } = action
  return state.merge({ fetching: false, error: null, gifs: data })
}

// Something went wrong somewhere.
export const failure = state => state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GIPHY_REQUEST]: request,
  [Types.GIPHY_SUCCESS]: success,
  [Types.GIPHY_FAILURE]: failure
})
