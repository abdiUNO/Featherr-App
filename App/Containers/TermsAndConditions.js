// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles

import React, {Component} from 'react'
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import {Colors} from '../Themes'
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

const HAS_LAUNCHED = 'HAS_LAUNCHED_FEATHERR'

function setAppLaunched(callback) {
  AsyncStorage.setItem(HAS_LAUNCHED, 'true', callback)
}

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  )
}

class TermsAndConditions extends Component {
  static navigationOptions = ({navigation}) => {
    const {routeName} = navigation.state
    const headerTitle = routeName

    return {
      header: (
        <View style={styles.headingContainer}>
          <Text style={styles.headingTitle}>Listen</Text>
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            hitSlop={{top: 15, bottom: 15, left: 15, right: 5}}>
            <Text
              style={{fontWeight: 'bold', marginRight: 12, color: '#FF8900'}}>
              + Join Clique
            </Text>
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: '#fff',
        borderBottomColor: '#fff',
        color: '#FF8900',
      },
    }
  }

  render() {
    const {navigation} = this.props

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.content}>
          <Text style={styles.title}>Terms and conditions</Text>
          <ScrollView style={styles.tcContainer}>
            <Text style={styles.tcP}>
              Welcome to Featherr. If you continue to browse and use this app,
              you are agreeing to comply with and be bound by the following
              terms and conditions of use, which together with our privacy
              policy govern Featherr’s relationship with you in relation to this
              app. If you disagree with any part of these terms and conditions,
              please do not use our app.
            </Text>
            <Text style={styles.tcP}>
              The term ‘Featherr’ or ‘us’ or ‘we’ refers to the owner of the
              app. The term ‘you’ refers to the user or viewer of our website.
            </Text>
            <Text style={styles.tcP}>
              Featherr App End User License Agreement This End User License
              Agreement (“Agreement”) is between you and Featherr and governs
              use of this app made available through the Apple App Store. By
              installing the Featherr App, you agree to be bound by this
              Agreement and understand that there is no tolerance for
              objectionable content. If you do not agree with the terms and
              conditions of this Agreement, you are not entitled to use the
              Featherr App.
            </Text>
            <Text style={styles.tcP}>
              In order to ensure Featherr provides the best experience possible
              for everyone, we strongly enforce a no tolerance policy for
              objectionable content. If you see inappropriate content, please
              use the "Report as offensive" feature found under each post.
            </Text>
            <Text style={styles.tcL}>
              {'\u2022'} Parties This Agreement is between you and Featherr
              only, and not Apple, Inc. (“Apple”). Notwithstanding the
              foregoing, you acknowledge that Apple and its subsidiaries are
              third party beneficiaries of this Agreement and Apple has the
              right to enforce this Agreement against you. Featherr, not Apple,
              is solely responsible for the Featherr App and its content.
            </Text>
            <Text style={styles.tcL}>
              {'\u2022'} Privacy Featherr may collect and use information about
              your usage of the Featherr App, including certain types of
              information from and about your device. Featherr may use this
              information, as long as it is in a form that does not personally
              identify you, to measure the use and performance of the Featherr
              App.
            </Text>
            <Text style={styles.tcL}>
              {'\u2022'} Limited License Featherr grants you a limited,
              non-exclusive, non-transferable, revocable license to use
              theFeatherr App for your personal, non-commercial purposes. You
              may only use theFeatherr App on Apple devices that you own or
              control and as permitted by the App Store Terms of Service.
            </Text>
            <Text style={styles.tcL}>
              {'\u2022'}Age Restrictions By using the Featherr App, you
              represent and warrant that (a) you are 17 years of age or older
              and you agree to be bound by this Agreement; (b) if you are under
              17 years of age, you have obtained verifiable consent from a
              parent or legal guardian; and (c) your use of the Featherr App
              does not violate any applicable law or regulation. Your access to
              the Featherr App may be terminated without warning if Featherr
              believes, in its sole discretion, that you are under the age of 17
              years and have not obtained verifiable consent from a parent or
              legal guardian. If you are a parent or legal guardian and you
              provide your consent to your child's use of the Featherr App, you
              agree to be bound by this Agreement in respect to your child's use
              of the Featherr App.
            </Text>
            <Text style={styles.tcL}>
              {'\u2022'} Objectionable Content Policy Content may not be
              submitted to Featherr. Objectionable Content includes, but is not
              limited to: (i) sexually explicit materials; (ii) obscene,
              defamatory, libelous, slanderous, violent and/or unlawful content
              or profanity; (iii) content that infringes upon the rights of any
              third party, including copyright, trademark, privacy, publicity or
              other personal or proprietary right, or that is deceptive or
              fraudulent; (iv) content that promotes the use or sale of illegal
              or regulated substances, tobacco products, ammunition and/or
              firearms; and (v) gambling, including without limitation, any
              online casino, sports books, bingo or poker.
            </Text>
            <Text style={styles.tcL}>
              {'\u2022'} Warranty Featherr disclaims all warranties about the
              Featherr App to the fullest extent permitted by law. To the extent
              any warranty exists under law that cannot be disclaimed, Featherr,
              not Apple, shall be solely responsible for such warranty.
            </Text>
            <Text style={styles.tcL}>
              {'\u2022'} Maintenance and Support Featherr does provide minimal
              maintenance or support for it but not to the extent that any
              maintenance or support is required by applicable law, Featherr,
              not Apple, shall be obligated to furnish any such maintenance or
              support.
            </Text>
            <Text style={styles.tcL}>
              {'\u2022'} Product Claims Featherr, not Apple, is responsible for
              addressing any claims by you relating to the Featherr App or use
              of it, including, but not limited to: (i) any product liability
              claim; (ii) any claim that the Featherr App fails to conform to
              any applicable legal or regulatory requirement; and (iii) any
              claim arising under consumer protection or similar legislation.
              Nothing in this Agreement shall be deemed an admission that you
              may have such claims.
            </Text>
            <Text style={styles.tcL}>
              {'\u2022'} Third Party Intellectual Property Claims Featherr shall
              not be obligated to indemnify or defend you with respect to any
              third party claim arising out or relating to the Featherr App. To
              the extent Featherr is required to provide indemnification by
              applicable law, Featherr, not Apple, shall be solely responsible
              for the investigation, defense, settlement and discharge of any
              claim that the Featherr App or your use of it infringes any third
              party intellectual property right.
            </Text>
            <Text style={styles.tcP}>
              The use of this app is subject to the following terms of use
            </Text>
          </ScrollView>

          <TouchableOpacity
            onPress={() => {
              setAppLaunched(() => {
                navigation.navigate('AuthNavigator')
              })
            }}
            style={styles.button}>
            <Text style={styles.buttonLabel}>Accept</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    )
  }
}

const {width, height} = Dimensions.get('window')

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  // content: {
  //   flex: 1,
  //   marginHorizontal: 12.5,
  //   marginVertical: 25,
  //
  // },
  content: {
    flex: 1,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 22,
    alignSelf: 'center',
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
  },
  tcL: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
    height: height * 0.7,
  },

  button: {
    backgroundColor: '#136AC7',
    borderRadius: 5,
    padding: 10,
  },

  buttonDisabled: {
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10,
  },

  buttonLabel: {
    fontSize: 14,
    color: '#FFF',
    alignSelf: 'center',
  },
}

export default TermsAndConditions
