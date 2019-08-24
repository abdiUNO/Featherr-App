import { StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, wp } from 'react-native-responsive-screen'
import { Colors } from '../../Themes'
import { human, systemWeights } from 'react-native-typography'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  textInput: {
    marginTop: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputsContainer: {
    marginTop: hp('2.5%')
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
  iconStyle: {
    marginLeft: 0,
    marginRight: wp('3.5%'),
    marginBottom: wp('0.5%')
  }
})
