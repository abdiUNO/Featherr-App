import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
import GroupCard from '../Components/GroupCard'
import CliquesAction from '../Redux/CliquesRedux'
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from 'rn-placeholder'
import PlaceholderCard from '../Components/PlaceholderCard'
import Spinner from 'react-native-loading-spinner-overlay'

// Styles
import styles from './Styles/CliquesScreenStyle'
import AuthActions from '../Redux/AuthRedux'

var gradients = [
  ['#36D1DC', '#5B86E5'],
  ['#007adf', '#00ecbc'],
  ['#4481eb', '#04befe'],
  ['#4facfe', '#00f2fe'],
  ['#16d9e3', '#30c7ec'],
  ['#b721ff', '#21d4fd'],
  ['#209cff', '#68e0cf'],
  ['#0acffe', '#495aff']
]
class CliquesScreen extends Component {
  joinGroup = () => {
    const { joinClique } = this.props
    joinClique()
  }

  componentDidMount() {
    this.props.navigation.setParams({
      joinGroup: this.joinGroup
    })
    const { getCliques } = this.props
    getCliques()
  }

  renderPlaceHolder() {
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

  render() {
    const { fetching, groups } = this.props
    return (
      <ScrollView style={styles.container}>
        <Spinner
          visible={this.props.fetchingKey === 'JOIN_CLIQUE_REQUEST'}
          textContent={'Joining clique...'}
          textStyle={{
            color: '#FFF'
          }}
        />
        <KeyboardAvoidingView behavior="position">
          {fetching ? (
            this.renderPlaceHolder()
          ) : (
            <View>
              {groups.map(group => (
                <GroupCard
                  key={group.id}
                  colors={
                    gradients[Math.floor(Math.random() * gradients.length)]
                  }
                  item={group}
                  onPress={() => {
                    this.props.navigation.navigate('Chat', { chatId: group.id })
                  }}
                />
              ))}
            </View>
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.cliques.fetching,
    fetchingKey: state.cliques.fetchingKey,
    groups: state.cliques.groups
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCliques: () => dispatch(CliquesAction.cliquesRequest()),
    joinClique: () => dispatch(CliquesAction.joinCliqueRequest())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CliquesScreen)
