import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  friendsRequest: ['backgroundFetch'],
  friendsSuccess: ['friends'],
  friendsFailure: null,
  addFriendRequest: ['userId'],
  addFriendSuccess: ['friend'],
  addFriendFailure: null,
})

export const FriendsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  friends: [],
  friendsById: {},
  error: null,
})

/* ------------- Selectors ------------- */

export const FriendsSelectors = {
  getData: state => state.data,
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) => {
  const {backgroundFetch} = action

  return state.merge({
    fetching: !backgroundFetch,
  })
}

// successful api lookup
export const success = (state, action) => {
  const {friends} = action

  const _friends = Immutable.asObject(friends, function(friend) {
    return [friend.email, friend.id]
  })

  return state.merge({fetching: false, error: null, friends, allIds: _friends})
}

export const addRequest = state =>
  state.merge({
    fetching: false,
    error: null,
  })

// successful api lookup
export const addSuccess = (state, action) => {
  const {friend} = action

  return state.merge({
    fetching: false,
    error: null,
    friends: [friend, ...state.friends],
    allIds: {...state.allIds, [friend.email]: true},
  })
}

// Something went wrong somewhere.
export const failure = state => state.merge({fetching: false, error: true})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FRIENDS_REQUEST]: request,
  [Types.FRIENDS_SUCCESS]: success,
  [Types.FRIENDS_FAILURE]: failure,
  [Types.ADD_FRIEND_REQUEST]: addRequest,
  [Types.ADD_FRIEND_SUCCESS]: addSuccess,
  [Types.ADD_FRIEND_FAILURE]: failure,
})
