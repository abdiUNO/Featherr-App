import React, {Component} from 'react'
import {ScrollView, Text, KeyboardAvoidingView, View} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EditProfileScreenStyle'
import {Button, Header, Icon, Input} from 'react-native-elements'
import {Colors} from '../Themes'
import FullNameForm from '../Components/FullNameForm'
import {Formik, FormikActions, FormikProps} from 'formik'
import * as yup from 'yup'
import {NavigationScreenProps} from 'react-navigation'
import FloatingLabelInput from '../Components/FloatingLabelInput'
import AuthActions from '../Redux/AuthRedux'

interface FormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Props {
  navigation: NavigationScreenProps<any, any>;
}

const strings = {
  password: 'Password',
  passwordRequired: 'A password is required.',
  passwordMinLength: 'A secure password must be at least 8 characters long.',
}

const yupObject = yup.object
const yupString = yup.string

function equalTo(ref: any, msg: any) {
  return yup.mixed().test({
    name: 'equalTo',
    exclusive: false,
    message: msg || '${path} must be the same as ${reference}',
    params: {
      reference: ref.path,
    },
    test: function(value: any) {
      return value === this.resolve(ref)
    },
  })
}
yup.addMethod(yup.string, 'equalTo', equalTo)

class ChangePasswordScreen extends Component {
  state = {
    currentPasswordFocused: false,
    newPasswordFocused: false,
    confirmPasswordFocused: false,
  }

  handleSubmit = async (
    values: FormValues,
    formikBag: FormikActions<FormValues>,
  ) => {
    const {changePassword, user} = this.props
    const {currentPassword, confirmPassword} = values

    formikBag.setSubmitting(true)
    await changePassword(user.id, currentPassword, confirmPassword)
    formikBag.setSubmitting(false)
  }

  renderForm = ({
    values,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,
    isSubmitting,
  }: FormikProps<FormValues>) => {
    return (
      <View style={styles.container}>
        <FloatingLabelInput
          containerStyle={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          value={values.currentPassword}
          onChangeText={value => setFieldValue('currentPassword', value)}
          onFocus={() => this.setState({currentPasswordFocused: true})}
          onBlur={() => {
            this.setState({currentPasswordFocused: false})
            setFieldTouched('currentPassword')
          }}
          editable={!isSubmitting}
          errorMessage={
            touched.currentPassword && errors.currentPassword
              ? errors.currentPassword
              : undefined
          }
          label="Current Password"
          inputContainerStyle={
            this.state.currentPasswordFocused
              ? [styles.inputContainerStyle, styles.inputFocusStyle]
              : styles.inputContainerStyle
          }
          inputStyle={styles.inputStyle}
          secureTextEntry
        />
        <FloatingLabelInput
          containerStyle={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          value={values.newPassword}
          onChangeText={value => setFieldValue('newPassword', value)}
          onFocus={() => this.setState({newPasswordFocused: true})}
          onBlur={() => {
            this.setState({newPasswordFocused: false})
            setFieldTouched('newPassword')
          }}
          editable={!isSubmitting}
          errorMessage={
            touched.newPassword && errors.newPassword
              ? errors.newPassword
              : undefined
          }
          label="New Password"
          inputContainerStyle={
            this.state.newPasswordFocused
              ? [styles.inputContainerStyle, styles.inputFocusStyle]
              : styles.inputContainerStyle
          }
          inputStyle={styles.inputStyle}
          secureTextEntry
        />
        <FloatingLabelInput
          containerStyle={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          value={values.confirmPassword}
          onChangeText={value => setFieldValue('confirmPassword', value)}
          onFocus={() => this.setState({confirmPasswordFocused: true})}
          onBlur={() => {
            this.setState({confirmPasswordFocused: false})
            setFieldTouched('confirmPassword')
          }}
          editable={!isSubmitting}
          errorMessage={
            touched.confirmPassword && errors.confirmPassword
              ? errors.confirmPassword
              : undefined
          }
          label="New Password"
          inputContainerStyle={
            this.state.confirmPasswordFocused
              ? [styles.inputContainerStyle, styles.inputFocusStyle]
              : styles.inputContainerStyle
          }
          inputStyle={styles.inputStyle}
          secureTextEntry
        />
        <Button
          title="Update"
          titleStyle={styles.submitButtonTitle}
          buttonStyle={styles.submitButton}
          disabled={isSubmitting}
          loading={isSubmitting}
          onPress={handleSubmit}
        />
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView enabled={true}>
          {this.props.error && (
            <Text style={styles.error}>Uh oh! {this.props.error.message}</Text>
          )}
          <Formik
            validationSchema={yupObject().shape({
              currentPassword: yupString()
                .label('currentPassword')
                .min(8, strings.passwordMinLength)
                .required(strings.passwordRequired),
              newPassword: yupString()
                .label('newPassword')
                .min(8, strings.passwordMinLength)
                .required(strings.passwordRequired),
              confirmPassword: yupString()
                .label('confirmPassword')
                .min(8, strings.passwordMinLength)
                .equalTo(yup.ref('newPassword'), 'Passwords must match')
                .required(strings.passwordRequired),
            })}
            initialValues={{
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            onSubmit={(
              values: FormValues,
              formikBag: FormikActions<FormValues>,
            ) => this.handleSubmit(values, formikBag)}
            render={(formikBag: FormikProps<FormValues>) =>
              this.renderForm(formikBag)
            }
          />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    error: state.auth.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changePassword: (id, oldPassword, newPassword) =>
      dispatch(AuthActions.changePasswordRequest(id, oldPassword, newPassword)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePasswordScreen)
