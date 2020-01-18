import firebase from 'react-native-firebase'
// Optional flow type
import createStore from '../Redux'

// create our store
const {store} = createStore()
import NotificationsActions from '../Redux/NotificationsRedux'

export default async message => {
  // handle your message

  console.log(message)

  const data = message.data

  const cliques = state.cliques.groups || []
  const conversations = state.conversations.all || []

  const groups = [...cliques, ...conversations]

  if (data.group) {
    groups.map(_group => {
      if (data.group !== _group.id) {
        const newNotification = new firebase.notifications.Notification().android
          .setNotificationId(data.group)
          .setTitle(notification.title)
          .setBody(notification.body)
          .setSound('default')
          .setData(data)
          .android.setChannelId('featherr-notifications')
          .android.setSmallIcon('ic_notification')

        firebase.notifications().displayNotification(newNotification)

        store.dispatch(
          dispatch(
            NotificationsActions.addNotification(data.group, data.message),
          ),
        )
      }
    })
  }

  return Promise.resolve()
}
