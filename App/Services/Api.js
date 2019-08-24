// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import { AsyncStorage } from 'react-native'
import { log } from './utils'
// our "constructor"
const create = (baseURL, jwtToken) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //

  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`
    },
    // 10 second timeout...
    timeout: 10000
  })

  const fireApi = apisauce.create({
    // base URL is read from the "constructor"
    baseURL: 'https://feather-test.firebaseio.com/',
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  const setAuthToken = token =>
    api.setHeader('Authorization', `Bearer ${token}`)

  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')

  const getUser = username => api.get('search/users', { q: username })
  const queryUsers = query => api.get(`users?query=${query}`)

  const getFriends = () => api.get('friends')
  const addFriend = userId => api.put(`users/${userId}/add`)

  const signUp = (username, email, fulname, password, fcmToken) =>
    api.post(
      'users/new',
      { username, email, fulname, password, fcmToken },
      { headers: { 'Content-Type': 'application/json' } }
    )
  const login = (email, password) =>
    api.post(
      'users/login',
      { email, password },
      { headers: { 'Content-Type': 'application/json' } }
    )

  const uploadImage = formData =>
    api.post('upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

  const getGroups = () => api.get('chat/')
  const joinClique = () => api.post('chat/find')

  const getLastMsg = chatId =>
    fireApi.get('messages.json', {
      orderBy: '/user/chatId',
      equalTo: chatId,
      limitToLast: 1
    })
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    setAuthToken,
    getRoot,
    getRate,
    getUser,
    queryUsers,
    getGroups,
    getFriends,
    addFriend,
    signUp,
    login,
    getLastMsg,
    joinClique,
    uploadImage
  }
}

// let's return back our create method as the default.
export default {
  create
}
