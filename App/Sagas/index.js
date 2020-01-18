import {takeLatest, takeLeading, all} from 'redux-saga/effects'
import AsyncStorage from '@react-native-community/async-storage'

import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'
import {call} from 'redux-saga/effects'

/* ------------- Types ------------- */

import {StartupTypes} from '../Redux/StartupRedux'
import {GithubTypes} from '../Redux/GithubRedux'
import {AuthTypes} from '../Redux/AuthRedux'
import {CliquesTypes} from '../Redux/CliquesRedux'
import {ConversationTypes} from '../Redux/ConversationRedux'
import {FriendsTypes} from '../Redux/FriendsRedux'
import {QueryTypes} from '../Redux/QueryRedux'
import {GiphyTypes} from '../Redux/GiphyRedux'
import {NotificationsTypes} from '../Redux/NotificationsRedux'

/* ------------- Sagas ------------- */

import {startup} from './StartupSagas'
import {getCliques, joinClique, leaveClique} from './CliquesSagas'
import {addNotificationsSaga} from './NotificationsSagaSagas'
import {
  getConversations,
  addConversations,
  deleteConversations,
} from './ConversationSagas'
import {getUserAvatar} from './GithubSagas'
import {
  signUp,
  login,
  loginLoad,
  uploadImage,
  logout,
  updateProfile,
  changePassword,
  sendCode,
  verifyEmail,
} from './AuthSagas'
import {getFriends, addFriend} from './FriendsSagas'
import {queryUsers} from './QuerySagas'
import {getTrendingGifs} from './GiphySagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.

let baseUrl = 'http://featherr.appspot.com/api/'

// if (__DEV__) baseUrl = 'http://localhost:8080/api'

/* ------------- Connect Types To Sagas ------------- */
const api = DebugConfig.useFixtures ? FixtureAPI : API.create(baseUrl)

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    //takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(CliquesTypes.CLIQUES_REQUEST, getCliques, api),
    takeLatest(CliquesTypes.JOIN_CLIQUE_REQUEST, joinClique, api),
    takeLatest(CliquesTypes.LEAVE_CLIQUE_REQUEST, leaveClique, api),

    //takeLatest(NotificationsTypes.ADD_NOTIFICATION, addNotificationsSaga, {}),

    takeLatest(ConversationTypes.CONVERSATION_REQUEST, getConversations, api),
    takeLatest(
      ConversationTypes.DELETE_CONVERSATION_REQUEST,
      deleteConversations,
      api,
    ),
    takeLatest(
      ConversationTypes.ADD_CONVERSATION_REQUEST,
      addConversations,
      api,
    ),

    takeLatest(FriendsTypes.FRIENDS_REQUEST, getFriends, api),
    takeLeading(QueryTypes.QUERY_USERS_REQUEST, queryUsers, api),
    takeLatest(FriendsTypes.ADD_FRIEND_REQUEST, addFriend, api),

    takeLatest(GiphyTypes.GIPHY_REQUEST, getTrendingGifs, api),

    takeLatest(AuthTypes.AUTH_REQUEST, signUp, api),
    takeLatest(AuthTypes.LOGIN_REQUEST, login, api),
    takeLatest(AuthTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(AuthTypes.UPLOAD_REQUEST, uploadImage, api),
    takeLatest(AuthTypes.UPDATE_REQUEST, updateProfile, api),
    takeLatest(AuthTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),
    takeLatest(AuthTypes.SEND_CODE_REQUEST, sendCode, api),
    takeLatest(AuthTypes.VERIFY_EMAIL_REQUEST, verifyEmail, api),
    takeLatest('USER_LOGOUT', logout, api),
  ])
}
