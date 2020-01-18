import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'
import firebase from 'react-native-firebase'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  cliquesRequest: ['backgroundFetch'],
  cliquesSuccess: ['groups'],
  cliquesFailure: null,
  joinCliqueRequest: [],
  joinCliqueSuccess: ['group'],
  joinCliqueFailure: null,
  leaveCliqueRequest: ['groupId'],
  leaveCliqueSuccess: ['groupId'],
  leaveCliqueFailure: null,
})

export const CliquesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  groups: [],
  fetching: null,
  fetchingKey: null,
  error: null,
})

/* ------------- Selectors ------------- */

export const CliquesSelectors = {
  getData: state => state.data,
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) => {
  const {type, backgroundFetch} = action

  return state.merge({
    fetching: !backgroundFetch,
    fetchingKey: type,
  })
}

const gradients = [
  ['#36D1DC', '#5B86E5'],
  ['#007adf', '#00ecbc'],
  ['#4481eb', '#04befe'],
  ['#4facfe', '#00f2fe'],
  ['#16d9e3', '#30c7ec'],
  ['#b721ff', '#21d4fd'],
  ['#209cff', '#68e0cf'],
  ['#0acffe', '#495aff'],
]

function shadeColor(color, percent) {
  var R = parseInt(color.substring(1, 3), 16)
  var G = parseInt(color.substring(3, 5), 16)
  var B = parseInt(color.substring(5, 7), 16)

  R = parseInt((R * (100 + percent)) / 100)
  G = parseInt((G * (100 + percent)) / 100)
  B = parseInt((B * (100 + percent)) / 100)

  R = R < 255 ? R : 255
  G = G < 255 ? G : 255
  B = B < 255 ? B : 255

  var RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16)
  var GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16)
  var BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16)

  return '#' + RR + GG + BB
}

const getRandom = (min, max) => {
  return -1 * (Math.floor(Math.random() * max) + min)
}

// successful api lookup
export const success = (state, action) => {
  const {groups} = action
  const {type} = action

  const _groups = groups || []

  return state.merge({
    fetching: false,
    fetchingKey: null,
    error: null,
    groups: _groups.map(group => {
      firebase.messaging().subscribeToTopic(group.id)
      let colors = gradients[Math.floor(Math.random() * gradients.length)]
      group.colors = [
        shadeColor(colors[0], getRandom(8, 12)),
        shadeColor(colors[1], getRandom(8, 12)),
      ]
      return group
    }),
  })
}

// successful api lookup
export const joinSuccess = (state, action) => {
  const {group} = action

  let colors = gradients[Math.floor(Math.random() * gradients.length)]
  group.colors = [shadeColor(colors[0], -20), shadeColor(colors[1], -20)]

  firebase.messaging().subscribeToTopic(group.id)

  return state.merge({
    fetching: false,
    fetchingKey: null,
    error: null,
    groups: [group, ...state.groups],
  })
}

export const leaveSuccess = (state, action) => {
  const {groupId} = action

  firebase.messaging().unsubscribeFromTopic(groupId)

  return state.merge({
    fetching: false,
    fetchingKey: null,
    error: null,
    groups: state.groups.filter(group => group.id !== groupId),
  })
}

// Something went wrong somewhere.m
export const failure = state =>
  state.merge({
    fetching: false,
    fetchingKey: null,
    error: true,
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CLIQUES_REQUEST]: request,
  [Types.CLIQUES_SUCCESS]: success,
  [Types.CLIQUES_FAILURE]: failure,
  [Types.JOIN_CLIQUE_REQUEST]: request,
  [Types.JOIN_CLIQUE_SUCCESS]: joinSuccess,
  [Types.JOIN_CLIQUE_FAILURE]: failure,
  [Types.LEAVE_CLIQUE_REQUEST]: request,
  [Types.LEAVE_CLIQUE_SUCCESS]: leaveSuccess,
  [Types.LEAVE_CLIQUE_FAILURE]: failure,
})
