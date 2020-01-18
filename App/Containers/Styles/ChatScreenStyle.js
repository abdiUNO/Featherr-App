import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  timeContainer: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  },
  standardFont: {
    fontSize: 15
  },
  headerItem: {
    marginRight: 10
  },
  time: {
    textAlign: 'left',
    fontSize: 12
  }
})
