import React, {Component} from 'react'
import Modal from 'react-native-modal'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Animated,
  Easing,
} from 'react-native'
import {Icon, ListItem} from 'react-native-elements'
import {human} from 'react-native-typography'
import useAnimation from './useAnimation'

const OPTIONS = ['Block User']

const TRANSFORMS = ['translateX', 'translateY', 'rotate', 'scale']

const isTransform = prop => {
  return TRANSFORMS.includes(prop)
}

const AnimatedComponent = ({
  type = 'translateY',
  interpolation = {
    inputRange: [0, 1], // range of the scroll value
    outputRange: [Dimensions.get('window').height / 2, 0], // range of the translateX value
    extrapolate: 'clamp',
  },
  fade = true,
  duration = 300,
  delay = 60,
  easing = Easing.ease,
  doAnimation,
  onAnimationEnd,
  children,
  method = 'spring',
}) => {
  const animatedValue = useAnimation({
    doAnimation,
    duration,
    delay,
    easing,
    onAnimationEnd,
    type: method,
  })

  const animatedTypeStyle = {}
  animatedTypeStyle[type] = animatedValue.interpolate(interpolation)

  let animatedStyles

  if (isTransform(type)) {
    animatedStyles = {
      transform: [animatedTypeStyle],
    }
  } else {
    animatedStyles = animatedTypeStyle
  }

  console.log(animatedStyles)

  return (
    <Animated.View
      style={{
        ...animatedStyles,
        opacity: fade ? animatedValue : 1,
      }}>
      {children}
    </Animated.View>
  )
}

const Header = ({onPress, header, fontSize}) => (
  <View style={styles.header}>
    <Text style={{...styles.headerText, fontSize: header ? 16 : 20}}>
      {header || 'Report Message'}
    </Text>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon
        name="close"
        color="#000"
        size={25}
        style={styles.buttonText}
        onPress={onPress}
        hitSlop={{
          top: 10,
          left: 10,
          right: 10,
          bottom: 10,
        }}
      />
    </TouchableOpacity>
  </View>
)

export default class BottomSheet extends Component {
  state = {
    query: '',
  }

  handleOnPress = option => {
    this.props.onPress(option)
    this.props.onClose()
  }

  render() {
    return (
      <Modal
        isVisible={this.props.isModalVisible}
        onBackdropPress={this.props.onClose}
        onSwipeComplete={this.props.onClose}
        swipeDirection={['down']}
        hasBackdrop={true}
        style={{margin: 0, padding: 0}}>
        <View style={styles.modal}>
          <AnimatedComponent doAnimation>
            <SafeAreaView style={styles.bottomArea}>
              <Header onPress={this.props.onClose} header={'Actions'} />
              <ScrollView keyboardShouldPersistTaps="always">
                <ListItem
                  leftIcon={{
                    name: 'ban',
                    type: 'font-awesome',
                    reverse: true,
                    size: 16,
                    color: '#e74c3c',
                  }}
                  containerStyle={styles.listItemContainer}
                  title="Block User"
                  titleStyle={styles.listItemTitle}
                  chevron={true}
                  onPress={this.handleOnPress}
                />
              </ScrollView>
            </SafeAreaView>
          </AnimatedComponent>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  listItemTitle: {
    ...human.calloutObject,
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 2,
    color: '#e74c3c',
  },

  listItemContainer: {
    paddingLeft: 10,
    paddingRight: 14,
    paddingVertical: 15,
  },
  modal: {
    padding: 10,
    marginLeft: '1%',
    marginRight: '1%',
    position: 'absolute',
    bottom: 0,
    width: '98%',
    height: '30%',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  header: {
    borderRadius: 10,
    margin: 5,
    marginBottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    height: 50,
    width: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 45,
    borderColor: '#CCC',
  },
  buttonText: {
    color: '#333',
    fontSize: 50,
    alignSelf: 'center',
  },
  bottomArea: {
    height: '100%',
  },
})
