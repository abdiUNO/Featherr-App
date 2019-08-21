import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Avatar } from 'react-native-elements'
import styles from './Styles/ChatCardStyle'
import colors from '../Themes/Colors'
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from 'rn-placeholder'
import PlaceholderCard from './PlaceholderCard'

const UNREAD = 0
const READ = 1

export default class ChatCard extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  renderAvatars = () => {
    const { friend } = this.props
    return (
      <Avatar
        size="medium"
        containerStyle={styles.avatarContainer}
        avatarStyle={styles.avatar}
        rounded
        source={{ uri: `https://picsum.photos/300?random=${friend.id}` }}
      />
    )
  }

  renderTitle = () => {
    const { time, friend, recentMsg } = this.props
    const { username } = friend
    return (
      <View style={styles.titleSubtitleContainer}>
        <View>
          <Text style={{ ...styles.title }}>{username}</Text>
        </View>
        <View style={{ paddingTop: 2.5 }}>
          {recentMsg != null ? (
            <Text
              style={{
                ...styles.subtitle,
                fontWeight: '400'
              }}>{`${recentMsg.text} • ${time}`}</Text>
          ) : (
            <Text
              style={{
                ...styles.subtitle,
                fontWeight: '400'
              }}>
              {' '}
            </Text>
          )}
        </View>
      </View>
    )
  }

  renderStatusIcon = status => {
    if (status === UNREAD) {
      return <Icon name="circle" size={20} color="#68E1CD" />
    }
    if (status === READ) {
      return <Icon name="check-circle" size={20} color={colors.steel} />
    }

    return <View />
  }

  render() {
    const { onPress, status } = this.props

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.itemContainer}>
            <View style={styles.wrapper}>
              {this.renderAvatars()}
              {this.renderTitle()}
            </View>
            {this.renderStatusIcon(status)}
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
