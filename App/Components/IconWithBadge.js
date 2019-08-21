import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from './Styles/IconWithBadgeStyle'

export default class IconWithBadge extends Component {
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

  render() {
    const { name, badgeCount, color, size } = this.props
    return (
      <View style={styles.container}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{badgeCount}</Text>
          </View>
        )}
      </View>
    )
  }
}
