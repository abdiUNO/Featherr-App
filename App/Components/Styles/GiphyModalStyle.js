import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    margin: 0
  },
  content: {
    backgroundColor: '#000',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  innerContent: {
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12
  }
})
