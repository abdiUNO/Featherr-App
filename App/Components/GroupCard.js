import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { List, ListItem, Avatar, normalize, Badge } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import styles from './Styles/GroupCardStyle'

export default class GroupCard extends Component {
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

  renderAvatars = users => {
    return users.map((user, index) => (
      <Avatar
        key={user.name}
        containerStyle={{
          left: -10 * index,
          marginRight: users.length === 1 && index === 0 ? 15 : 0,
          ...styles.avatarContainer
        }}
        rounded
        source={{ uri: `https://picsum.photos/300?random=${index}` }}
      />
    ))
  }

  renderTitle = item => {
    return (
      <View style={styles.titleSubtitleContainer}>
        <View>
          <Text style={{ ...styles.title }}>
            {item.members.map((user, index) => {
              if (index === item.members.length - 1) return `${user.name}...`
              return `${user.name}, `
            })}
          </Text>
        </View>
        <View style={{ paddingTop: 2.5 }}>
          <Text style={{ ...styles.subtitle }}>...</Text>
        </View>
      </View>
    )
  }

  onItemPress = item => () => {
    const { props } = this
    return props.onPress(item)
  }

  render() {
    const { item } = this.props
    const { colors } = this.props

    return (
      <View style={styles.shadow}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={colors}
          style={styles.container}>
          <TouchableOpacity onPress={this.onItemPress(item)}>
            <View style={styles.itemContainer}>
              <View style={styles.wrapper}>
                {this.renderAvatars(item.members)}
                {this.renderTitle(item)}
              </View>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    )
  }
}
