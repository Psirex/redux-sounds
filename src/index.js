import reducer, { ActionCreators } from './reducer'
import howlerIntegration from './howler_integration'

function soundsMiddleware (soundsData) {
  return store => next => action => {
    if (!action.meta.reduxSound) return next(action)
    const { reduxSound } = action.meta
    const [ soundName, spriteName ] = (reduxSound.sound || '').split('.')
    switch (reduxSound.action) {
      case 'play': howlerIntegration.play(soundName, spriteName)
        break
      case 'stop': howlerIntegration.stop(soundName, spriteName)
        break
      case 'mute': howlerIntegration.mute(soundName, spriteName, reduxSound.value)
        break
      case 'muteAll': howlerIntegration.muteAll(reduxSound.value)
        break
      default:
        console.warn(`The action ${reduxSound.action} desn't exist in the library`)
    }
    return next(action)
  }
}

module.exports = {soundsMiddleware, reducer, ActionCreators}
