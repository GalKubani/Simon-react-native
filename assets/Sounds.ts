import Sound from 'react-native-sound';
Sound.setCategory('Playback');

const green = new Sound(
  'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
  undefined,
  error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    console.log('duration in seconds: ' + green.getDuration());
  },
);
const red = new Sound(
  'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
  undefined,
  error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    console.log('duration in seconds: ' + red.getDuration());
  },
);

const blue = new Sound(
  'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
  undefined,
  error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    console.log('duration in seconds: ' + blue.getDuration());
  },
);

const yellow = new Sound(
  'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3',
  undefined,
  error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    console.log('duration in seconds: ' + yellow.getDuration());
  },
);

const errorSound = new Sound(
  'https://s3.amazonaws.com/adam-recvlohe-sounds/error.wav',
  undefined,
  error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    console.log('duration in seconds: ' + errorSound.getDuration());
  },
);

errorSound.setVolume(1);

const sounds: Record<string, any> = {green, red, blue, yellow, errorSound};
export default sounds;
