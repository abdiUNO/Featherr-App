import React, {Component} from 'react'
import {
  View,
  TouchableOpacity,
  FlatList,
  Image as ReactImage,
} from 'react-native'
import qs from 'qs'
import {createImageProgress} from 'react-native-image-progress'

const Image = createImageProgress(ReactImage)

const giphyKey = '&api_key=8nu1Has8WYrd5Aqt9j4Ah1LKUjL2pe42'
const api_key = '8nu1Has8WYrd5Aqt9j4Ah1LKUjL2pe42'
const endPoint = 'https://api.giphy.com/v1/gifs/search?q='

const giphy = require('giphy-api')('8nu1Has8WYrd5Aqt9j4Ah1LKUjL2pe42')

import styles from './Styles/GifScrollerStyle'

export default class GifScroller extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gifs: [],
      trendingGifs: [],
      offset: 0,
      inputText: '',
      viewableItems: {},
    }
  }

  componentDidMount = () => {
    if (this.props.inputText === '') {
      this.fetchAndRenderTrending()
    } else {
      const searchTerm = this.props.inputText
      this.fetchAndRenderGifs('search', {q: searchTerm, limit: 5})
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.inputText === '') {
      if (this.state.trendingGifs.length === 0)
        this.fetchAndRenderTrending('trending')
    } else if (
      this.props.inputText !== prevProps.inputText &&
      this.props.inputText !== ''
    ) {
      this.setState({gifs: [], offset: 0}, () => {
        const searchTerm = this.props.inputText
        this.fetchAndRenderGifs({q: searchTerm, limit: 5})
      })
    }
  }

  handleGifSelect = (index, gif) => {
    this.setState({gifs: [], offset: 0}, () => {
      if (this.props.handleGifSelect) {
        this.props.handleGifSelect(gif.downsized_medium, gif.downsized_still)
      }
    })
  }

  loadMoreImages = number => {
    if (this.state.inputText !== '') {
      this.state.offset += 10
      this.fetchAndRenderGifs('search', {
        q: this.props.inputText,
        offset: this.state.offset,
        limit: 5,
      })
    }
  }

  onViewableItemsChanged = ({viewableItems, changed}) =>
    requestAnimationFrame(() => {
      let _viewableItems = {}
      viewableItems.forEach(({key}) => (_viewableItems[key] = true))
      this.setState({viewableItems: _viewableItems})
    })

  render() {
    let gifs = this.state.gifs

    if (this.props.inputText === '') gifs = this.state.trendingGifs

    const imageList = gifs.map((gif, index) => (
      <TouchableOpacity
        onPress={() => this.handleGifSelect(index, gif)}
        key={index}
        index={index}>
        <Image
          source={{
            uri: this.state.viewableItems[index]
              ? gif.fixed_height
              : gif.fixed_height_still,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
    ))

    return (
      <View style={this.props.style}>
        <FlatList
          onViewableItemsChanged={this.onViewableItemsChanged}
          horizontal={true}
          windowSize={100}
          style={styles.scroll}
          data={imageList}
          renderItem={({item}) => item}
          onEndReached={this.loadMoreImages}
          onEndReachedThreshold={500}
          initialNumToRender={4}
          keyboardShouldPersistTaps={'always'}
          maxToRenderPerBatch={5}
          windowSize={100}
        />
      </View>
    )
  }

  buildUrl = (endpoint, api_key, q, limit, offset) => {
    if (endpoint === 'trending') {
      let endpoint = 'https://api.giphy.com/v1/gifs/trending?api_key='
      const url = `${endpoint}${api_key}`
      this.fetchAndRenderGifs(url)
    } else {
      let endpoint = 'https://api.giphy.com/v1/gifs/search?'
      let query = qs.stringify({q, api_key, limit, offset})
      const url = `${endpoint}${query}`
      this.fetchAndRenderGifs(url)
    }
  }

  fetchAndRenderTrending = async () => {
    try {
      const gifs = await giphy.trending()
      let gifsUrls = gifs.data.map(gif => {
        return {
          fixed_height: gif.images.fixed_height.url,
          fixed_height_still: gif.images.fixed_height_still.url,
          downsized_medium: gif.images.downsized_medium.url,
          downsized_still: gif.images.downsized_still.url,
        }
      })
      this.setState({trendingGifs: gifsUrls})
    } catch (e) {
      console.log(e)
    }
  }

  fetchAndRenderGifs = async search => {
    try {
      const gifs = await giphy.search(search)
      let gifsUrls = gifs.data.map(gif => {
        return {
          fixed_height: gif.images.fixed_height.url,
          fixed_height_still: gif.images.fixed_height_still.url,
          downsized_medium: gif.images.downsized_medium.url,
          downsized_still: gif.images.downsized_still.url,
        }
      })
      let newGifsUrls = this.state.gifs.concat(gifsUrls)
      this.setState({gifs: newGifsUrls})
    } catch (e) {
      console.log(e)
    }
  }
}
GifScroller.defaultProps = {
  inputText: '',
}
