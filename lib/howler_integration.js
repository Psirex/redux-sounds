'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spriteNotFoundMessage = exports.soundNotFoundMessage = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _howler = require('howler');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var soundNotFoundMessage = exports.soundNotFoundMessage = function soundNotFoundMessage(soundName) {
  return '\nThe sound \'' + soundName + '\' was requested, but redux-sounds doesn\'t have anything registered under that name.\nSee https://github.com/joshwcomeau/redux-sounds#unregistered-sound\n';
};

var spriteNotFoundMessage = exports.spriteNotFoundMessage = function spriteNotFoundMessage(soundName, spriteName, validSprites) {
  return '\nThe sound \'' + soundName + '\' was found, but it does not have a sprite specified for \'' + spriteName + '\'.\nIt only has access to the following sprites: ' + validSprites + '.\nSee https://github.com/joshwcomeau/redux-sounds#invalid-sprite\n';
};

exports.default = {
  initialize: function initialize(soundsData) {
    var soundOptions = void 0;
    var soundNames = Object.getOwnPropertyNames(soundsData);
    this.sounds = soundNames.reduce(function (memo, name) {
      soundOptions = soundsData[name];
      // Allow strings instead of objects, for when all that is needed is a URL
      if (typeof soundOptions === 'string') {
        soundOptions = { src: [soundOptions] };
      }
      return _extends({}, memo, _defineProperty({}, name, new _howler.Howl(soundOptions)));
    }, {});

    return this.sounds;
  },
  validateSound: function validateSound(soundName, spriteName) {
    var sound = this.sounds[soundName];
    if (typeof sound === 'undefined') {
      console.warn(soundNotFoundMessage(soundName));
      return false;
    } else if (spriteName && typeof sound._sprite[spriteName] === 'undefined') {
      var validSprites = Object.keys(sound._sprite).join(', ');
      console.warn(spriteNotFoundMessage(sound, spriteName, validSprites));
      return false;
    }
    return true;
  },
  play: function play(soundName, spriteName) {
    var sound = this.sounds[soundName];
    if (this.validateSound(soundName, spriteName)) {
      sound.play(spriteName);
    }
  },
  stop: function stop(soundName, spriteName) {
    var sound = this.sounds[soundName];
    if (this.validateSound(soundName, spriteName)) {
      sound.stop(spriteName);
    }
  },
  muteSound: function muteSound(soundName, spriteName, value) {
    var sound = this.sounds[soundName];
    if (this.validateSound(soundName, spriteName)) {
      sound.mute(value, spriteName);
    }
  },
  muteAll: function muteAll(value) {
    _howler.Howler.mute(value);
  }
};