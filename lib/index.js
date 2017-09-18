'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var howlerIntegration = require('./howler_integration');


function soundsMiddleware(soundsData) {
  return function (store) {
    return function (next) {
      return function (action) {
        if (action.meta) {
          var _action$meta$sound$sp = action.meta.sound.split('.'),
              _action$meta$sound$sp2 = _slicedToArray(_action$meta$sound$sp, 2),
              soundName = _action$meta$sound$sp2[0],
              spriteName = _action$meta$sound$sp2[1];

          switch (action.type) {
            case _reducer.Actions.PLAY:
              howlerIntegration.play(soundName, spriteName);
              break;
            case _reducer.Actions.STOP:
              howlerIntegration.stop(soundName, spriteName);
              break;
          }
        } else {
          switch (action.type) {
            case _reducer.Actions.INITIALIZE:
              howlerIntegration.initialize(action.payload);
              break;
            case _reducer.Actions.MUTE:
              howlerIntegration.mute(action.payload);
              break;
          }
        }
        return next(action);
      };
    };
  };
}

module.exports = { soundsMiddleware: soundsMiddleware, reducer: _reducer2.default, ActionCreators: _reducer.ActionCreators };