import React, {Component, useMemo} from 'react'
import {
  ScrollView,
  KeyboardAvoidingView,
  View,
  InteractionManager,
} from 'react-native'
import {connect} from 'react-redux'
import axios from 'axios' // for making requests to the server
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder'
import Spinner from 'react-native-loading-spinner-overlay'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import GroupCard from '../Components/GroupCard'
import CliquesAction from '../Redux/CliquesRedux'
import PlaceholderCard from '../Components/PlaceholderCard'

import Fire from '../Services/Fire'
import AsyncStorage from '@react-native-community/async-storage'
import {log} from '../Services/utils'
// Styles
import styles from './Styles/CliquesScreenStyle'
import {throttle} from 'lodash'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

const gradients = [
  ['#36D1DC', '#5B86E5'],
  ['#007adf', '#00ecbc'],
  ['#4481eb', '#04befe'],
  ['#4facfe', '#00f2fe'],
  ['#16d9e3', '#30c7ec'],
  ['#b721ff', '#21d4fd'],
  ['#209cff', '#68e0cf'],
  ['#0acffe', '#495aff'],
]

const CHAT_SERVER = 'http://localhost:5000'

class CliquesScreen extends Component {
  constructor(props) {
    super(props)
    this._isMounted = true

    this.state = {
      messages: {},
      isModalVisible: false,
      colors: {},
    }
  }

  static renderPlaceHolder() {
    return (
      <View>
        <PlaceholderCard>
          <Placeholder
            Left={props => (
              <PlaceholderMedia isRound={true} style={props.style} />
            )}
            Animation={Fade}>
            <PlaceholderLine width={80} />
            <PlaceholderLine />
            <PlaceholderLine width={30} />
          </Placeholder>
        </PlaceholderCard>
        <PlaceholderCard>
          <Placeholder
            Left={props => (
              <PlaceholderMedia isRound={true} style={props.style} />
            )}
            Animation={Fade}>
            <PlaceholderLine width={80} />
            <PlaceholderLine />
            <PlaceholderLine width={30} />
          </Placeholder>
        </PlaceholderCard>
      </View>
    )
  }

  static renderSinglePlaceHolder = () => (
    <View>
      <PlaceholderCard>
        <Placeholder
          Left={props => (
            <PlaceholderMedia isRound={true} style={props.style} />
          )}
          Animation={Fade}>
          <PlaceholderLine width={80} />
          <PlaceholderLine />
          <PlaceholderLine width={30} />
        </Placeholder>
      </PlaceholderCard>
    </View>
  )

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.getLastMessages()

      this.props.getCliques()
      this.props.navigation.setParams({
        joinGroup: this.joinGroup,
      })
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  getLastMessages() {
    const {groups} = this.props

    groups.map(group => {
      this.listenForMessages(group.id)
    })
  }

  addMessage = message => {
    if (this._isMounted && message) {
      const {messages} = this.state
      messages[message.chatId] = message
      this.setState({messages})
    }
  }

  listenForMessages = chatId => {
    Fire.shared.getLastMsg(chatId, this.addMessage)
  }

  joinGroup = () => {
    if (this.props.groups.length <= 4) {
      const {joinClique} = this.props
      joinClique()
    }
  }

  enterChat = room =>
    this.props.navigation.navigate('Chat', {
      userId: this.props.user.id,
      chatId: room.id,
      group: room,
      addLastMsg: this.addMessage,
    })

  renderCliques = groups => {
    return (
      <View>
        {groups.map(group => (
          <GroupCard
            key={group.id}
            colors={group.colors}
            item={group}
            recentMsg={this.state.messages[group.id]}
            time={
              this.state.messages[group.id]
                ? timeAgo.format(
                    new Date(this.state.messages[group.id].timestamp),
                    'time',
                  )
                : ''
            }
            onPress={this.enterChat}
          />
        ))}
      </View>
    )
  }

  render() {
    const {fetching, groups} = this.props

    return (
      <ScrollView style={styles.container}>
        <Spinner
          visible={this.props.fetchingKey === 'JOIN_CLIQUE_REQUEST'}
          textContent={'Joining clique...'}
          textStyle={{
            color: '#FFF',
          }}
        />
        {fetching || !groups
          ? CliquesScreen.renderPlaceHolder()
          : this.renderCliques(groups)}
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    fetching: state.cliques.fetching,
    fetchingKey: state.cliques.fetchingKey,
    groups: state.cliques.groups,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCliques: () => dispatch(CliquesAction.cliquesRequest()),
    joinClique: () => dispatch(CliquesAction.joinCliqueRequest()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CliquesScreen)
