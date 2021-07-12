import {sendProject} from './server.js';

const projectNameInput = document.querySelector('#project-name');
const saveButton = document.querySelector('.save-button');

const onProjectNameInputChange = () => {
    const projectName = (projectNameInput.value);
    return projectName
}

const addProjectNameInputHandler = () => {
    projectNameInput.addEventListener('change', onProjectNameInputChange);
}

// const setProjectName = () => {
//     return projectNameInput.value;
// }

const createProject = (newLanes, bpm) => {
    let name = projectNameInput.value
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

export {createProject, addProjectNameInputHandler, addSaveButtonHandler} 