import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import {List, ListItem, Avatar, normalize, Badge} from 'react-native-elements'
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
    return users.map((user, index) => {
      return (
        <Avatar
          key={user.username}
          containerStyle={[
            index === 2 && {
              left: users.length > 3 ? -34 * index : -25 * index,
              bottom: index > 1 ? -20 : 0,
              marginRight: users.length === 1 && index === 0 ? 15 : 0,
            },
            index === 3 && {
              left: index > 1 ? -23 * index : 0,
              bottom: index > 1 ? -20 : 0,
              marginRight: users.length === 1 && index === 0 ? 15 : 0,
            },
            styles.avatarContainer,
          ]}
          rounded
          source={{
            uri: `http://cdn.featherrapp.com/profile_images/${user.id}_200.jpg`,
          }}
        />
      )
    })
  }

  renderTitle = item => {
    const {recentMsg, time} = this.props

    return (
      <View style={styles.titleSubtitleContainer}>
        <View>
          <Text style={{...styles.title}}>
            {item.members.map((user, index) => {
              if (index === item.members.length - 1)
                return `${user.username}...`
              return `${user.username}, `
            })}
          </Text>
        </View>
        <View style={{paddingTop: 2.5}}>
          {recentMsg != null ? (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                flexWrap: 'wrap',
              }}>
              <Text
                style={{
                  ...styles.subtitle,
                  fontSize: normalize(11),
                  fontWeight: 'bold',
                  marginRight: 5,
                }}>
                {recentMsg.user.name}:
              </Text>
              <Text
                style={{
                  ...styles.subtitle,
                  fontWeight: '400',
                }}>{`${
                recentMsg.text !== ''
                  ? recentMsg.text.replace(/(\r\n|\n|\r)/gm, ' ').substr(0, 25)
                  : 'Sent Gif'
              } • ${time}`}</Text>
            </View>
          ) : (
            <Text
              style={{
                ...styles.subtitle,
                fontWeight: '400',
              }}>
              {' '}
            </Text>
          )}
        </View>
      </View>
    )
  }

  onItemPress = () => {
    const {item} = this.props
    return this.props.onPress(item)
  }

  render() {
    const {item} = this.props
    const {colors} = this.props

    return (
      <View style={styles.shadow}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={colors}
          style={styles.container}>
          <TouchableOpacity onPress={this.onItemPress}>
            <View style={styles.itemContainer}>
              <View style={styles.wrapper}>
                <View
                  style={{
                    top: -10,
                    width: '25%',
                    flexDirection: 'row',
                  }}>
                  {this.renderAvatars(item.members)}
                </View>
                {this.renderTitle(item)}
              </View>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    )
  }
}
