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
import {object as yupObject, string as yupString} from 'yup'
import {NavigationScreenProps} from 'react-navigation'
import FloatingLabelInput from '../Components/FloatingLabelInput'
import AuthActions from '../Redux/AuthRedux'

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
}

interface Props {
  navigation: NavigationScreenProps<any, any>;
}

const strings = {
  emailAddress: 'Email address',
  invalidEmailFormat:
    "A valid email can only contain latin letters, numbers, '@unomaha.edu'",
  emailRequired: 'An email address is required.',
  firstNameRequired: 'First Name is required.',
  lastNameRequired: 'Last Name is required.',
  userNameRequired: 'You must set a username.',
  charMinLength: 'Must be least 4 characters long.',
}

class EditProfileScreen extends Component {
  state = {
    firstNameFocused: false,
    lastNameFocused: false,
    emailFocused: false,
    userNameFocused: false,
  }

  handleFocus = () => this.setState({isFocused: true})
  handleBlur = () => this.setState({isFocused: false})

  handleSubmit = async (
    values: FormValues,
    formikBag: FormikActions<FormValues>,
  ) => {
    const {updateProfile, user} = this.props
    const {firstName, lastName, email, userName} = values

    formikBag.setSubmitting(true)
    await updateProfile(
      user.id,
      userName.trim(),
      email.trim(),
      firstName.trim() + ' ' + lastName.trim(),
    )
    formikBag.setSubmitting(false)
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
  }: FormikProps<FormValues>) => (
    <View style={styles.container}>
      <View>
        <FloatingLabelInput
          containerStyle={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          value={values.firstName}
          onChangeText={value => setFieldValue('firstName', value)}
          onFocus={() => this.setState({firstNameFocused: true})}
          onBlur={() => {
            this.setState({firstNameFocused: false})
            setFieldTouched('firstName')
          }}
          editable={!isSubmitting}
          errorMessage={
            touched.firstName && errors.firstName ? errors.firstName : undefined
          }
          label="First Name"
          inputContainerStyle={
            this.state.firstNameFocused
              ? [styles.inputContainerStyle, styles.inputFocusStyle]
              : styles.inputContainerStyle
          }
          inputStyle={styles.inputStyle}
        />
      </View>
      <View>
        <FloatingLabelInput
          containerStyle={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          value={values.lastName}
          onChangeText={value => setFieldValue('lastName', value)}
          onFocus={() => this.setState({lastNameFocused: true})}
          onBlur={() => {
            this.setState({lastNameFocused: false})
            setFieldTouched('lastName')
          }}
          editable={!isSubmitting}
          errorMessage={
            touched.lastName && errors.lastName ? errors.lastName : undefined
          }
          label="Last Name"
          inputContainerStyle={
            this.state.lastNameFocused
              ? [styles.inputContainerStyle, styles.inputFocusStyle]
              : styles.inputContainerStyle
          }
          inputStyle={styles.inputStyle}
        />
      </View>

      <View>
        <FloatingLabelInput
          containerStyle={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          value={values.userName}
          onChangeText={value => setFieldValue('userName', value)}
          onFocus={() => this.setState({userNameFocused: true})}
          onBlur={() => {
            this.setState({userNameFocused: false})
            setFieldTouched('userName')
          }}
          editable={!isSubmitting}
          errorMessage={
            touched.userName && errors.userName ? errors.userName : undefined
          }
          inputContainerStyle={
            this.state.userNameFocused
              ? [styles.inputContainerStyle, styles.inputFocusStyle]
              : styles.inputContainerStyle
          }
          inputStyle={styles.inputStyle}
          label="Username"
        />
      </View>
      <View>
        <FloatingLabelInput
          containerStyle={styles.textInput}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={values.email}
          onFocus={this.onEmailFocused}
          onChangeText={value => setFieldValue('email', value)}
          onBlur={() => {
            this.setState({emailFocused: false})
            setFieldTouched('email')
          }}
          editable={!isSubmitting}
          errorMessage={
            touched.email && errors.email ? errors.email : undefined
          }
          inputContainerStyle={
            this.state.emailFocused
              ? [styles.inputContainerStyle, styles.inputFocusStyle]
              : styles.inputContainerStyle
          }
          label="Email"
          inputStyle={styles.inputStyle}
          leftIconContainerStyle={styles.iconStyle}
        />
      </View>
      <Button
        title="Update"
        titleStyle={styles.submitButtonTitle}
        buttonStyle={styles.submitButton}
        disabled={
          isSubmitting ||
          (this.props.user.email == values.email.trim() &&
            this.props.user.username == values.userName.trim() &&
            this.props.user.firstName == values.firstName.trim() &&
            this.props.user.lastName == values.lastName.trim())
        }
        loading={isSubmitting}
        onPress={handleSubmit}
      />
    </View>
  )

  render() {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView enabled={true}>
          {this.props.error && (
            <Text style={styles.error}>Uh oh! {this.props.error.message}</Text>
          )}
          <Formik
            validationSchema={yupObject().shape({
              firstName: yupString().required(strings.firstNameRequired),
              lastName: yupString().required(strings.lastNameRequired),
              email: yupString()
                .matches(
                  /^[A-Za-z0-9._%+-]+@unomaha.edu(\s*)$/,
                  strings.invalidEmailFormat,
                )
                .required(strings.emailRequired),
              userName: yupString()
                .min(4, strings.charMinLength)
                .required(strings.userNameRequired),
            })}
            initialValues={{
              firstName: this.props.user.firstName,
              lastName: this.props.user.lastName,
              email: this.props.user.email,
              userName: this.props.user.username,
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
  const nameArr = state.auth.user.fullname.split(' ')
  return {
    user: {
      ...state.auth.user,
      firstName: nameArr[0],
      lastName: nameArr[1],
    },
    error: state.auth.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: (id, username, email, fullname) =>
      dispatch(AuthActions.updateRequest(id, username, email, fullname)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfileScreen)
