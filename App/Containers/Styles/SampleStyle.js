import { StyleSheet } from 'react-native'
import { iOSUIKit, iOSColors, systemWeights } from 'react-native-typography'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  content: {
    flex: 1,
    marginHorizontal: 12.5,
    marginVertical: 25,
    backgroundColor: Colors.background
  },
  headingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    borderBottomColor: '#fff',
    color: '#FF8900'
  },
  headingTitle: {
    ...iOSUIKit.largeTitleEmphasizedObject,
    ...systemWeights.bold,
    marginLeft: 12,
    fontSize: 30,
    color: '#FF8900'
  },
  subhead: {
    ...iOSUIKit.bodyEmphasizedObject,
    color: iOSColors.gray
  }
})
