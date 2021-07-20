import {generateMatrixLane} from './matrix.js';

const inputAdd = document.getElementById('.#sample');

const FILE_TYPES = ['mp3', 'wav'];


const uploadFile = (evt, cb) => {

    const sound = evt.files;
    const fileName = sound.url.toLowerCase();
  
    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });
  
    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', cb)
      reader.readAsDataURL(sound);
    }
  };
  
const uploadSound = () => {
  uploadFile(inputAdd, generateMatrixLane)
}

const addInpytAddHandler = (cb) => {
  inputAdd.addEventListener('click', () => {
    uploadSound();
    cb();
  })
};

export {addInpytAddHandler}