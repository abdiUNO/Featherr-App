import React, {Component} from 'react'
import {ScrollView, Text, KeyboardAvoidingView, View} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import {Header} from 'react-native-elements'
import {FormikActions} from 'formik'
import styles from './Styles/SignUpScreenStyle'
import AuthActions from '../Redux/AuthRedux'
import EmailPasswordForm from '../Components/EmailPasswordForm'
import {NavigationScreenProps} from 'react-navigation'
import {Colors} from '../Themes'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

interface Props {
  navigation: NavigationScreenProps<any, any>;
}

interface FormValues {
  email: string;
  password: string;
}

class SignUpTwoScreen extends Component<Props> {
  onSubmit = () => {
    const {email, password} = this.state
    const {attemptLogin} = this.props

    attemptLogin(email, password)
  }

  handleSubmit = (values: FormValues, formikBag: FormikActions<FormValues>) => {
    const {navigation} = this.props
    formikBag.setSubmitting(true)
    formikBag.setSubmitting(false)
    this.props.navigation.navigate('SignUpThree', {
      ...values,
      ...navigation.state.params,
    })
  }

  render() {
    return (
      <ScrollView style={styles.mainContainer}>
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
            {this.props.error && (
              <Text style={styles.error}>
                Uh oh! {this.props.error.message}
              </Text>
            )}
            <Text
              style={[
                styles.header,
                {marginTop: hp('5%'), marginBottom: hp('4%')},
              ]}>
              Sign Up
            </Text>
            <EmailPasswordForm
              navigation={this.props.navigation}
              onSubmit={this.handleSubmit}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

export default SignUpTwoScreen
