import React, {Component} from 'react'
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Text,
  Image,
  Platform,
} from 'react-native'
import {connect} from 'react-redux'
import {Input, Button, Header} from 'react-native-elements'
import AuthActions from '../Redux/AuthRedux'
import EmailPasswordForm from '../Components/EmailPasswordForm'
import {FormikActions} from 'formik'
import {NavigationScreenProps} from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'
import Images from '../Themes/Images'
import {Colors} from '../Themes'

interface Props {
  navigation: NavigationScreenProps<any, any>;
}

interface FormValues {
  email: string;
  password: string;
}

class LoginScreen extends Component<Props> {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      emailValid: true,
      password: '',
      login_failed: false,
      showLoading: false,
    }
  }

  validateEmail(email) {
    var re = /^[A-Za-z0-9._%+-]+@unomaha.edu(\s*)$/

    return re.test(email)
  }

  onSubmit = () => {
    const {email, password} = this.state
    const {attemptLogin} = this.props

    attemptLogin(email, password)
  }

  handleSubmit = async (
    values: FormValues,
    formikBag: FormikActions<FormValues>,
  ) => {
    const {attemptLogin} = this.props
    formikBag.setSubmitting(true)
    // Here you would usually make a call to your API for a login.
    await attemptLogin(values.email, values.password)
    formikBag.setSubmitting(false)
  }

  render() {
    const {email, password, emailValid, showLoading} = this.state
    const {fetching} = this.props

    return (
      <ScrollView>
        <Spinner
          visible={fetching}
          textContent={'Loading...'}
          textStyle={{
            color: '#FFF',
          }}
        />
        <Header
          containerStyle={{borderBottomColor: 'transparent'}}
          backgroundColor="#FFFFFF"
          placement="left"
          leftComponent={{
            icon: 'chevron-left',
            color: Colors.grey,
            underlayColor: 'transparent',
            onPress: () => {
              this.props.navigation.goBack()
            },
          }}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.container}>
            {this.props.error && (
              <Text style={styles.error}>
                Uh oh! {this.props.error.message}
              </Text>
            )}
            <Text style={styles.header}>Log In</Text>
            <EmailPasswordForm
              forget
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
    attemptLogin: (email, password) =>
      dispatch(AuthActions.loginRequest(email, password)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen)
