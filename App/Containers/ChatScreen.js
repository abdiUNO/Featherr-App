import React, {Component} from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  Clipboard,
  InteractionManager,
} from 'react-native'
import {connect} from 'react-redux'
import {Icon} from 'react-native-elements'
import {GiftedChat, Message, Time, Bubble} from 'react-native-gifted-chat'
//import Image from 'react-native-image-progress'
import Fire from '../Services/Fire'
import GiphyModal from '../Components/GiphyModal'
import styles from './Styles/ChatScreenStyle'
import NotificationsActions from '../Redux/NotificationsRedux'
import ReportModal from '../Components/ReportModal'

//import { createImageProgress } from 'react-native-image-progress';
//import FastImage from 'react-native-fast-image';

//const Image = createImageProgress(FastImage);
// Add Actions - replace 'Your' with whatever your reducer is called :)
import ConversationActions from '../Redux/ConversationRedux'
import firebase from 'react-native-firebase'

class ChatScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state
    return {
      headerRight: (
        <TouchableOpacity
          onPress={() =>
            params.isPrivate
              ? navigation.navigate('ConversationInfo', {group: params.group})
              : navigation.navigate('CliqueInfo', {group: params.group})
          }
          style={{
            marginRight: 15,
          }}
          hitSlop={{top: 10, bottom: 10, left: 20, right: 15}}>
          <Icon name="info" type="feather" color="#fff" />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#05BEAE',
        borderBottomColor: '#05BEAE',
        color: '#fff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      animationEnabled: true,
    }
  }

  constructor(props) {
    super(props)

    this._isMounted = true

    this.state = {
      messages: [],
      isSelectModalVisible: false,
      currentReportMsg: null,
      index: 0,
      isModalVisible: false,
      query: '',
    }
  }

  componentDidMount() {
    const {params} = this.props.navigation.state
    InteractionManager.runAfterInteractions(() => {
      this.props.clearNotification(params.chatId)
      firebase.messaging().unsubscribeFromTopic(params.chatId)
      if (params.isPrivate) this.props.setLastTimestamp(new Date().getTime())
      this.listenForMessages(params.chatId)
    })
  }

  componentWillUnmount() {
    this._isMounted = false
    const {params} = this.props.navigation.state
    firebase.messaging().subscribeToTopic(params.chatId)
    if (params.isPrivate) this.props.setLastTimestamp(new Date().getTime())
    params.addLastMsg(this.state.messages[0])
  }

  toggleSelectFriendModal = () =>
    this.setState({isSelectModalVisible: !this.state.isSelectModalVisible})

  addMessage = message => {
    if (this._isMounted)
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
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
    const {user} = this.props

    if (
      this.isSameUser(_props.currentMessage, _props.previousMessage) ||
      user.id === _props.currentMessage.user._id
    ) {
      const bubbleProp = _props
      bubbleProp.currentMessage.user.avatar = `http://cdn.featherrapp.com/profile_images/${bubbleProp.currentMessage.user.id}_200.jpg`
      // bubbleProp.currentMessage.user.avatar =
      //   'https://feather.sfo2.cdn.digitaloceanspaces.com/'
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
            paddingBottom: 10,
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

  onLongPress = (ctx, msg) => {
    console.log(ctx, msg)
    if (msg.text) {
      const options = ['Copy Text', 'Report Message', 'Cancel']
      const cancelButtonIndex = options.length - 1
      ctx.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        buttonIndex => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setString(msg.text)
              break
            case 1:
              this.setState(
                {currentReportMsg: msg},
                this.toggleSelectFriendModal,
              )
          }
        },
      )
    }
  }

  get user() {
    const {params} = this.props.navigation.state
    const {user} = this.props
    return {
      _id: user.id,
      name: user.username,
      chatId: params.chatId,
      isPrivate: params.isPrivate || false,
    }
  }

  toggleModal = () =>
    this.setState({isModalVisible: !this.state.isModalVisible})

  onGifSelect = (url, still) => {
    requestAnimationFrame(() => {
      this.setState({query: ''}, () => {
        this.toggleModal()
        this.onSend([
          {image: url, imageStill: still, text: '', user: this.user},
        ])
      })
    })
  }

  renderMessageImage = message => (
    <Image
      source={{uri: message.image}}
      style={{height: 150, marginRight: 1}}
      resizeMode="contain"
    />
  )

  renderMessage = msg => {
    const {renderMessageImage} = this.props

    if (msg.currentMessage.image) {
      msg.renderBubble = () => {
        return (
          <Bubble
            {...msg}
            wrapperStyle={{
              left: {backgroundColor: 'transparent'},
              right: {backgroundColor: 'transparent'},
            }}
            containerStyle={null}
          />
        )
      }
      msg.renderTime = () => {
        const {containerStyle, wrapperStyle, ...timeProps} = msg

        return (
          <Time
            {...timeProps}
            containerStyle={{left: [styles.timeContainer]}}
            textStyle={{
              right: {
                color: '#000',
              },
            }}
          />
        )
      }
    }
    const modified_msg = {
      ...msg,
      renderMessageImage,
    }
    return <Message {...modified_msg} />
  }

  reportMessage = reason => {
    if (this.state.currentReportMsg) {
      Fire.shared.report(this.state.currentReportMsg, reason)
      this.setState({currentReportMsg: null}, this.toggleModal)
    }
  }

  onGifChange = query => this.setState({query})
  onGifClear = () => this.setState({query: ''})

  render() {
    const {messages} = this.state
    return (
      <SafeAreaView style={{flex: 1}}>
        <GiphyModal
          toggleModal={this.toggleModal}
          isModalVisible={this.state.isModalVisible}
          onGifSelect={this.onGifSelect}
          onChange={this.onGifChange}
          onClear={this.onGifClear}
          query={this.state.query}
        />
        <ReportModal
          isModalVisible={this.state.isSelectModalVisible}
          onPress={this.reportMessage}
          onClose={this.toggleSelectFriendModal}
        />
        <GiftedChat
          onLongPress={this.onLongPress}
          renderActions={() => (
            <Icon
              name="gif"
              type="material"
              color="#2980b9"
              size={28}
              onPress={this.toggleModal}
              hitSlop={{
                top: 10,
                left: 10,
                right: 10,
                bottom: 10,
              }}
              containerStyle={{
                margin: 6,
                marginHorizontal: 10,
                borderColor: '#2980b9',
                borderWidth: 1.25,
                borderStyle: 'solid',
                borderRadius: 10,
              }}
            />
          )}
          messages={messages}
          onSend={this.onSend}
          user={this.user}
          alignTop={false}
          renderMessage={this.renderMessage}
          renderUsernameOnMessage={true}
        />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLastTimestamp: timestamp =>
      dispatch(ConversationActions.setTimeStamp(timestamp)),
    clearNotification: topic =>
      dispatch(NotificationsActions.clearNotification(topic)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatScreen)
