import React, {Component} from 'react'
import Modal from 'react-native-modal'
import {Text, View, ScrollView, TouchableWithoutFeedback} from 'react-native'
import {SearchBar, Icon, Header, Divider, Button} from 'react-native-elements'
import UserCard from './UserCard'

export default class FriendsModal extends Component {
  state = {
    query: '',
  }

  updateSearch = query => {
    this.setState({query})
    if (query.length > 0) this.props.onQueryChange(query)
  }

  handleToggleModal = () =>
    requestAnimationFrame(() => {
      this.setState({query: ''}, this.props.toggleModal)
    })

  onAddFriend = userId => {
    this.props.onAddFriend(userId)
    this.handleToggleModal()
  }

  renderUsersQuery = () => {
    return this.props.users.map(user => {
      if (
        user.id !== this.props.currentUser.id &&
        !this.props.allIds[user.email]
      ) {
        return (
          <UserCard
            key={user.id}
            user={user}
            rightComponent={
              <Button
                TouchableComponent={TouchableWithoutFeedback}
                buttonStyle={{
                  paddingHorizontal: 13,
                  paddingVertical: 6,
                  borderRadius: 20,
                  borderColor: '#dddddd',
                  borderWidth: 1.5,
                }}
                type="outline"
                icon={
                  <Icon name="add" type="material" size={16} color="#05BEAE" />
                }
                title="Add"
                titleStyle={{fontSize: 14, color: '#05BEAE'}}
                onPress={() => this.onAddFriend(user.id)}
              />
            }
          />
        )
      }
    })
  }

  render() {
    const {query} = this.state

    return (
      <Modal
        isVisible={this.props.isModalVisible}
        style={{margin: 0, padding: 0}}
        onBackButtonPress={this.handleToggleModal}
        onBackdropPress={this.handleToggleModal}>
        <Header
          containerStyle={{borderBottomColor: '#fff'}}
          backgroundColor="#fff"
          centerComponent={{
            text: 'Add Friends',
            style: {color: '#05BEAE', fontSize: 20},
          }}
          rightComponent={{
            icon: 'close',
            color: '#05BEAE',
            size: 26,
            onPress: this.handleToggleModal,
          }}
        />
        <View style={{flex: 1, backgroundColor: '#fdfdfd'}}>
          <SearchBar
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={this.updateSearch}
            value={query}
            inputContainerStyle={{
              backgroundColor: '#e8e7ec',
            }}
            inputStyle={{
              color: '#000',
            }}
            containerStyle={{
              borderTopColor: '#FFF',
              borderBottomColor: '#FFF',
              backgroundColor: '#FFF',
            }}
            placeholder="Type Here..."
          />
          <Text
            style={{
              color: '#0AADB0',
              fontSize: 15,
              paddingLeft: 15,
              marginTop: 22,
            }}>
            My Friends
          </Text>
          <ScrollView
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="always">
            {this.props.users.length > 0 && this.state.query.length > 0
              ? this.renderUsersQuery()
              : null}
          </ScrollView>
        </View>
      </Modal>
    )
  }
}
