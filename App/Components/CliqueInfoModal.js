import React, { Component } from 'react'
import Modal from 'react-native-modal'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import { SearchBar, Icon, Header, Divider, Button } from 'react-native-elements'
import styles from './Styles/CliqueInfoModalStyle'

export default class CliqueInfoModal extends Component {
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

  render() {
    return (
      <Modal
        isVisible={this.props.isModalVisible}
        style={{ margin: 0, padding: 0 }}
        onBackdropPress={this.props.toggleModal}>
        <Header
          containerStyle={{ borderBottomColor: '#fff' }}
          backgroundColor="#fff"
          centerComponent={{
            text: 'Chat Info',
            style: { color: '#05BEAE', fontSize: 20 }
          }}
          rightComponent={{
            icon: 'close',
            color: '#05BEAE',
            size: 26,
            onPress: this.props.toggleModal
          }}
        />
      </Modal>
    )
  }
}
