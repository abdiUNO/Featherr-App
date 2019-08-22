import React, { Component } from 'react'
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Input, Button, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AuthActions from '../Redux/AuthRedux'
import { NavigationActions } from 'react-navigation'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'
import Images from '../Themes/Images'

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

  onSubmit = () => {
    const { email, password } = this.state
    const { attemptLogin } = this.props

    attemptLogin(email, password)
  }

  render() {
    const { email, password, emailValid, showLoading } = this.state
    const { fetching } = this.props

    return (
      <ScrollView>
        <Header
          backgroundColor="#05BEAE"
          placement="left"
          leftComponent={{
            icon: 'chevron-left',
            color: '#fff',
            underlayColor: 'transparent',
            onPress: () => {
              this.props.navigation.goBack()
            }
          }}
        />
        <KeyboardAvoidingView behavior="position">
          <Image style={styles.image} source={Images.welcome} />

          <View style={styles.container}>
            <View style={styles.promptContainer}>
              <Text style={styles.prompt}>Log In</Text>
            </View>

            <View style={styles.inputsContainer}>
              <Input
                containerStyle={styles.textInput}
                onChangeText={_email => this.setState({ email: _email })}
                value={email}
                autoCapitalize="none"
                autoCorrect={false}
                inputContainerStyle={styles.inputStyle}
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
                label="Email"
                labelStyle={styles.labelStyle}
              />
              <Input
                containerStyle={styles.textInput}
                onChangeText={password => this.setState({ password })}
                value={password}
                inputContainerStyle={styles.inputStyle}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                ref={input => (this.passwordInput = input)}
                blurOnSubmit
                label="Password"
                labelStyle={styles.labelStyle}
              />
              {this.props.error && (
                <Text style={styles.error}>
                  Uh oh! {this.props.error.message}
                </Text>
              )}
              <Button
                title="Forget your password?"
                titleStyle={styles.forgetText}
                type="clear"
                style={styles.forgetButton}
              />
              <Button
                style={styles.loginButton}
                title="Login"
                disabledTitleStyle={styles.loginTitle}
                disabled={!emailValid || password.length < 4}
                loading={fetching}
                onPress={this.onSubmit}
              />
            </View>
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
