'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Howl = require('howler').Howl;

module.exports = {
  initialize: function initialize(soundsData) {
    var soundOptions = void 0;

    var soundNames = Object.getOwnPropertyNames(soundsData);

    this.sounds = soundNames.reduce(function (memo, name) {
      soundOptions = soundsData[name];

      // Allow strings instead of objects, for when all that is needed is a URL
      if (typeof soundOptions === 'string') {
        soundOptions = { urls: [soundOptions] };
      }

      return _extends({}, memo, _defineProperty({}, name, new Howl(soundOptions)));
    }, {});

    return this.sounds;
  },
  play: function play(soundName, spriteName) {
    var sound = this.sounds[soundName];

    if (typeof sound === 'undefined') {
      return console.warn('\n        The sound \'' + soundName + '\' was requested, but redux-sounds doesn\'t have anything registered under that name.\n        See https://github.com/joshwcomeau/redux-sounds#unregistered-sound\n      ');
    } else if (spriteName && typeof sound._sprite[spriteName] === 'undefined') {
      var validSprites = Object.keys(sound._sprite).join(', ');

      return console.warn('\n        The sound \'' + soundName + '\' was found, but it does not have a sprite specified for \'' + spriteName + '\'.\n        It only has access to the following sprites: ' + validSprites + '.\n        See https://github.com/joshwcomeau/redux-sounds#invalid-sprite\n      ');
    }

    sound.play(spriteName);
  },
  mute: function mute(soundName, spriteName) {
    Howl.mute(true);
  }
};