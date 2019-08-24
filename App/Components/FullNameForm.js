import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import styles from './Styles/FullNameFormStyle'
import { Colors } from '../Themes'
import { Formik, FormikProps, FormikActions } from 'formik'
import { object as yupObject, string as yupString } from 'yup'
import { NavigationScreenProps } from 'react-navigation'

interface FormValues {
  firstName: string;
  lastName: string;
}

interface Props {
  navigation: NavigationScreenProps<any, any>;
}

const strings = {
  firstNameRequired: 'First Name is required.',
  lastNameRequired: 'Last Name is required.'
}

export default class FullNameForm extends Component<Props> {
  state = {
    firstNameFocused: false,
    lastNameFocused: false
  }

  handleFocus = () => this.setState({ isFocused: true })
  handleBlur = () => this.setState({ isFocused: false })

  handleSubmit = (values: FormValues, formikBag: FormikActions<FormValues>) => {
    formikBag.setSubmitting(true)
    // Here you would usually make a call to your API for a login.

    setTimeout(() => {
      formikBag.setSubmitting(false)
      this.props.navigation.navigate('SignUp')
    }, 3000)
  }

  renderForm = ({
    values,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,
    isSubmitting
  }: FormikProps<FormValues>) => (
    <View style={styles.container}>
      <Text style={styles.header}>What&lsquo;s your name? </Text>
      <Input
        containerStyle={styles.textInput}
        placeholder="First Name"
        placeholderTextColor={Colors.grey4}
        autoCapitalize="none"
        autoCorrect={false}
        value={values.firstName}
        onChangeText={value => setFieldValue('firstName', value)}
        onFocus={() => this.setState({ firstNameFocused: true })}
        onBlur={() => {
          this.setState({ firstNameFocused: false })
          setFieldTouched('firstName')
        }}
        editable={!isSubmitting}
        errorMessage={
          touched.firstName && errors.firstName ? errors.firstName : undefined
        }
        inputContainerStyle={
          this.state.firstNameFocused
            ? [styles.inputContainerStyle, styles.inputFocusStyle]
            : styles.inputContainerStyle
        }
        inputStyle={styles.inputStyle}
      />
      <Input
        containerStyle={styles.textInput}
        placeholder="Last Name"
        placeholderTextColor={Colors.grey4}
        autoCapitalize="none"
        autoCorrect={false}
        value={values.lastName}
        onChangeText={value => setFieldValue('lastName', value)}
        onFocus={() => this.setState({ lastNameFocused: true })}
        onBlur={() => {
          this.setState({ lastNameFocused: false })
          setFieldTouched('lastName')
        }}
        editable={!isSubmitting}
        errorMessage={
          touched.lastName && errors.lastName ? errors.lastName : undefined
        }
        inputContainerStyle={
          this.state.lastNameFocused
            ? [styles.inputContainerStyle, styles.inputFocusStyle]
            : styles.inputContainerStyle
        }
        inputStyle={styles.inputStyle}
      />
      <Button
        title="Sign Up"
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
          firstName: yupString().required(strings.firstNameRequired),
          lastName: yupString().required(strings.lastNameRequired)
        })}
        initialValues={{ firstName: '', lastName: '' }}
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
