import React, {Component} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import {connect} from 'react-redux'
import firebase from 'react-native-firebase'
import NotificationsActions from '../Redux/NotificationsRedux'
import CliquesAction from '../Redux/CliquesRedux'
import AuthActions from '../Redux/AuthRedux'
import FriendsActions from '../Redux/FriendsRedux'
import ConversationActions from '../Redux/ConversationRedux'

class NotificationsController extends Component {
  async componentDidMount() {
    firebase.app()
    this.checkPermission()
    this.createNotificationListeners() //add this line
  }

  componentWillUnmount() {
    this.notificationListener()
    this.notificationOpenedListener()
  }

  async createNotificationListeners() {
    const channel = new firebase.notifications.Android.Channel(
      'featherr-notifications',
      'featherr-notifications',
      firebase.notifications.Android.Importance.Max,
    ).setDescription('My apps test channel')

    // Create the channel
    firebase.notifications().android.createChannel(channel)

    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const {data} = notification

        console.log(notification)

        if (notification.title === 'New friend') {
          const _notification = new firebase.notifications.Notification()
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setBody(notification.body)
            .android.setChannelId('featherr-notifications')

          firebase.notifications().displayNotification(_notification)
        } else {
          if (data.update === 'true') {
            this.props.getCliques()
          } else {
            this.props.addNotification(data.group, data.message)
          }
        }
      })

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const {data} = notificationOpen.notification

        if (data.postId) {
          this.props.postReply(data.postId, {
            text: data.message,
            username: data.username,
          })
        } else {
          this.props.addNotification(data.group, data.message)
        }
      })

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification()
    if (notificationOpen) {
      const {data} = notificationOpen.notification
      if (data.postId) {
        this.props.postReply(data.postId, {
          text: data.message,
          username: data.username,
        })
      } else {
        this.props.addNotification(data.group, data.message)
      }
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      const {data} = message

      console.log(`${data.userId} == ${this.props.user.id} ?`)

      if (data.updated === 'true' && data.userId !== this.props.user.id) {
        console.log('UPDATING')
        switch (data.type) {
          case 'UPDATE_FRIENDS':
            this.props.getFriends(true)
            break
          case 'UPDATE_CLIQUES':
            this.props.getCliques(true)
            break
          case 'UPDATE_CONVERSATIONS':
            this.props.getConversations(true)
            break
        }
      } else {
        this.props.addNotification(data.group, data.message)
      }
    })
  }

  showAlert(title, body) {
    Alert.alert(
      title,
      body,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    )
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission()
    if (enabled) {
      this.getToken()
    } else {
      this.requestPermission()
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    //alert(fcmToken)
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken()
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken)
      }
    }
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission()
      await firebase.messaging().registerForNotifications()
      // User has authorised
      this.getToken()
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected')
    }
  }

  render() {
    return null
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications.groups,
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCliques: backgroundFetch =>
      dispatch(CliquesAction.cliquesRequest(backgroundFetch)),
    getFriends: backgroundFetch =>
      dispatch(FriendsActions.friendsRequest(backgroundFetch)),
    getConversations: backgroundFetch =>
      dispatch(ConversationActions.conversationRequest(backgroundFetch)),
    addNotification: (topic, message) =>
      dispatch(NotificationsActions.addNotification(topic, message)),
    clearNotification: topic =>
      dispatch(NotificationsActions.clearNotification(topic)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationsController)
