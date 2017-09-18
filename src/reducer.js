import { handleActions, createAction } from 'redux-actions'
import { Howl, Howler } from 'howler'
import { keys, fromPairs, cloneDeep, merge} from 'lodash'
let sounds = {}

// ---
// Constants
// ---
const INITIALIZE = 'redux-sound/INITIALIZE'
const PLAY = 'redux-sound/PLAY'
const STOP = 'redux-sound/STOP'
const MUTE = 'redux-sound/MUTE'

export const Actions = {
  INITIALIZE,
  PLAY,
  STOP,
  MUTE
}

// ---
// Actions
// ---
export const ActionCreators = {
  init: createAction(INITIALIZE, soundsData => soundsData, soundsData => ({sound: ''})),
  play: createAction(PLAY, (name) => name, name => ({ sound: name }) ),
  stop: createAction(STOP, name => name, name => ({ sound: name })),
  mute: createAction(MUTE)
}

const initialState = {
  isMuted: false,
  soundsByName: {}
}

const reducer = handleActions(
  {
    [INITIALIZE]: (state, action) => {
      const sounds = keys(action.payload).map(name => [ name, { isMuted: false, isPlaying: false } ])
      return {...state, soundsByName: fromPairs(sounds)}
    },
    [PLAY]: (state, action) => {
      const stateCopy = cloneDeep(state)
      stateCopy.soundsByName[action.payload].isPlaying = true
      return stateCopy
    },
    [MUTE]: (state, action) => {
      return {...state, isMuted: action.payload}
    }
  },
  initialState
)

export default reducer