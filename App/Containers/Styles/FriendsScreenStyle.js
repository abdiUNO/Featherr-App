import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes'
import colors from '../../Themes/Colors'
import { normalize } from 'react-native-elements'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  subtitle: {
    color: colors.black,
    fontSize: normalize(12),
    marginTop: 0
  }
})
