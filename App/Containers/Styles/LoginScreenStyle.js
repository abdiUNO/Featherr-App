import { StyleSheet, Dimensions, Platform } from 'react-native'
import { human, iOSColors, systemWeights } from 'react-native-typography'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { ApplicationStyles } from '../../Themes/'
const { height, width } = Dimensions.get('window')

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: hp('15%'),
    marginHorizontal: wp('7.5%')
  },
  image: {
    left: wp('15%'),
    position: 'absolute',
    width: wp('70%'),
    height: wp('65%'),
    opacity: 0.8
  },
  prompt: {
    ...human.title2Object,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 2.5,
    textAlignVertical: 'center',
    color: '#333333'
  },
  promptContainer: {
    backgroundColor: 'rgba(255, 255, 255,0.85)',
    marginVertical: 30,
    marginHorizontal: wp('30%'),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255,0)',
    borderRadius: wp('6.5%')
  },
  textInput: {
    marginTop: hp('2%')
  },
  labelStyle: {
    fontWeight: systemWeights.regular.fontWeight
  },
  inputsContainer: {
    marginTop: hp('5%')
  },
  inputStyle: {
    borderBottomColor: iOSColors.lightGray2
  },
  forgetButton: {
    fontSize: 10,
    marginTop: hp('1%'),
    marginBottom: hp('10%')
  },
  forgetText: {
    ...human.footnoteObject,
    color: '#2089dc',
    textAlign: 'center',
    paddingTop: 2,
    paddingBottom: 1,
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
  }
})
