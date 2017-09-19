import { handleActions, createAction } from 'redux-actions'
import { keys, fromPairs, cloneDeep } from 'lodash'

import { soundNotFoundMessage } from './howler_integration'

// ---
// Constants
// ---
const INITIALIZE = 'redux-sounds/INITIALIZE'
const PLAY = 'redux-sounds/PLAY'
const STOP = 'redux-sounds/STOP'
const MUTE = 'redux-sounds/MUTE'
const MUTE_ALL = 'redux-sounds/MUTE_ALL'

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
  init: createAction(INITIALIZE, soundsData => soundsData, soundsData => ({ reduxSound: { action: 'init', soundsData } })),
  play: createAction(PLAY, (name) => name, name => ({ reduxSound: { action: 'play', sound: name } })),
  stop: createAction(STOP, name => name, name => ({ reduxSound: { action: 'stop', sound: name } })),
  mute: createAction(MUTE,
    (name, value) => ({ name, value }),
    (name, value) => ({ reduxSound: { action: 'mute', sound: name, value } })
  ),
  muteAll: createAction(MUTE_ALL, value => value, value => ({ reduxSound: { action: 'muteAll', value } }))
}

const initialState = {
  isMuted: false,
  soundsByName: {}
}

const validateSound = (state, soundName) => {
  if (!state.soundsByName[soundName]) {
    console.warn(soundNotFoundMessage(soundName))
    return false
  }
  return true
}

const reducer = handleActions(
  {
    [INITIALIZE]: (state, action) => {
      const sounds = keys(action.payload).map(name => [ name, { isMuted: false, isPlaying: false } ])
      return {...state, soundsByName: fromPairs(sounds)}
    },
    [PLAY]: (state, action) => {
      if (!validateSound(state, action.payload)) return state
      const stateCopy = cloneDeep(state)
      stateCopy.soundsByName[action.payload].isPlaying = true
      return stateCopy
    },
    [STOP]: (state, action) => {
      if (!validateSound(state, action.payload)) return state
      const stateCopy = cloneDeep(state)
      stateCopy.soundsByName[action.payload].isPlaying = false
      return stateCopy
    },
    [MUTE_ALL]: (state, action) => {
      return {...state, isMuted: action.payload}
    },
    [MUTE]: (state, action) => {
      if (!validateSound(state, action.payload.name)) return state
      const stateCopy = cloneDeep(state)
      stateCopy.soundsByName[action.payload.name].isMuted = action.payload.value
      return stateCopy
    }
  },
  initialState
)

export default reducer
