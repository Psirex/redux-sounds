'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionCreators = exports.Actions = undefined;

var _handleActions;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxActions = require('redux-actions');

var _lodash = require('lodash');

var _howler_integration = require('./howler_integration');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ---
// Constants
// ---
var INITIALIZE = 'redux-sounds/INITIALIZE';
var PLAY = 'redux-sounds/PLAY';
var STOP = 'redux-sounds/STOP';
var MUTE = 'redux-sounds/MUTE';
var MUTE_ALL = 'redux-sounds/MUTE_ALL';

var Actions = exports.Actions = {
  INITIALIZE: INITIALIZE,
  PLAY: PLAY,
  STOP: STOP,
  MUTE: MUTE

  // ---
  // Actions
  // ---
};var ActionCreators = exports.ActionCreators = {
  init: (0, _reduxActions.createAction)(INITIALIZE),
  play: (0, _reduxActions.createAction)(PLAY, function (name) {
    return name;
  }, function (name) {
    return { reduxSound: { action: 'play', sound: name } };
  }),
  stop: (0, _reduxActions.createAction)(STOP, function (name) {
    return name;
  }, function (name) {
    return { reduxSound: { action: 'stop', sound: name } };
  }),
  mute: (0, _reduxActions.createAction)(MUTE, function (name, value) {
    return { name: name, value: value };
  }, function (name, value) {
    return { reduxSound: { action: 'mute', sound: name, value: value } };
  }),
  muteAll: (0, _reduxActions.createAction)(MUTE_ALL, function (value) {
    return value;
  }, function (value) {
    return { reduxSound: { action: 'muteAll', value: value } };
  })
};

var initialState = {
  isMuted: false,
  soundsByName: {}
};

var validateSound = function validateSound(state, soundName) {
  if (!state.soundsByName[soundName]) {
    console.warn((0, _howler_integration.soundNotFoundMessage)(soundName));
    return false;
  }
  return true;
};

var reducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, INITIALIZE, function (state, action) {
  var sounds = (0, _lodash.keys)(action.payload).map(function (name) {
    return [name, { isMuted: false, isPlaying: false }];
  });
  return _extends({}, state, { soundsByName: (0, _lodash.fromPairs)(sounds) });
}), _defineProperty(_handleActions, PLAY, function (state, action) {
  if (!validateSound(state, action.payload)) return state;
  var stateCopy = (0, _lodash.cloneDeep)(state);
  stateCopy.soundsByName[action.payload].isPlaying = true;
  return stateCopy;
}), _defineProperty(_handleActions, STOP, function (state, action) {
  if (!validateSound(state, action.payload)) return state;
  var stateCopy = (0, _lodash.cloneDeep)(state);
  stateCopy.soundsByName[action.payload].isPlaying = false;
  return stateCopy;
}), _defineProperty(_handleActions, MUTE_ALL, function (state, action) {
  return _extends({}, state, { isMuted: action.payload });
}), _defineProperty(_handleActions, MUTE, function (state, action) {
  if (!validateSound(state, action.payload.name)) return state;
  var stateCopy = (0, _lodash.cloneDeep)(state);
  stateCopy.soundsByName[action.payload.name].isMuted = action.payload.value;
  return stateCopy;
}), _handleActions), initialState);

exports.default = reducer;