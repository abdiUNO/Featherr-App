import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Image,
} from 'react-native'
import { Button } from 'react-native-elements'
import OTPInputView from '@twotalltotems/react-native-otp-input'

import { connect } from 'react-redux'
import AuthActions from '../Redux/AuthRedux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/VerifyEmailScreenStyle'

const source = {
  uri:
    'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
}

class VerifyEmailScreen extends Component {
  state = {
    code: '',
  }

  render() {
    const { sendCode, verifyCode, user } = this.props
    const userId = user.id

    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.content}>
            <Text style={styles.inputLabel}>Verification</Text>
            <Text style={styles.inputSubLabel}>
              {
                'Please enter the verification code\nwe send to your email address'
              }
            </Text>

            <Button
              containerStyle={{ marginTop: 30 }}
              title="Resend"
              type="clear"
              onPress={() => sendCode(userId)}
            />

            <OTPInputView
              style={{ width: '80%', height: 200 }}
              pinCount={6}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              // onCodeChanged = {code => { this.setState({code})}}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => {
                verifyCode(userId, code, user.image !== '')
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loading: state.auth.fetching,
    error: state.auth.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    verifyCode: (id, code, skipUpload) =>
      dispatch(AuthActions.verifyEmailRequest(id, code, skipUpload)),
    sendCode: id => dispatch(AuthActions.sendCodeRequest(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyEmailScreen)
