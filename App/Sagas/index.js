import { takeLatest, takeLeading, all } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native'

import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'
import { call } from 'redux-saga/effects'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { AuthTypes } from '../Redux/AuthRedux'
import { CliquesTypes } from '../Redux/CliquesRedux'
import { FriendsTypes } from '../Redux/FriendsRedux'
import { QueryTypes } from '../Redux/QueryRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getCliques, joinClique } from './CliquesSagas'
import { getUserAvatar } from './GithubSagas'
import { signUp, login, uploadImage } from './AuthSagas'
import { getFriends, addFriend } from './FriendsSagas'
import { queryUsers } from './QuerySagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  const jwtToken = yield call(AsyncStorage.getItem, 'jwtToken')

  const api = DebugConfig.useFixtures
    ? FixtureAPI
    : API.create('http://localhost:8000/api/', jwtToken)

  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    //takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(CliquesTypes.CLIQUES_REQUEST, getCliques, api),
    takeLatest(CliquesTypes.JOIN_CLIQUE_REQUEST, joinClique, api),
    takeLatest(FriendsTypes.FRIENDS_REQUEST, getFriends, api),
    takeLeading(QueryTypes.QUERY_USERS_REQUEST, queryUsers, api),
    takeLatest(FriendsTypes.ADD_FRIEND_REQUEST, addFriend, api),
    takeLatest(AuthTypes.AUTH_REQUEST, signUp, api),
    takeLatest(AuthTypes.LOGIN_REQUEST, login, api),
    takeLatest(AuthTypes.UPLOAD_REQUEST, uploadImage, api)
  ])
}
