import React, { Component } from 'react'
import {
  ScrollView,
  View,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native'
import { connect } from 'react-redux'
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from 'rn-placeholder'
import ChatCard from '../Components/ChatCard'
import PlaceholderCard from '../Components/PlaceholderCard'
import FriendsModal from '../Components/FriendsModal'

import FriendsActions from '../Redux/FriendsRedux'
import QueryActions from '../Redux/QueryRedux'
import Fire from '../Services/Fire'

// Styles
import styles from './Styles/FriendsScreenStyle'

const chats = [
  {
    id: 1,
    username: 'Isacc Weinhausen',
    recentMsg: "I'm definately in! now",
    status: 1,
    time: 'now'
  },
  {
    id: 2,
    username: 'Brendan Aronoff',
    recentMsg: 'Brendan sent a sticker',
    status: 0,
    time: '9m'
  },
  {
    id: 3,
    username: 'Amy Warrel',
    recentMsg: 'See you soon!',
    status: 2,
    time: '37m'
  }
]

class FriendsScreen extends Component {
  constructor(props) {
    super(props)
    this._isMounted = true

    this.state = {
      messages: {},
      isModalVisible: false
    }
  }

  componentDidMount() {
    this.props.getFriends()
    this.props.navigation.setParams({
      addFriend: this.toggleModal
    })
  }

  componentWillMount(): void {
    const { friends } = this.props

    friends.map(friend => {
      this.listenForMessages(friend.id, this.addMessage())
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  addMessage = message => {
    if (this._isMounted && message) {
      const { messages } = this.state
      messages[message.chatId] = message
      this.setState({ messages })
    }
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  listenForMessages = chatId => {
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

  onQueryChange = query => {
    this.props.queryUsers(query)
  }

  render() {
    const { fetching, friends } = this.props

    return (
      <View style={{ flex: 1 }}>
        <FriendsModal
          users={this.props.users}
          toggleModal={this.toggleModal}
          isModalVisible={this.state.isModalVisible}
          onQueryChange={this.onQueryChange}
          onAddFriend={this.props.addFriend}
        />
        <ScrollView style={styles.container}>
          <KeyboardAvoidingView style={{ marginTop: 15 }} behavior="position">
            {fetching ? (
              this.renderPlaceHolder()
            ) : (
              <View style={{ flex: 1 }}>
                {friends.map(friend => {
                  return (
                    <ChatCard
                      key={friend.username}
                      friend={friend}
                      time="3w"
                      status={0}
                      recentMsg={this.state.messages[friend.id]}
                      onPress={() => {
                        this.props.navigation.navigate('Chat', {
                          chatId: friend.id
                        })
                        //this.setState({ isModalVisible: true })
                      }}
                    />
                  )
                })}
              </View>
            )}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.query.users,
    fetching: state.friends.fetching,
    friends: state.friends.friends
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFriends: () => dispatch(FriendsActions.friendsRequest()),
    queryUsers: query => dispatch(QueryActions.queryUsersRequest(query)),
    addFriend: userId => dispatch(FriendsActions.addFriendRequest(userId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsScreen)
