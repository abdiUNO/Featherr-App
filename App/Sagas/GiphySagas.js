/* ***********************************************************
 * A short word on how to use this automagically generated file.
 * We're often asked in the ignite gitter channel how to connect
 * to a to a third party api, so we thought we'd demonstrate - but
 * you should know you can use sagas for other flow control too.
 *
 * Other points:
 *  - You'll need to add this saga to sagas/index.js
 *  - This template uses the api declared in sagas/index.js, so
 *    you'll need to define a constant in that file.
 *************************************************************/

import { call, put } from 'redux-saga/effects'
import GiphyActions from '../Redux/GiphyRedux'
// import { GiphySelectors } from '../Redux/GiphyRedux'

export function* getTrendingGifs(api, action) {
  const response = yield call(api.getTrendingGifs)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(GiphyActions.giphySuccess(response.data.data))
  } else {
    yield put(GiphyActions.giphyFailure(response))
  }
}
