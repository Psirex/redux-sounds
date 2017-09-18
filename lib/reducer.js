'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionCreators = undefined;

var _reduxActions = require('redux-actions');

var _howler = require('howler');

var sounds = {};

// ---
// Constants
// ---
var PLAY = 'redux-sound/PLAY';
var STOP = 'redux-sound/STOP';
var MUTE = 'redux-sound/MUTE';

// ---
// Actions
// ---
var ActionCreators = exports.ActionCreators = {
  play: (0, _reduxActions.createAction)(PLAY, function () {
    return null;
  }, function (name) {
    return { sound: name };
  }),
  stop: (0, _reduxActions.createAction)(STOP, function () {
    return function (name) {
      return { sound: name };
    };
  }),
  mute: (0, _reduxActions.createAction)(MUTE)
};

var initialState = {
  isMuted: false,
  soundsByName: {}
};

var reducer = (0, _reduxActions.handleActions)({}, initialState);

exports.default = reducer;