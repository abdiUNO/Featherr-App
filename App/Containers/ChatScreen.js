import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { Icon } from 'react-native-elements'
import Fire from '../Services/Fire'
//import firebase from 'react-native-firebase'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// // import YourActions from '../Redux/YourRedux'

class ChatScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state

    return {
      headerRight: (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('GroupSettings', { group: params.group })
          }
          style={{
            marginRight: 15
          }}
          hitSlop={{ top: 10, bottom: 10, left: 20, right: 15 }}>
          <Icon name="info" type="feather" color="#fff" />
        </TouchableOpacity>
      )
    }
  }

  constructor(props) {
    super(props)

    this._isMounted = true

    this.state = {
      messages: [],
      index: 0
    }
  }

  componentDidMount() {
    const { params } = this.props.navigation.state
    this.listenForMessages(params.chatId)
  }

  componentWillUnmount() {
    this._isMounted = false
    const { params } = this.props.navigation.state
  }

  addMessage = message => {
    if (this._isMounted)
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }))
  }

  listenForMessages = chatId => {
    Fire.shared.on(chatId, this.addMessage)
  }

  isSameUser = (currentMessage, previousMessage) => {
    if (previousMessage.user !== undefined) {
      return currentMessage.user._id === previousMessage.user._id
    } else {
      return false
    }
  }

  renderBubble = _props => {
    const { user } = this.props

    if (
      this.isSameUser(_props.currentMessage, _props.previousMessage) ||
      user.id === _props.currentMessage.user._id
    ) {
      const bubbleProp = _props

      bubbleProp.currentMessage.user.avatar =
        'https://feather.sfo2.cdn.digitaloceanspaces.com/'
      return <Bubble {...bubbleProp} />
    }

    return (
      <View>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: '#5a6263',
            padding: 5,
            paddingBottom: 10
          }}>
          {_props.currentMessage.user.username}
        </Text>
        <Bubble {..._props} />
      </View>
    )
  }

  onSend = messages => {
    Fire.shared.send(messages)
  }

  get user() {
    const { params } = this.props.navigation.state
    const { user } = this.props
    console.log(user)
    return {
      _id: user.id,
      name: user.username,
      chatId: params.chatId
    }
  }

  render() {
    const { messages } = this.state
    return (
      <GiftedChat
        messages={messages}
        onSend={this.onSend}
        user={this.user}
        renderBubble={this.renderBubble}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.data.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatScreen)
