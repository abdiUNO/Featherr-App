import React, {Component} from 'react'
import {ScrollView, View, Text} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import {Avatar, Button, ListItem} from 'react-native-elements'
// Styles
import styles from './Styles/AccountScreenStyle'

class AccountScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.infoContainer}>
          <Avatar
            containerStyle={styles.avatarContainer}
            size="xlarge"
            rounded
            source={{
              uri: `http://cdn.featherrapp.com/profile_images/${this.props.user.id}_200.jpg`,
            }}
          />

          <Text style={styles.fullnameTitle}>{this.props.user.fullname}</Text>
          <Text style={styles.username}>@{this.props.user.username}</Text>
        </View>
        <View style={{backgroundColor: '#fff', marginTop: 25}}>
          <ListItem
            containerStyle={styles.listItemContainer}
            key={2}
            title="Edit Profile"
            titleStyle={styles.listItemTitle}
            chevron={true}
            leftIcon={{
              name: 'edit-2',
              type: 'feather',
              reverse: true,
              size: 16,
              color: '#07BEF8',
            }}
            onPress={() =>
              this.props.navigation.navigate('EditProfile', {
                notifications: this.props.notifications || [],
                getPost: this.props.getPost,
              })
            }
          />
          <ListItem
            containerStyle={styles.listItemContainer}
            key={3}
            title="Change Password"
            titleStyle={styles.listItemTitle}
            chevron={true}
            leftIcon={{
              name: 'lock',
              type: 'feather',
              reverse: true,
              size: 16,
              color: '#353235',
            }}
            onPress={() =>
              this.props.navigation.navigate('ChangePassword', {
                notifications: this.props.notifications || [],
                getPost: this.props.getPost,
              })
            }
          />
        </View>
        <View style={{marginVertical: 25}}>
          <Button
            type="outline"
            title="LOG OUT"
            titleStyle={{color: '#e74c3c'}}
            activeOpacity={1}
            borderRadius={3}
            underlayColor="#FF3C30"
            backgroundColor="#FF3C30"
            buttonStyle={{borderColor: '#e74c3c'}}
            textStyle={{fontWeight: 'bold', color: 'white'}}
            onPress={() => {
              this.props.logout()
            }}
          />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {user: state.auth.user}
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({type: 'USER_LOGOUT'}),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountScreen)
