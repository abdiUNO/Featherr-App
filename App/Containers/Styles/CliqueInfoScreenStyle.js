import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'
import { human, iOSColors, systemWeights } from 'react-native-typography'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FFFFFF'
  },
  usersHeader: {
    ...human.subheadObject,
    ...systemWeights.regular,
    marginTop: 25,
    marginBottom: 5,
    marginLeft: 12,
    color: iOSColors.gray
  }
})
