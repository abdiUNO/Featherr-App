import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { GiftedChat } from 'react-native-gifted-chat' // for the chat UI

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  pushMessage: ['room_id', 'message']
})

export const ChatTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  threads: {},
  error: null
})

/* ------------- Selectors ------------- */

export const ChatSelectors = {
  getData: state => state.data,
  getMessages: (state, room_id) => {
    const thread = state.chat.threads[room_id]
    if (thread) {
      const allIds = Immutable.asMutable(thread.messages.allIds)
      return allIds.reverse().map(id => {
        return thread.messages.byId[id]
      })
    } else {
      return []
    }
  }
}

/* ------------- Reducers ------------- */

function insertItem(array, action) {
  let newArray = array.slice()
  newArray.splice(action.index, 0, action.item)
  return newArray
}

// successful api lookup
export const addMessage = (state, action) => {

  const { room_id, message } = action
  const thread = state.threads[room_id]
    ? state.threads[room_id]
    : {
        messages: {
          byId: {},
          allIds: []
        }
      }



  const index = thread.messages.allIds.indexOf(message._id)

  return state.merge({
    fetching: false,
    error: null,
    threads: {
      ...state.threads,
      [room_id]: {
        messages: {
          byId: { ...thread.messages.byId, [message._id]: { ...message } },
          allIds:
            index === -1
              ? thread.messages.allIds.concat(message._id)
              : [...thread.messages.allIds]
        }
      }
    }
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PUSH_MESSAGE]: addMessage
})
