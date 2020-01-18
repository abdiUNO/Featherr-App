import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SampleStyle'

const navigationOptions = {}

class Sample extends Component {
  static navigationOptions = ({ navigation }) => {
    const { routeName } = navigation.state
    const headerTitle = routeName

    return {
      header: (
        <View style={styles.headingContainer}>
          <Text style={styles.headingTitle}>Listen</Text>
          <TouchableOpacity
            style={{ alignSelf: 'center' }}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 5 }}>
            <Text
              style={{ fontWeight: 'bold', marginRight: 12, color: '#FF8900' }}>
              + Join Clique
            </Text>
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: '#fff',
        borderBottomColor: '#fff',
        color: '#FF8900'
      }
    }
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <Text>Sample Container</Text>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sample)
