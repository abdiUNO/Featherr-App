import React, {Component} from 'react'
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native'
import {connect} from 'react-redux'
import {Button, ListItem} from 'react-native-elements'
import UserCard from '../Components/UserCard'
import Spinner from 'react-native-loading-spinner-overlay'

import CliquesAction from '../Redux/CliquesRedux'

import styles from './Styles/CliqueInfoScreenStyle'

class CliqueInfoScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Group Info',
    }
  }

  onLeaveClique = () => {
    const {params} = this.props.navigation.state

    this.props.leaveClique(params.group.id)
  }

  render() {
    const {params} = this.props.navigation.state

    return (
      <ScrollView style={styles.container}>
        <Spinner
          visible={this.props.fetching}
          textContent={'Leaving Clique...'}
          textStyle={{
            color: '#FFF',
          }}
        />
        <KeyboardAvoidingView behavior="position">
          <Text style={styles.usersHeader}>People in this group chat</Text>
          <View>
            {params.group.members.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </View>
          <Button
            title="Leave Clique"
            activeOpacity={1}
            underlayColor="transparent"
            style={{marginTop: 25}}
            backgroundColor="#e74c3c"
            textStyle={{fontWeight: 'bold', color: 'white'}}
            onPress={this.onLeaveClique}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.cliques.fetching,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    leaveClique: groupId => dispatch(CliquesAction.leaveCliqueRequest(groupId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CliqueInfoScreen)
