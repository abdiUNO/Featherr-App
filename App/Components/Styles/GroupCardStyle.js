import { StyleSheet } from 'react-native'
import { normalize } from 'react-native-elements'
import colors from '../../Themes/Colors'
import { iOSUIKit } from 'react-native-typography'

export default StyleSheet.create({
  avatarContainer: {
    borderColor: colors.white,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 0.75,

    elevation: 1,
  },
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
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  container: {
    borderColor: colors.transparent,
    borderWidth: 1,
    borderRadius: 5,
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  shadow: {
    marginTop: 12.5,
    marginBottom: 12.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 1,
  },
  itemContainer: {
    paddingVertical: 25,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.transparent,
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
    ...iOSUIKit.calloutWhiteObject,
    fontWeight: 'bold',
  },
  subtitle: {
    color: colors.white,
    fontSize: normalize(12),
    marginTop: 0,
  },
  titleSubtitleContainer: {
    justifyContent: 'center',
    flex: 1,
  },
})
