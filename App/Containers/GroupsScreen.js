import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  FlatList,
  View,
  Button
} from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios' // for making requests to the server

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/GroupsScreenStyle'

const CHAT_SERVER = 'http://f7730a78.ngrok.io'

class GroupsScreen extends Component {
  state = {
    rooms: []
  }

  constructor(props) {
    super(props)
    const { navigation } = this.props
  }

  async componentDidMount(): void {
    this.user_id = this.props.user.id

    try {
      const response = await axios.post(`${CHAT_SERVER}/rooms`, {
        user_id: this.user_id
      })
      const { rooms } = response.data
      this.setState({
        rooms
      })
    } catch (get_rooms_err) {
      console.log('error getting rooms: ', get_rooms_err)
    }
  }

  enterChat = async room => {
    try {
      this.props.navigation.navigate('Chat', {
        user_id: this.user_id,
        room_id: room.id,
        room_name: room.name,
        isPrivate: false
      })
    } catch (get_permissions_err) {
      console.log('error getting permissions: ', get_permissions_err)
    }
  }

  renderRoom = ({ item }) => {
    return (
      <View style={styles.list_item}>
        <Text style={styles.list_item_text}>{item.name}</Text>
        <Button
          title="Enter"
          color="#0064e1"
          onPress={() => {
            this.enterChat(item)
          }}
        />
      </View>
    )
  }

  render() {
    const { rooms } = this.state

    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          {rooms && (
            <FlatList
              keyExtractor={item => item.id.toString()}
              data={rooms}
              renderItem={this.renderRoom}
            />
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsScreen)
