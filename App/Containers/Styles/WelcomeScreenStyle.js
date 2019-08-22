import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import Colors from '../../Themes/Colors'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    flex: 1,
    backgroundColor: '#05BEAE'
  },
  container: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  image: {
    width: wp('70%'),
    height: hp('25%'),
    marginHorizontal: wp('9.75%'),
    marginTop: hp('20%')
  },
  buttonsContainer: {
    marginTop: hp('20%')
  },
  button: {
    marginTop: hp('2.5%')
  },
  loginButton: {
    borderColor: '#fff',
    borderWidth: 1.4,
    marginHorizontal: wp('5%')
  },
  signUpButton: {
    marginHorizontal: wp('5%'),
    backgroundColor: '#fff'
  }
})
