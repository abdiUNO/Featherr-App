import { StyleSheet } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  messageContainer: {
    flex: 1,
    padding: 25
  },
  body: {
    flex: 1,
    height: hp('50%'),
    marginTop: 125,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25
  },
  center: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  text: {
    color: '#636e72',
    textAlign: 'center',
    fontSize: 20
  },
  activity: {
    paddingTop: 25
  }
})
