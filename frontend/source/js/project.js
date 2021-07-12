import {sendProject} from './server.js';

const saveButton = document.querySelector('.save-button');

const createProject = (newLanes, bpm) => {
    const project = {bpm: bpm, lanes: newLanes, name: name}
    return project;
}

const addSaveButtonHandler = (project, onSuccess) => {
    saveButton.addEventListener('click', () => {
        sendProject(JSON.stringify(project), onSuccess);
        console.log(JSON.stringify(project))
    });
  }


// export default class Project {

//         constructor (bpm, lanes) {
//           this.name = name;
//           this.bpm = bpm;
//           this.lanes = lanes;
//         }
      
// }

export {createProject, addSaveButtonHandler} 