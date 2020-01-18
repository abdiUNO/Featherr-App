import React, {Component} from 'react'
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import {connect} from 'react-redux'
import {Button, Icon, ListItem} from 'react-native-elements'
import UserCard from '../Components/UserCard'
import Spinner from 'react-native-loading-spinner-overlay'
import BottomSheet from '../Components/BottomSheet'
import ConversationActions from '../Redux/ConversationRedux'

import styles from './Styles/CliqueInfoScreenStyle'
import FriendsActions from '../Redux/FriendsRedux'

let baseUrl = 'http://featherr.appspot.com/api'

// if (__DEV__) baseUrl = 'http://localhost:8080/api'

class ConversationInfoScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Group Info',
    }
  }

  state = {
    isSelectModalVisible: false,
    blockedUserId: null,
    fetching: false,
  }

  blockUser = () => {
    this.toggleSelectFriendModal()

    if (this.state.blockedUserId !== null) {
      const id = this.props.allIds[this.state.blockedUserId]
      this.setState({fetching: true}, () =>
        fetch(`${baseUrl}/block/${id}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then(res => {
            res.json()
            this.props.getFriends()
          })
          .then(this.handleOnPress)
          .catch(err => console.log(err)),
      )
    }
  }

  handleOnPress = () => {
    const {params} = this.props.navigation.state

    this.props.deleteConversations(params.group.id)
  }

  toggleSelectFriendModal = state =>
    this.setState({
      isSelectModalVisible: !this.state.isSelectModalVisible,
    })

  onBlock(user) {
    console.log(user)
    this.toggleSelectFriendModal(true)
    this.setState({blockedUserId: user})
  }

  render() {
    const {params} = this.props.navigation.state

    return (
      <ScrollView style={styles.container}>
        <Spinner
          visible={this.props.fetching || this.state.fetching}
          textContent={'Deleting Convo...'}
          textStyle={{
            color: '#FFF',
          }}
        />
        <BottomSheet
          isModalVisible={this.state.isSelectModalVisible}
          onPress={this.blockUser}
          onClose={this.toggleSelectFriendModal}
        />
        <KeyboardAvoidingView behavior="position">
          <Text style={styles.usersHeader}>People in this group chat</Text>
          <View>
            {params.group.members.map(user => (
              <UserCard
                key={user.id}
                user={user}
                rightComponent={
                  <Button
                    TouchableComponent={TouchableWithoutFeedback}
                    buttonStyle={{
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      borderWidth: 0,
                    }}
                    type="outline"
                    icon={
                      <Icon
                        name="ellipsis-h"
                        type="font-awesome"
                        size={16}
                        color="#3d3d3d"
                        hitSlop={{
                          top: 35,
                          left: 35,
                          right: 35,
                          bottom: 35,
                        }}
                      />
                    }
                    onPress={() => this.onBlock(user.email)}
                  />
                }
              />
            ))}
          </View>
          <Button
            title="Delete Conversation"
            titleStyle={{color: '#e74c3c'}}
            type="outline"
            style={{marginTop: 25}}
            onPress={this.handleOnPress}
            activeOpacity={1}
            borderRadius={3}
            underlayColor="#FF3C30"
            backgroundColor="#FF3C30"
            buttonStyle={{borderColor: '#e74c3c'}}
            textStyle={{fontWeight: 'bold', color: 'white'}}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.cliques.fetching,
    loading: state.conversations.fetching,
    allIds: state.friends.allIds,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFriends: () => dispatch(FriendsActions.friendsRequest()),
    deleteConversations: conversationId =>
      dispatch(ConversationActions.deleteConversationRequest(conversationId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConversationInfoScreen)
