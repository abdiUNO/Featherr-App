import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  cliquesRequest: [],
  cliquesSuccess: ['groups'],
  cliquesFailure: null,
  joinCliqueRequest: [],
  joinCliqueSuccess: ['data'],
  joinCliqueFailure: null
})

export const CliquesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  groups: [],
  fetching: null,
  fetchingKey: null,
  error: null
})

/* ------------- Selectors ------------- */

export const CliquesSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) => {
  const { type } = action

  return state.merge({
    fetching: true,
    fetchingKey: type
  })
}

// successful api lookup
export const success = (state, action) => {
  const { groups } = action
  const { type } = action

  return state.merge({
    fetching: false,
    fetchingKey: null,
    error: null,
    groups: groups || []
  })
}

// successful api lookup
export const joinSuccess = (state, action) => {
  console.log(action)
  const { data } = action
  return state.merge({
    fetching: false,
    fetchingKey: null,
    error: null,
    groups: [data, ...state.groups]
  })
}

// Something went wrong somewhere.m
export const failure = state =>
  state.merge({
    fetching: false,
    fetchingKey: null,
    error: true
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CLIQUES_REQUEST]: request,
  [Types.CLIQUES_SUCCESS]: success,
  [Types.CLIQUES_FAILURE]: failure,
  [Types.JOIN_CLIQUE_REQUEST]: request,
  [Types.JOIN_CLIQUE_SUCCESS]: joinSuccess,
  [Types.JOIN_CLIQUE_FAILURE]: failure
})
