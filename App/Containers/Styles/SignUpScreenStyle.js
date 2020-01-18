import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { human, iOSColors, systemWeights } from 'react-native-typography'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    marginTop: hp('5%'),
    marginHorizontal: wp('7.5%')
  },
  header: {
    ...human.title2Object,
    ...systemWeights.semibold,
    color: Colors.grey1,
    textAlign: 'center',
    marginTop: wp('5%')
  },
  subHeader: {
    ...systemWeights.semibold,
    color: Colors.grey2,
    textAlign: 'center'
  },
  subheaderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp('4%')
  },
  image: {
    marginHorizontal: wp('15%'),
    width: wp('65%'),
    height: wp('50%'),
    opacity: 0.8
  },
  textInput: {
    marginTop: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputsContainer: {
    marginTop: hp('25%')
  },
  inputContainerStyle: {
    borderColor: Colors.grey5,
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  inputStyle: {
    ...human.subheadObject,
    ...systemWeights.semibold,
    fontWeight: '500'
  },
  inputFocusStyle: {
    borderColor: Colors.grey4
  },
  forgetButton: {
    padding: 0,
    paddingLeft: 4
  },
  forgetText: {
    paddingTop: 0,
    paddingBottom: 2,
    ...human.calloutObject,
    color: '#2089dc',
    fontWeight: '500'
  },
  loginButton: {
    marginHorizontal: wp('5%')
  },
  loginTitle: {
    fontWeight: '500',
    paddingTop: 4,
    paddingBottom: 3
  },
  error: {
    ...human.footnoteObject,
    color: iOSColors.red,
    textAlign: 'center',
    fontWeight: '500',
    paddingTop: 4
  },
  iconStyle: {
    marginLeft: 0,
    marginRight: wp('3.5%'),
    marginBottom: wp('0.5%')
  }
})
