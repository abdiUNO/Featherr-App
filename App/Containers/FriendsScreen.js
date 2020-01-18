import React, {Component} from 'react'
import {
  ScrollView,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  InteractionManager,
} from 'react-native'
import {connect} from 'react-redux'
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder'
import {Icon} from 'react-native-elements'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ChatCard from '../Components/ChatCard'
import PlaceholderCard from '../Components/PlaceholderCard'
import FriendsModal from '../Components/FriendsModal'
import SelectFriendModal from '../Components/SelectFriendModal'

import FriendsActions from '../Redux/FriendsRedux'
import QueryActions from '../Redux/QueryRedux'
import ConversationActions from '../Redux/ConversationRedux'
import {throttle} from 'lodash'

import Fire from '../Services/Fire'

// Styles
import styles from './Styles/FriendsScreenStyle'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

const STATUS_UNREAD = 0
const STATUS_READ = 1
const STATUS_NONE = 2

class FriendsScreen extends Component {
  constructor(props) {
    super(props)
    this._isMounted = true

    this.state = {
      messages: {},
      isAddModalVisible: false,
      isSelectModalVisible: false,
    }
  }

  componentDidMount() {
    this.getLastMessages()

    InteractionManager.runAfterInteractions(() => {
      this.props.getConversations()
      this.props.getFriends()
      this.props.navigation.setParams({
        addFriend: this.toggleAddFriendsModal,
      })
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  getLastMessages() {
    const {conversations} = this.props

    conversations.forEach((conversation, index) =>
      this.listenForMessages(conversation.id),
    )
  }

  addMessage = message => {
    if (this._isMounted && message) {
      const {messages} = this.state
      messages[message.chatId] = message
      requestAnimationFrame(() => this.setState({messages}))
    }
  }

  listenForMessages = (chatId, index) => {
    Fire.shared.getLastMsg(chatId, this.addMessage)
  }

  renderPlaceHolder() {
    return (
      <View>
        <PlaceholderCard>
          <Placeholder
            Left={props => (
              <PlaceholderMedia isRound={true} style={props.style} />
            )}
            Animation={Fade}>
            <PlaceholderLine width={80} />
            <PlaceholderLine />
            <PlaceholderLine width={30} />
          </Placeholder>
        </PlaceholderCard>
        <PlaceholderCard>
          <Placeholder
            Left={props => (
              <PlaceholderMedia isRound={true} style={props.style} />
            )}
            Animation={Fade}>
            <PlaceholderLine width={80} />
            <PlaceholderLine />
            <PlaceholderLine width={30} />
          </Placeholder>
        </PlaceholderCard>
      </View>
    )
  }

  toggleAddFriendsModal = () =>
    this.setState({isAddModalVisible: !this.state.isAddModalVisible})

  onQueryChange = query => {
    this.props.queryUsers(query)
  }

  toggleSelectFriendModal = () =>
    this.setState({isSelectModalVisible: !this.state.isSelectModalVisible})

  getChatId(friendId) {
    const chatIds = [friendId, this.props.user.id]
    chatIds.sort()

    return chatIds.join('-')
  }

  enterChat = group => {
    console.log(group)
    this.props.navigation.navigate('Chat', {
      userId: this.props.user.id,
      chatId: group.id,
      isPrivate: true,
      group,
      addLastMsg: this.addMessage,
    })
  }

  render() {
    const {fetching} = this.props
    const friends = Array.prototype.slice
      .call(this.props.friends)
      .sort((a, b) =>
        a.fullname > b.fullname
          ? 1
          : a.fullname === b.fullname
          ? a.username > b.username
            ? 1
            : -1
          : -1,
      )

    console.log(this.props.allIds)

    return (
      <View style={{flex: 1}}>
        <Text style={{color: '#000000'}}>
          {this.state.isSelectModalVisible}
        </Text>
        <FriendsModal
          users={this.props.users}
          friends={friends}
          allIds={this.props.allIds}
          currentUser={this.props.user}
          toggleModal={this.toggleAddFriendsModal}
          isModalVisible={this.state.isAddModalVisible}
          onQueryChange={this.onQueryChange}
          onAddFriend={this.props.addFriend}
        />
        <SelectFriendModal
          users={friends}
          toggleModal={this.toggleSelectFriendModal}
          isModalVisible={this.state.isSelectModalVisible}
          onSelect={this.props.createConversation}
        />
        <ScrollView style={styles.container}>
          <View style={{marginTop: 15}} behavior="position">
            {fetching ? (
              this.renderPlaceHolder()
            ) : (
              <View style={{flex: 1}}>
                {this.props.conversations.map(conversation => {
                  const user = conversation.members[0]
                  const lastMessage = this.state.messages[conversation.id]

                  let status = STATUS_NONE
                  let lastTimestamp = 0

                  if (lastMessage !== undefined) {
                    lastTimestamp = new Date(lastMessage.timestamp)
                    if (
                      lastTimestamp >
                      new Date(this.props.lastMessageReceivedTimestamp)
                    ) {
                      status = STATUS_UNREAD
                    } else {
                      status = STATUS_READ
                    }
                  }

                  const group = {
                    ...conversation,
                    members: [...conversation.members, this.props.user],
                  }
                  return (
                    <ChatCard
                      key={user.username}
                      friend={user}
                      time={
                        lastMessage
                          ? timeAgo.format(new Date(lastTimestamp), 'time')
                          : ''
                      }
                      status={status}
                      recentMsg={lastMessage}
                      onPress={() => this.enterChat(group)}
                    />
                  )
                })}
              </View>
            )}
          </View>
        </ScrollView>
        <Icon
          raised
          name="comment"
          type="material"
          color="#05BEAE"
          onPress={this.toggleSelectFriendModal}
          reverse={true}
          reverseColor="#FFFFFF"
          containerStyle={{
            position: 'absolute',
            bottom: 10,
            right: 10,
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    users: state.query.users,
    fetching: state.friends.fetching,
    friends: state.friends.friends,
    allIds: state.friends.allIds,
    conversations: state.conversations.all || [],
    lastMessageReceivedTimestamp:
      state.conversations.lastMessageReceivedTimestamp,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFriends: () => dispatch(FriendsActions.friendsRequest()),
    queryUsers: query => dispatch(QueryActions.queryUsersRequest(query)),
    addFriend: userId => dispatch(FriendsActions.addFriendRequest(userId)),
    getConversations: () => dispatch(ConversationActions.conversationRequest()),
    createConversation: friendId => {
      dispatch(ConversationActions.addConversationRequest(friendId))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FriendsScreen)
