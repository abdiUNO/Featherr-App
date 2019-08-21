import React, { Component } from 'react'
import Modal from 'react-native-modal'
import { Text, View, ScrollView } from 'react-native'
import { SearchBar, Icon, Header, Divider } from 'react-native-elements'
import UserCard from '../Components/UserCard'

export default class FriendsModal extends Component {
  state = {
    query: ''
  }

  updateSearch = query => {
    this.setState({ query })
    if (query.length > 0) this.props.onQueryChange(query)
  }

  onAddFriend = userId => {
    this.props.onAddFriend(userId)
    this.props.toggleModal()
  }

  renderUsersQuery = () => {
    return this.props.users.map(user => {
      return (
        <UserCard
          key={user.id}
          user={user}
          onPress={() => this.onAddFriend(user.id)}
        />
      )
    })
  }

  render() {
    const { query } = this.state

    return (
      <Modal
        isVisible={this.props.isModalVisible}
        style={{ margin: 0, padding: 0 }}
        onBackdropPress={this.props.toggleModal}>
        <Header
          containerStyle={{ borderBottomColor: '#fff' }}
          backgroundColor="#fff"
          centerComponent={{
            text: 'Add Friends',
            style: { color: '#05BEAE', fontSize: 20 }
          }}
          rightComponent={{
            icon: 'close',
            color: '#05BEAE',
            size: 26,
            onPress: this.props.toggleModal
          }}
        />
        <View style={{ flex: 1, backgroundColor: '#fdfdfd' }}>
          <SearchBar
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={this.updateSearch}
            value={query}
            inputContainerStyle={{
              backgroundColor: '#e8e7ec'
            }}
            inputStyle={{
              color: '#000'
            }}
            containerStyle={{
              borderTopColor: '#FFF',
              borderBottomColor: '#FFF',
              backgroundColor: '#FFF'
            }}
            placeholder="Type Here..."
          />
          <Text
            style={{
              color: '#0AADB0',
              fontSize: 15,
              paddingLeft: 15,
              marginTop: 22
            }}>
            My Friends
          </Text>
          <ScrollView
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="always">
            {this.props.users.length > 0 ? this.renderUsersQuery() : null}
          </ScrollView>
        </View>
      </Modal>
    )
  }
}
