import firebase from 'firebase' // 4.8.1

const CHANGE_TYPE = {
  added: 'added',
  modified: 'modified',
  removed: 'removed',
}

class Fire {
  constructor() {
    this.init()
  }

  init() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCIgvujXSktp-z5FkPc7hh2PG9cbFS-DGU',
      authDomain: 'featherr.firebaseapp.com',
      databaseURL: 'https://featherr.firebaseio.com',
      projectId: 'featherr',
      messagingSenderId: '214500946103',
      appId: '1:214500946103:web:16ff84cd97b8ab09815d32',
      measurementId: 'G-GHR5CFXPKC',
    })

    //firebase.analytics()
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid
  }

  get ref() {
    return firebase.database().ref('messages')
  }

  get reportRef() {
    return firebase.database().ref('reported-messages')
  }

  parse = snapshot => {
    if (snapshot.val() == null) return null

    const {
      timestamp: numberStamp,
      text,
      user,
      image,
      imageStill,
    } = snapshot.val()
    const {key: _id} = snapshot
    const timestamp = new Date(numberStamp)
    const message = {
      image,
      imageStill,
      _id,
      chatId: user.chatId,
      timestamp,
      createdAt: timestamp,
      text,
      user,
    }
    return message
  }

  on = (chat, callback) =>
    this.ref
      .child(chat)
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)))

  getLastMsg = (id, callback) =>
    this.ref
      .child(id)
      .limitToLast(1)
      .on('child_added', snapshot => callback(this.parse(snapshot)))

  static get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP
  }

  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const message = {
        ...messages[i],
        timestamp: Fire.timestamp,
      }
      this.append(message)
    }
  }

  append = message => this.ref.child(message.user.chatId).push(message)

  report = (message, reason) => {
    Object.keys(message).forEach(key =>
      message[key] === undefined ? delete message[key] : {},
    )
    message.reason = reason || 'n/a'
    this.reportRef.push(message)
  }

  // close the connection to the Backend
  off() {
    this.ref.off()
  }
}

Fire.shared = new Fire()
export default Fire
