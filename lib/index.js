'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _howler_integration = require('./howler_integration');

var _howler_integration2 = _interopRequireDefault(_howler_integration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function soundsMiddleware(soundsData) {
  return function (store) {
    return function (next) {
      return function (action) {
        if (!action.meta.reduxSound) return next(action);
        var reduxSound = action.meta.reduxSound;

        var _split = (reduxSound.sound || '').split('.'),
            _split2 = _slicedToArray(_split, 2),
            soundName = _split2[0],
            spriteName = _split2[1];

        switch (reduxSound.action) {
          case 'play':
            _howler_integration2.default.play(soundName, spriteName);
            break;
          case 'stop':
            _howler_integration2.default.stop(soundName, spriteName);
            break;
          case 'mute':
            _howler_integration2.default.mute(soundName, spriteName, reduxSound.value);
            break;
          case 'muteAll':
            _howler_integration2.default.muteAll(reduxSound.value);
            break;
          default:
            console.warn('The action ' + reduxSound.action + ' desn\'t exist in the library');
        }
        return next(action);
      };
    };
  };
}

module.exports = { soundsMiddleware: soundsMiddleware, reducer: _reducer2.default, ActionCreators: _reducer.ActionCreators };