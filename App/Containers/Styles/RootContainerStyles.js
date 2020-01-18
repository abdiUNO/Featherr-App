import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors} from '../../Themes/'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import {human} from 'react-native-typography'

export default StyleSheet.create({
  applicationView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    margin: Metrics.baseMargin,
  },
  image: {
    width: wp('100%'),
    height: hp('22.5%'),
  },
  offlineHeader: {
    ...human.title3Object,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  offlineSubHeader: {
    ...human.subheadObject,
    marginTop: 12,
    textAlign: 'center',
  },
  myImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  offlineContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  offlineText: {
    color: '#fff',
  },
})
