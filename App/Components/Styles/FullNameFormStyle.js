import { StyleSheet } from 'react-native'
import { human, iOSColors, systemWeights } from 'react-native-typography'
import { Colors } from '../../Themes'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
export default StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    ...human.title2Object,
    ...systemWeights.semibold,
    color: Colors.grey1,
    textAlign: 'center',
    marginVertical: hp('5%')
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
    marginTop: hp('5%')
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
    marginTop: hp('1%'),
    marginBottom: hp('10%')
  },
  forgetButtonText: {
    ...human.subheadObject,
    color: '#2089dc',
    textAlign: 'center',
    paddingTop: 2,
    paddingBottom: 1,
    fontWeight: '500'
  },
  submitButton: {
    backgroundColor: '#23b5b8',
    borderRadius: 25,
    marginHorizontal: wp('15%'),
    marginTop: hp('10%')
  },
  submitButtonTitle: {
    fontSize: 17,
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
