import React, { Component } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { GiftedChat, Send, Message } from 'react-native-gifted-chat' // for the chat UI
import { ChatManager, TokenProvider } from '@pusher/chatkit-client' // for implementing chat functionality
import Config from 'react-native-config' // for reading .env file
import Icon from 'react-native-vector-icons/FontAwesome' // for showing icons
import Modal from 'react-native-modal'
import ChatActions, { ChatSelectors } from '../Redux/ChatRedux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ChatKitScreenStyle'
import { connect } from 'react-redux'
import CliquesAction from '../Redux/CliquesRedux'

const CHATKIT_INSTANCE_LOCATOR_ID =
  'v1:us1:141d2477-9feb-4560-8538-aaa2564728a4'

const CHATKIT_TOKEN_PROVIDER_ENDPOINT =
  'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/141d2477-9feb-4560-8538-aaa2564728a4/token'

class ChatKitScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      headerTitle: 'Chat',
      headerRight: (
        <View style={styles.header_right}>
          <TouchableOpacity
            style={styles.header_button_container}
            onPress={params.showUsersModal}>
            <View style={styles.header_button}>
              <Text style={styles.header_button_text}>Users</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      room_users: null,
      messages: [],
      is_initialized: false, // if Chatkit is initialized or not
      is_last_viewed_message_modal_visible: false,
      is_users_modal_visible: false,
      is_typing: false, // if there's someone in the room who is currently typing
      typing_user: null, // the username of the user who is typing
      show_load_earlier: false,
      viewed_user: null, // username of user whose read receipt is currently being viewed
      viewed_message: null // the text message being viewed
    }

    const { navigation } = this.props

    this.user_id = navigation.getParam('user_id')
    this.room_id = navigation.getParam('room_id')
    this.is_room_admin = navigation.getParam('is_room_admin')

    this.modal_types = {
      last_viewed_message: 'is_last_viewed_message_modal_visible',
      users: 'is_users_modal_visible'
    }
  }

  async componentDidMount() {
    this.props.navigation.setParams({
      showUsersModal: this.showUsersModal
    })

    try {
      const chatManager = new ChatManager({
        instanceLocator: CHATKIT_INSTANCE_LOCATOR_ID,
        userId: this.user_id,
        tokenProvider: new TokenProvider({
          url: CHATKIT_TOKEN_PROVIDER_ENDPOINT
        })
      })

      const currentUser = await chatManager.connect()
      this.currentUser = currentUser

      await this.currentUser.subscribeToRoomMultipart({
        roomId: this.room_id,
        hooks: {
          onMessage: this.onReceive
        },
        messageLimit: 25
      })

      await this.setState({
        is_initialized: true,
        room_users: this.currentUser.users
      })
    } catch (chat_mgr_err) {
      console.log('error with chat manager: ', chat_mgr_err)
    }
  }

  renderUser = ({ item }) => {
    const online_status = item.presenceStore[item.id]

    return (
      <View style={styles.list_item_body}>
        <View style={styles.list_item}>
          <View style={[styles.status_indicator, styles[online_status]]}></View>
          <Text style={styles.list_item_text}>{item.name}</Text>
        </View>
      </View>
    )
  }

  showUsersModal = () => {
    this.setState({
      is_users_modal_visible: true
    })
  }

  hideModal = type => {
    const modal = this.modal_types[type]
    this.setState({
      [modal]: false
    })
  }

  onSend = async ([message]) => {
    this.setState({
      is_sending: true // show the loading animation for sending a message
    })

    // next: send message
    try {
      if (this.last_message_id) {
        const set_cursor_response = await this.currentUser.setReadCursor({
          roomId: this.room_id,
          position: this.last_message_id // the ID of the last message they received
        })
      }
      // send the message
      await this.currentUser.sendMessage({
        roomId: this.room_id,
        text: message.text
      })

      await this.setState({
        is_sending: false // hide the loading animation
      })
    } catch (send_msg_err) {
      console.log('error sending message: ', send_msg_err)
    }
  }

  onReceive = async data => {
    this.last_message_id = data.id
    const { message } = await this.getMessage(data)

    this.props.pushMsg(this.room_id, message)

    if (this.props.messages(this.room_id).length > 9) {
      this.setState({
        show_load_earlier: true
      })
    }
  }

  getMessage = async ({ id, sender, parts, createdAt }) => {
    const text = parts.find(part => part.partType === 'inline').payload.content

    const msg_data = {
      _id: id,
      text,
      createdAt: new Date(createdAt),
      user: {
        _id: sender.id,
        name: sender.name,
        avatar: `https://ui-avatars.com/api/?background=d88413&color=FFF&name=${sender.name}`
      }
    }

    return {
      message: msg_data
    }
  }

  asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  renderMessage = msg => {
    const renderBubble = null
    const onLongPress = null

    const modified_msg = {
      ...msg,
      renderBubble,
      onLongPress
    }
    return <Message {...modified_msg} />
  }

  viewLastReadMessage = async data => {
    try {
      const cursor = await this.currentUser.readCursor({
        userId: data.userId,
        roomId: this.room_id
      })

      const viewed_message = this.props
        .messages(this.room_id)
        .find(msg => msg._id === cursor.position)

      await this.setState({
        viewed_user: data.name,
        is_last_viewed_message_modal_visible: true,
        viewed_message: viewed_message.text ? viewed_message.text : ''
      })
    } catch (view_last_msg_err) {
      console.log('error viewing last message: ', view_last_msg_err)
    }
  }

  loadEarlierMessages = async () => {
    this.setState({
      is_loading: true
    })

    const earliest_message_id = Math.min(
      ...this.props.messages(this.room_id).map(m => parseInt(m._id))
    )

    try {
      const messages = await this.currentUser.fetchMultipartMessages({
        roomId: this.room_id,
        initialId: earliest_message_id,
        direction: 'older',
        limit: 10
      })

      if (!messages.length) {
        this.setState({
          show_load_earlier: false
        })
      }

      const earlier_messages = []
      await this.asyncForEach(messages, async msg => {
        let { message } = await this.getMessage(msg)
        earlier_messages.push(message)
      })

      await this.setState(previousState => ({
        messages: previousState.messages.concat(earlier_messages)
      }))
    } catch (err) {
      console.log('error occured while trying to load older messages', err)
    }

    await this.setState({
      is_loading: false
    })
  }

  renderSend = props => {
    if (this.state.is_sending) {
      return (
        <ActivityIndicator
          size="small"
          color="#0064e1"
          style={[styles.loader, styles.sendLoader]}
        />
      )
    }

    return <Send {...props} />
  }

  render() {
    const {
      is_initialized,
      room_users,
      messages,
      is_last_viewed_message_modal_visible,
      viewed_user,
      viewed_message,
      is_users_modal_visible,
      show_load_earlier,
      typing_user
    } = this.state

    // next: render the Chat UI

    return (
      <View style={styles.container}>
        <GiftedChat
          messages={this.props.messages(this.room_id)}
          onSend={messages => this.onSend(messages)} // function to execute when send button is clicked
          user={{
            _id: this.user_id
          }}
          renderSend={this.renderSend} // custom send button UI
          renderMessage={this.renderMessage} // custom chat bubble UI
          extraData={{ typing_user }} // so that the footer will be re-rendered when the typing user is updated
          showUserAvatar={true}
          onPressAvatar={this.viewLastReadMessage} // function to execute when user avatar is clicked
        />
        {viewed_user && viewed_message && (
          <Modal isVisible={is_last_viewed_message_modal_visible}>
            <View style={styles.modal}>
              <View style={styles.modal_header}>
                <Text style={styles.modal_header_text}>
                  Last viewed msg: {viewed_user}
                </Text>
                <TouchableOpacity
                  onPress={this.hideModal.bind(this, 'last_viewed_message')}>
                  <Icon
                    name={'close'}
                    size={20}
                    color={'#565656'}
                    style={styles.close}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.modal_body}>
                <Text>Message: {viewed_message}</Text>
              </View>
            </View>
          </Modal>
        )}
        {room_users && (
          <Modal isVisible={is_users_modal_visible}>
            <View style={styles.modal}>
              <View style={styles.modal_header}>
                <Text style={styles.modal_header_text}>Users</Text>
                <TouchableOpacity onPress={this.hideModal.bind(this, 'users')}>
                  <Icon
                    name={'close'}
                    size={20}
                    color={'#565656'}
                    style={styles.close}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.modal_body}>
                <FlatList
                  keyExtractor={item => item.id.toString()}
                  data={room_users}
                  renderItem={this.renderUser}
                />
              </View>
            </View>
          </Modal>
        )}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    messages: room_id => ChatSelectors.getMessages(state, room_id)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    pushMsg: (room_id, message) =>
      dispatch(ChatActions.pushMessage(room_id, message))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatKitScreen)
