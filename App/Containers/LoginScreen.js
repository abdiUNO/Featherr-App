import React, { Component } from 'react'
import { ScrollView, View, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AuthActions from '../Redux/AuthRedux'
import { NavigationActions } from 'react-navigation'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      emailValid: true,
      password: '',
      login_failed: false,
      showLoading: false
    }
  }

  validateEmail(email) {
    var re = /^[A-Za-z0-9._%+-]+@unomaha.edu(\s*)$/

    return re.test(email)
  }

  render() {
    const { email, password, emailValid, showLoading } = this.state
    const { attemptLogin, fetching } = this.props

    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <View>
            <Input
              containerStyle={{ marginTop: 25 }}
              onChangeText={_email => this.setState({ email: _email })}
              value={email}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              ref={input => (this.emailInput = input)}
              onSubmitEditing={() => {
                this.setState({ emailValid: this.validateEmail(email) })
                this.passwordInput.focus()
              }}
              onBlur={() => {
                this.setState({ emailValid: this.validateEmail(email) })
              }}
              blurOnSubmit={false}
              errorMessage={
                emailValid ? null : 'Please enter a valid email address'
              }
              placeholder="Email"
              leftIcon={
                <Icon
                  name="envelope"
                  size={24}
                  color="black"
                  style={{ marginRight: 15 }}
                />
              }
            />
            <Input
              containerStyle={{ marginVertical: 25 }}
              onChangeText={password => this.setState({ password })}
              value={password}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="done"
              ref={input => (this.passwordInput = input)}
              blurOnSubmit
              placeholder="Password"
              leftIcon={
                <Icon
                  name="circle"
                  size={24}
                  color="black"
                  style={{ marginRight: 15 }}
                />
              }
            />
            <Button
              title="Login"
              disabled={!emailValid || password.length < 4}
              loading={fetching}
              onPress={() => attemptLogin(email, password)}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.auth.fetching,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    attemptLogin: (email, password) =>
      dispatch(AuthActions.loginRequest(email, password))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
