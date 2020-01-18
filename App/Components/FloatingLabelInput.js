import React, {Component} from 'react'
import {View, StatusBar, TextInput, Animated} from 'react-native'
import {Input} from 'react-native-elements'
import {human, iOSColors, systemWeights} from 'react-native-typography'
import styles from './Styles/FloatingLabelInputStyle'

export default class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  }

  constructor(props) {
    super(props)

    this._animatedIsFocused = new Animated.Value(
      this.props.value === '' ? 0 : 1,
    )
  }

  handleFocus = () => {
    this.props.onFocus()
    this.setState({isFocused: true})
  }
  handleBlur = () => {
    this.props.onBlur()
    this.setState({isFocused: false})
  }
  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
      duration: 200,
    }).start()
  }

  render() {
    const {label, ...props} = this.props
    const labelStyle = {
      position: 'absolute',
      left: 20,
      ...human.subheadObject,
      ...systemWeights.semibold,
      fontWeight: '500',
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [48, 10],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 14],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#808d98', '#79848e'],
      }),
    }
    return (
      <View style={{paddingTop: 18}}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <Input
          {...props}
          autoCapitalize="none"
          style={styles.input}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
        />
      </View>
    )
  }
}
