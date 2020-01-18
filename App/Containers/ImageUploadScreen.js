import React, {Component} from 'react'
import {
  ScrollView,
  KeyboardAvoidingView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
} from 'react-native'
import {Button, Icon} from 'react-native-elements'

import ImageResizer from 'react-native-image-resizer'
import ImagePicker from 'react-native-image-picker'
import Spinner from 'react-native-loading-spinner-overlay'

import {connect} from 'react-redux'
import AuthActions from '../Redux/AuthRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ImageUploadScreenStyle'

class ImageUploadScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      uploadingImage: false,
      pickingImage: false,
    }

    this.selectImage = this.selectImage.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
  }

  selectImage() {
    const {params} = this.props.navigation.state

    var options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }

    if (Platform.OS === 'ios')
      this.setState({pickingImage: true, uploadingImage: true})

    ImagePicker.showImagePicker(options, response => {
      this.setState({pickingImage: false})
      if (response.didCancel) {
        this.setState({uploadingImage: false})
      } else {
        if (Platform.OS === 'android')
          this.setState({pickingImage: false, uploadingImage: true})

        ImageResizer.createResizedImage(response.uri, 500, 500, 'JPEG', 80)
          .then(this.uploadImage)
          .catch(error => {})
      }
    })
  }

  uploadImage(response) {
    const data = new FormData()

    data.append('image', {
      uri: response.uri,
      name: response.name,
      type: 'image/jpeg',
    })

    this.setState({uploadingImage: false})

    this.props.uploadImage(data)
  }

  render() {
    const uploadingImage = this.state.uploadingImage
    const pickingImage = this.state.pickingImage

    return (
      <View style={styles.container}>
        <Spinner
          visible={this.props.loading || uploadingImage}
          textContent={pickingImage ? 'Select Image...' : 'Uploading Image...'}
          textStyle={{
            color: '#FFF',
          }}
        />
        <View styles={styles.body}>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                alignSelf: 'center',
                marginTop: 50,
              }}>
              {"You're almost done"}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                alignSelf: 'center',
              }}>
              {'Take a minute to upload a profile photo'}
            </Text>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 50,
            }}>
            <Image
              style={{width: 250, height: 250}}
              source={require('../Images/wizard.png')}
            />
          </View>
        </View>
        <Button
          title="Upload Image"
          style={{marginTop: 25}}
          backgroundColor="#f39c12"
          textStyle={{fontWeight: 'bold', color: 'white'}}
          onPress={this.selectImage}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.fetching,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    uploadImage: formData => dispatch(AuthActions.uploadRequest(formData)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageUploadScreen)
