import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/TextInputStyle'
import { Colors } from '../Themes'
import { Icon, Input } from 'react-native-elements'

export default class TextInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      valid: false,
      focused: false
    }
  }

  onFocus = () =>
    this.setState({
      focused: true
    })

  onBlur = () =>
    this.setState({
      valid: this.props.validate(this.state.valid),
      focused: false
    })

  render() {
    const { value } = this.props
    const { valid, focused } = this.state

    return (
      <View style={styles.container}>
        <Input
          onFocus={this.onFocus}
          onBlur={() =>
            this.setState({
              firstNameValid: this.validateName(value),
              firstNameFocus: false
            })
          }
          containerStyle={styles.textInput}
          onChangeText={this.onFirstNameChange}
          value={firstName}
          autoCapitalize="none"
          autoCorrect={false}
          inputContainerStyle={
            firstNameFocus
              ? [styles.inputContainerStyle, styles.inputFocusStyle]
              : styles.inputContainerStyle
          }
          ref={input => (this.firstNameInput = input)}
          onSubmitEditing={() => {
            this.setState({
              firstNameValid: this.validateName(firstName)
            })

            this.lastNameInput.focus()
          }}
          blurOnSubmit={false}
          errorMessage={firstNameValid ? null : 'first name required'}
          placeholder="First Name"
          placeholderTextColor={Colors.grey4}
          inputStyle={styles.inputStyle}
          leftIcon={
            <Icon name="user" type="feather" size={20} color="#86939e" />
          }
          leftIconContainerStyle={styles.iconStyle}
        />
      </View>
    )
  }
}
