import { StyleSheet } from 'react-native'
import { normalize } from 'react-native-elements'
import colors from '../../Themes/Colors'
import { iOSUIKit } from 'react-native-typography'

export default StyleSheet.create({
  avatarContainer: {
    borderColor: colors.white,
    borderWidth: 2
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  container: {
    marginTop: 12.5,
    marginBottom: 12.5,
    borderColor: colors.transparent,
    borderWidth: 1,
    borderRadius: 5,
    borderBottomWidth: 1
  },
  shadow: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.transparent,
    shadowColor: colors.grey0,
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5
  },
  itemContainer: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.transparent
  },
  list: {
    marginBottom: 0,
    marginTop: 0,
    borderTopWidth: 0,
    padding: 12.5,
    borderBottomWidth: 0,
    backgroundColor: colors.transparent
  },
  wrapper: {
    flexDirection: 'row',
    marginLeft: 0,
    alignItems: 'center'
  },
  title: {
    ...iOSUIKit.bodyEmphasizedWhiteObject,
    fontWeight: 'bold'
  },
  subtitle: {
    color: colors.white,
    fontSize: normalize(12),
    marginTop: 1
  },
  titleSubtitleContainer: {
    justifyContent: 'center',
    flex: 1
  }
})
