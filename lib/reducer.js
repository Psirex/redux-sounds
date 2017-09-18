'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionCreators = exports.Actions = undefined;

var _handleActions;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxActions = require('redux-actions');

var _howler = require('howler');

var _lodash = require('lodash');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var sounds = {};

// ---
// Constants
// ---
var INITIALIZE = 'redux-sound/INITIALIZE';
var PLAY = 'redux-sound/PLAY';
var STOP = 'redux-sound/STOP';
var MUTE = 'redux-sound/MUTE';

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
    return { sound: name };
  }),
  stop: (0, _reduxActions.createAction)(STOP, function (name) {
    return name;
  }, function (name) {
    return { sound: name };
  }),
  mute: (0, _reduxActions.createAction)(MUTE)
};

var initialState = {
  isMuted: false,
  soundsByName: {}
};

var reducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, INITIALIZE, function (state, action) {
  var sounds = (0, _lodash.keys)(action.payload).map(function (name) {
    return [name, { isMuted: false, isPlaying: false }];
  });
  return _extends({}, state, { soundsByName: (0, _lodash.fromPairs)(sounds) });
}), _defineProperty(_handleActions, PLAY, function (state, action) {
  var stateCopy = (0, _lodash.cloneDeep)(state);
  stateCopy.soundsByName[action.payload].isPlaying = true;
  return stateCopy;
}), _defineProperty(_handleActions, MUTE, function (state, action) {
  return _extends({}, state, { isMuted: action.payload });
}), _handleActions), initialState);

exports.default = reducer;