import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { human, systemWeights } from 'react-native-typography'
import Colors from '../../Themes/Colors'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  fullnameTitle: {
    ...human.title2Object,
    ...systemWeights.bold,
    color: Colors.panther,
    opacity: 0.8,
    textAlign: 'center'
  },
  username: {
    ...human.bodyObject,
    ...systemWeights.light,
    color: Colors.drawer,
    marginTop: 5,
    textAlign: 'center'
  },
  avatarContainer: {
    padding: hp('3%'),
    margin: 0
  },
  infoContainer: {
    alignItems: 'center',
    marginHorizontal: wp('2.5%')
  },
  listItemTitle: {
    ...human.calloutObject
  },
  listItemContainer: {
    paddingLeft: 10,
    paddingRight: 14,
    paddingVertical: 8
  }
})
