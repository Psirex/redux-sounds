const howlerIntegration = require('./howler_integration');
import reducer, { ActionCreators, Actions } from './reducer'

function soundsMiddleware(soundsData) {
  return store => next => action => {
    if (action.meta) {
      const [ soundName, spriteName ] = action.meta.sound.split('.');
      switch (action.type) {
        case Actions.PLAY: howlerIntegration.play(soundName, spriteName)
          break
        case Actions.STOP: howlerIntegration.stop(soundName, spriteName)
          break
      }
    } else {
      switch(action.type) {
        case Actions.INITIALIZE: howlerIntegration.initialize(action.payload)
          break
        case Actions.MUTE: howlerIntegration.mute(action.payload)
          break
      }
    }
    return next(action);
  };
}

module.exports = {soundsMiddleware, reducer, ActionCreators};
