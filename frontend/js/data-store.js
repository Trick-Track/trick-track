let sounds = [];

const setSounds = (newSounds) =>
  sounds = newSounds

const getSounds = () => sounds.slice();


export {setSounds, getSounds}