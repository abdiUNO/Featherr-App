import React, {Component} from 'react'
// import PropTypes from 'prop-types';
import {View, Text} from 'react-native'
import styles from './Styles/GiphyModalStyle'
import {Button, Icon, SearchBar} from 'react-native-elements'
import Modal from 'react-native-modal'
import GiphyActions from '../Redux/GiphyRedux'
import {connect} from 'react-redux'
import GifScroller from './GifScroller'

class GiphyModal extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  renderModalContent = () => (
    <View style={styles.content}>
      <View
        style={{
          paddingTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            paddingHorizontal: 25,
            paddingVertical: 2.5,
            backgroundColor: '#8B8782',
            borderRadius: 5,
          }}
        />
      </View>
      <GifScroller
        style={{marginVertical: 5}}
        inputText={this.props.query}
        handleGifSelect={this.props.onGifSelect}
        apiKey="8nu1Has8WYrd5Aqt9j4Ah1LKUjL2pe42"
      />
      <SearchBar
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={this.props.onChange}
        value={this.props.query}
        inputContainerStyle={{
          backgroundColor: '#FFF',
        }}
        inputStyle={{
          color: '#000',
        }}
        containerStyle={{
          borderTopColor: '#000',
          borderBottomColor: '#000',
          backgroundColor: '#000',
        }}
        onClear={this.props.onClear}
        placeholder="Type Here..."
      />
    </View>
  )

  componentDidMount(): void {
    this.props.getTrendingGifs()
  }

  render() {
    return (
      <Modal
        propagateSwipe={true}
        isVisible={this.props.isModalVisible}
        onBackdropPress={this.props.toggleModal}
        onSwipeComplete={this.props.toggleModal}
        swipeDirection={['down']}
        hasBackdrop={true}
        style={styles.container}>
        {this.renderModalContent()}
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    gifs: state.giphy.gifs,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTrendingGifs: () => dispatch(GiphyActions.giphyRequest()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GiphyModal)
