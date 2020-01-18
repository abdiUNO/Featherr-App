import React, {Component} from 'react'
import {ScrollView, KeyboardAvoidingView, View} from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import {Header} from 'react-native-elements'
import {FormikActions} from 'formik'
import styles from './Styles/SignUpScreenStyle'
import UserNameForm from '../Components/UserNameForm'
import {Colors} from '../Themes'
import AuthActions from '../Redux/AuthRedux'
import {connect} from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay'

interface FormValues {
  email: string;
  password: string;
}

class SignUpThreeScreen extends Component {
  handleSubmit = async (
    values: FormValues,
    formikBag: FormikActions<FormValues>,
  ) => {
    const {navigation, attemptSignUp} = this.props
    const {firstName, lastName, email, password} = navigation.state.params
    const {userName} = values

    formikBag.setSubmitting(true)
    // Here you would usually make a call to your API for a login.
    await attemptSignUp(
      userName,
      email,
      firstName + ' ' + lastName,
      password,
      '1234',
    )
    formikBag.setSubmitting(false)
  }

  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <Spinner
          visible={this.props.fetching}
          textContent={'Loading...'}
          textStyle={{
            color: '#FFF',
          }}
        />
        <Header
          containerStyle={{borderBottomColor: 'transparent'}}
          backgroundColor="#FFFFFF"
          leftComponent={{
            icon: 'chevron-left',
            size: 26,
            color: Colors.panther,
            underlayColor: 'transparent',
            onPress: () => {
              this.props.navigation.goBack()
            },
          }}
        />
        <KeyboardAvoidingView behavior="position">
          <View style={styles.container}>
            <UserNameForm
              navigation={this.props.navigation}
              onSubmit={this.handleSubmit}
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
    error: state.auth.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    attemptSignUp: (username, email, fullname, password, fcmToken) =>
      dispatch(
        AuthActions.authRequest(username, email, fullname, password, fcmToken),
      ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpThreeScreen)
