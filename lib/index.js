'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var howlerIntegration = require('./howler_integration');


function soundsMiddleware(soundsData) {
  if ((typeof soundsData === 'undefined' ? 'undefined' : _typeof(soundsData)) !== 'object') throw {
    name: 'missingSoundData',
    message: '\n        Please provide an object to soundsMiddleware!\n        When initializing, it needs an object holding all desired sound data.\n        See https://github.com/joshwcomeau/redux-sounds/#troubleshooting\n      '
  };

  // Set up our sounds object, and pre-load all audio files.
  // Our sounds object basically just takes the options provided to the
  // middleware, and constructs a new Howl object for each one with them.
  howlerIntegration.initialize(soundsData);

  return function (store) {
    return function (next) {
      return function (action) {
        // Ignore actions that haven't specified a sound.
        if (!action.meta || !action.meta.sound) {
          return next(action);
        }

        var _action$meta$sound$sp = action.meta.sound.split('.'),
            _action$meta$sound$sp2 = _slicedToArray(_action$meta$sound$sp, 2),
            soundName = _action$meta$sound$sp2[0],
            spriteName = _action$meta$sound$sp2[1];

        howlerIntegration.play(soundName, spriteName);

        return next(action);
      };
    };
  };
}

module.exports = { soundsMiddleware: soundsMiddleware, reducer: _reducer2.default, ActionCreators: _reducer.ActionCreators };