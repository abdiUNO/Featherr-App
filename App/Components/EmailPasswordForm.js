import React, {Component} from 'react'
// import PropTypes from 'prop-types';
import {Text, View} from 'react-native'
import {Button, Icon, Input} from 'react-native-elements'
import {Formik, FormikProps, FormikActions} from 'formik'
import {object as yupObject, string as yupString} from 'yup'
import {NavigationScreenProps} from 'react-navigation'
import {Colors} from '../Themes'
import styles from './Styles/EmailPasswordFormStyle'

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  navigation: NavigationScreenProps<any, any>;
}

const strings = {
  emailAddress: 'Email address',
  password: 'Password',
  invalidEmailFormat:
    "A valid email can only contain latin letters, numbers, '@unomaha.edu'",
  emailRequired: 'An email address is required.',
  passwordRequired: 'A password is required.',
  passwordMinLength: 'A secure password must be at least 8 characters long.',
}

export default class EmailPasswordForm extends Component<Props> {
  constructor(props) {
    super(props)

    this.state = {
      emailFocused: false,
      passwordFocused: false,
    }

    this.inputs = {}
  }

  focusNextField(id) {
    this.inputs[id].focus()
  }

  handleFocus = () => this.setState({isFocused: true})

  handleBlur = () => this.setState({isFocused: false})

  handleSubmit = (values: FormValues, formikBag: FormikActions<FormValues>) => {
    formikBag.setSubmitting(true)
    // Here you would usually make a call to your API for a login.

    setTimeout(() => {
      formikBag.setSubmitting(false)
      this.props.navigation.navigate('SignUp')
    }, 3000)
  }

  onEmailFocused = () => this.setState({emailFocused: true})

  onPasswordFocused = () => this.setState({passwordFocused: true})

  renderForm = ({
    values,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,
    isSubmitting,
    handleBlur,
  }: FormikProps<FormValues>) => (
    <View style={styles.container}>
      <Input
        autoFocus={true}
        blurOnSubmit={false}
        returnKeyType={'next'}
        ref={input => {
          this.inputs['email'] = input
        }}
        containerStyle={styles.textInput}
        placeholder="Email"
        placeholderTextColor={Colors.grey4}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={values.email}
        onFocus={this.onEmailFocused}
        onChangeText={value => setFieldValue('email', value)}
        onBlur={() => {
          this.setState({emailFocused: false})
          setFieldTouched('email')
          handleBlur('email')
        }}
        editable={!isSubmitting}
        errorMessage={touched.email && errors.email ? errors.email : undefined}
        inputContainerStyle={
          this.state.emailFocused
            ? [styles.inputContainerStyle, styles.inputFocusStyle]
            : styles.inputContainerStyle
        }
        inputStyle={styles.inputStyle}
        leftIcon={<Icon name="mail" type="feather" size={20} color="#86939e" />}
        leftIconContainerStyle={styles.iconStyle}
        onSubmitEditing={() => {
          // specify the key of the ref, as done in the previous section.
          this.focusNextField('password')
        }}
      />
      <Input
        containerStyle={styles.textInput}
        placeholder="Password"
        ref={input => {
          this.inputs['password'] = input
        }}
        placeholderTextColor={Colors.grey4}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        value={values.password}
        onFocus={this.onPasswordFocused}
        onChangeText={value => setFieldValue('password', value)}
        onBlur={() => {
          this.setState({passwordFocused: false})
          setFieldTouched('password')
        }}
        editable={!isSubmitting}
        errorMessage={
          touched.password && errors.password ? errors.password : undefined
        }
        inputContainerStyle={
          this.state.passwordFocused
            ? [styles.inputContainerStyle, styles.inputFocusStyle]
            : styles.inputContainerStyle
        }
        inputStyle={styles.inputStyle}
        leftIcon={<Icon name="lock" type="feather" size={20} color="#86939e" />}
        leftIconContainerStyle={styles.iconStyle}
        onSubmitEditing={handleSubmit}
      />

      {this.props.forget ? (
        <Button
          title="Forget your password?"
          titleStyle={styles.forgetButtonText}
          type="clear"
          buttonStyle={styles.forgetButton}
        />
      ) : (
        <View style={styles.forgetButton}></View>
      )}

      <Button
        title={this.props.forget ? 'Login' : 'Continue'}
        titleStyle={styles.submitButtonTitle}
        buttonStyle={styles.submitButton}
        disabled={isSubmitting}
        loading={isSubmitting}
        onPress={handleSubmit}
      />
    </View>
  )

  render() {
    return (
      <Formik
        validationSchema={yupObject().shape({
          email: yupString()
            .matches(
              /^[A-Za-z0-9._%+-]+@unomaha.edu(\s*)$/,
              strings.invalidEmailFormat,
            )
            .required(strings.emailRequired),
          password: yupString()
            .min(8, strings.passwordMinLength)
            .required(strings.passwordRequired),
        })}
        initialValues={{email: '', password: ''}}
        onSubmit={(values: FormValues, formikBag: FormikActions<FormValues>) =>
          this.props.onSubmit(values, formikBag)
        }
        render={(formikBag: FormikProps<FormValues>) =>
          this.renderForm(formikBag)
        }
      />
    )
  }
}
