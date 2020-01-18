import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView, View } from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import { Header } from 'react-native-elements'
import { FormikActions } from 'formik'
import styles from './Styles/SignUpScreenStyle'
import FullNameForm from '../Components/FullNameForm'
import { Colors } from '../Themes'

interface FormValues {
  email: string;
  password: string;
}

class SignUpScreen extends Component {
  handleSubmit = (values: FormValues, formikBag: FormikActions<FormValues>) => {
    formikBag.setSubmitting(true)
    // Here you would usually make a call to your API for a login.
    formikBag.setSubmitting(false)
    this.props.navigation.navigate('SignUpTwo', values)
  }

  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <Header
          containerStyle={{ borderBottomColor: 'transparent' }}
          backgroundColor="#FFFFFF"
          leftComponent={{
            icon: 'chevron-left',
            size: 26,
            color: Colors.panther,
            underlayColor: 'transparent',
            onPress: () => {
              this.props.navigation.goBack()
            }
          }}
        />
        <KeyboardAvoidingView behavior="position">
          <View style={styles.container}>
            <FullNameForm
              navigation={this.props.navigation}
              onSubmit={this.handleSubmit}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

export default SignUpScreen
