import React, {Component} from 'react'
import {ScrollView, Text, View, Image, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'
import {Button} from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/WelcomeScreenStyle'
import Images from '../Themes/Images'

class WelcomeScreen extends Component {
  onSubmit = () => {}

  goToLogin = () => {
    const {navigation} = this.props
    navigation.navigate('Login')
  }

  goToSignUp = () => {
    const {navigation} = this.props
    navigation.navigate('SignUp')
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible})
  }

  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="position">
            <Image
              style={styles.image}
              source={Images.featherr_logo}
              resizeMode="contain"
            />
            <View style={styles.buttonsContainer}>
              <Button
                title="Login"
                titleStyle={{
                  color: '#0AADB0',
                  fontWeight: 'bold',
                  fontSize: 17,
                }}
                buttonStyle={[styles.button, styles.loginButton]}
                onPress={this.goToLogin}
              />
              <Button
                title="Sign Up"
                titleStyle={{color: '#FFF', fontWeight: 'bold', fontSize: 17}}
                buttonStyle={[styles.button, styles.signUpButton]}
                onPress={this.goToSignUp}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WelcomeScreen)
