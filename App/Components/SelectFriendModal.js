import React, {Component} from 'react'
import Modal from 'react-native-modal'
import {Text, View, ScrollView, TouchableWithoutFeedback} from 'react-native'
import {SearchBar, Icon, Header, Button} from 'react-native-elements'
import UserCard from './UserCard'

export default class SelectFriendModal extends Component {
  state = {
    query: '',
  }

  handleOnPress = userId => {
    this.props.onSelect(userId)
    this.props.toggleModal()
  }

  renderUsersQuery = () => {
    return this.props.users.map(user => {
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
              title="Select"
              titleStyle={{fontSize: 14, color: '#05BEAE'}}
              onPress={() => this.handleOnPress(user.id)}
            />
          }
        />
      )
    })
  }

  render() {
    return (
      <Modal
        isVisible={this.props.isModalVisible}
        style={{margin: 0, padding: 0}}
        onBackdropPress={this.props.toggleModal}>
        <Header
          containerStyle={{borderBottomColor: '#05BEAE'}}
          backgroundColor="#05BEAE"
          centerComponent={{
            text: 'Select Contact',
            style: {color: '#FFFFFF', fontSize: 20},
          }}
          rightComponent={{
            icon: 'close',
            color: '#FFFFFF',
            size: 26,
            onPress: this.props.toggleModal,
          }}
        />
        <View style={{flex: 1, backgroundColor: '#fdfdfd'}}>
          <Text
            style={{
              color: '#0AADB0',
              fontSize: 15,
              paddingLeft: 15,
              marginTop: 22,
            }}>
            Contacts
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
