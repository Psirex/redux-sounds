import { Howl, Howler } from 'howler'

export const soundNotFoundMessage = soundName => `
The sound '${soundName}' was requested, but redux-sounds doesn't have anything registered under that name.
See https://github.com/joshwcomeau/redux-sounds#unregistered-sound
`

export const spriteNotFoundMessage = (soundName, spriteName, validSprites) => `
The sound '${soundName}' was found, but it does not have a sprite specified for '${spriteName}'.
It only has access to the following sprites: ${validSprites}.
See https://github.com/joshwcomeau/redux-sounds#invalid-sprite
`

export default {

  initialize (soundsData) {
    let soundOptions
    const soundNames = Object.getOwnPropertyNames(soundsData)
    this.sounds = soundNames.reduce((memo, name) => {
      soundOptions = soundsData[name]
      // Allow strings instead of objects, for when all that is needed is a URL
      if (typeof soundOptions === 'string') {
        soundOptions = { src: [soundOptions] }
      }
      return { ...memo, [name]: new Howl(soundOptions) }
    }, {})

    return this.sounds
  },

  validateSound (soundName, spriteName) {
    const sound = this.sounds[soundName]
    if (typeof sound === 'undefined') {
      console.warn(soundNotFoundMessage(soundName))
      return false
    } else if (spriteName && typeof sound._sprite[spriteName] === 'undefined') {
      const validSprites = Object.keys(sound._sprite).join(', ')
      console.warn(spriteNotFoundMessage(sound, spriteName, validSprites))
      return false
    }
    return true
  },

  play (soundName, spriteName) {
    const sound = this.sounds[soundName]
    if (this.validateSound(soundName, spriteName)) {
      sound.play(spriteName)
    }
  },

  stop (soundName, spriteName) {
    const sound = this.sounds[soundName]
    if (this.validateSound(soundName, spriteName)) {
      sound.stop(spriteName)
    }
  },

  muteSound (soundName, spriteName, value) {
    const sound = this.sounds[soundName]
    if (this.validateSound(soundName, spriteName)) {
      sound.mute(value, spriteName)
    }
  },

  muteAll (value) {
    Howler.mute(value)
  }
}
