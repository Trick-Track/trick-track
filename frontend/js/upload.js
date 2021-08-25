import {addNewLane, resetProject} from './project.js';

const inputAdd = document.getElementById('#sample');

const FILE_TYPES = ['mp3', 'wav'];


const uploadFile = (evt, cb) => {

  const sound = evt.files[0];
  console.log(sound);
  const fileName = sound.url;
  console.log(fileName);

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', cb);
    reader.readAsArrayBuffer(sound);
  }
};
 
const uploadSound = (sound) => {
  uploadFile(inputAdd, () => {
    addNewLane(currentProject, sound);
  });
};

const addInputAddHandler = () => {
  console.log(inputAdd);
  inputAdd.addEventListener('change', uploadSound(inputAdd.files));
};

export {addInputAddHandler};