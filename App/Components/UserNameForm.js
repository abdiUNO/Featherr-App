import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { Formik, FormikProps, FormikActions } from 'formik'
import { object as yupObject, string as yupString } from 'yup'
import { NavigationScreenProps } from 'react-navigation'
import styles from './Styles/FullNameFormStyle'
import { Colors } from '../Themes'

interface FormValues {
  userName: string;
}

interface Props {
  navigation: NavigationScreenProps<any, any>;
}

const strings = {
  userNameRequired: 'You must set a username.',
  charMinLength: 'Must be least 4 characters long.'
}

export default class UserNameForm extends Component<Props> {
  state = {
    userNameFocused: false
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
      <Text style={styles.header}>Pick a username</Text>
      <Input
        containerStyle={styles.textInput}
        placeholder="Username"
        placeholderTextColor={Colors.grey4}
        autoCapitalize="none"
        autoCorrect={false}
        value={values.userName}
        onChangeText={value => setFieldValue('userName', value)}
        onFocus={() => this.setState({ userNameFocused: true })}
        onBlur={() => {
          this.setState({ userNameFocused: false })
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
        leftIcon={<Icon name="user" type="feather" size={20} color="#86939e" />}
        leftIconContainerStyle={styles.iconStyle}
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
          userName: yupString()
            .min(4, strings.charMinLength)
            .required(strings.userNameRequired)
        })}
        initialValues={{ userName: '' }}
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
