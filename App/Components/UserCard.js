import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import { Avatar, Button, Icon } from 'react-native-elements'
import styles from './Styles/UserCardStyle'
import colors from '../Themes/Colors'
export default class UserCard extends Component {
  renderAvatar = () => {
    const { user } = this.props
    return (
      <Avatar
        size="medium"
        containerStyle={styles.avatarContainer}
        avatarStyle={styles.avatar}
        rounded
        source={{ uri: `https://picsum.photos/300?random=${user.id}` }}
      />
    )
  }

  renderTitle = () => {
    const { username, fullname } = this.props.user

    return (
      <View style={styles.titleSubtitleContainer}>
        <View>
          <Text style={{ ...styles.title }}>{fullname}</Text>
        </View>
        <View style={{ paddingTop: 2.5 }}>
          <Text
            style={{
              ...styles.subtitle,
              fontWeight: '400'
            }}>
            {`@${username}`}
          </Text>
        </View>
      </View>
    )
  }

  renderAddButton = () => {
    return (
      <Button
        TouchableComponent={TouchableWithoutFeedback}
        buttonStyle={{
          paddingHorizontal: 13,
          paddingVertical: 6,
          borderRadius: 20,
          borderColor: '#dddddd',
          borderWidth: 1.5
        }}
        type="outline"
        icon={<Icon name="add" type="material" size={16} color="#05BEAE" />}
        title="Add"
        titleStyle={{ fontSize: 14, color: '#05BEAE' }}
        onPress={this.props.onPress}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <View style={styles.wrapper}>
            {this.renderAvatar()}
            {this.renderTitle()}
            {this.renderAddButton()}
          </View>
        </View>
      </View>
    )
  }
}
