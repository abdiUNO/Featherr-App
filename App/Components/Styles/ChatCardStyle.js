import { StyleSheet } from 'react-native'
import { iOSUIKit } from 'react-native-typography'
import { normalize } from 'react-native-elements'
import colors from '../../Themes/Colors'

export default StyleSheet.create({
  avatarContainer: {
    padding: 2,
    marginRight: 15,
    borderColor: colors.white,
    borderWidth: 2,
  },
  avatar: {},
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: colors.black,
    backgroundColor: 'transparent',
  },
  container: {
    marginBottom: 12.5,
    borderColor: colors.transparent,
    borderWidth: 1,
    borderRadius: 5,
    borderBottomWidth: 1,
    // backgroundColor: colors.white
  },
  shadow: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.transparent,
    shadowColor: colors.grey0,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
  },
  itemContainer: {
    marginLeft: 0,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 35,
    backgroundColor: colors.transparent,
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    marginBottom: 0,
    marginTop: 0,
    borderTopWidth: 0,
    padding: 12.5,
    borderBottomWidth: 0,
    backgroundColor: colors.transparent,
  },
  wrapper: {
    flexDirection: 'row',
    marginLeft: 0,
    alignItems: 'center',
  },
  title: {
    ...iOSUIKit.bodyEmphasizedObject,
    fontWeight: 'bold',
  },
  subtitle: {
    color: colors.black,
    fontSize: normalize(12),
    marginTop: 0,
  },
  titleSubtitleContainer: {
    justifyContent: 'center',
    flex: 1,
  },
})
