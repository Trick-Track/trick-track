import {sendProject} from './server.js';
import {resetLanes} from './cell.js';


const projectNameInput = document.querySelector('#project-name');
const saveButton = document.querySelector('.save-button');

const onProjectNameInputChange = () => {
  const projectName = projectNameInput.value;
  return projectName
}

const addProjectNameInputHandler = () => {
  projectNameInput.addEventListener('change', onProjectNameInputChange);
};

const getProjectName = () => {
  let projectName = projectNameInput.value;
  return projectName;
}

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

const addCreateProjectButtonHandler = (lanes, cb) => {
    const createProjectButton = document.querySelector('.app__projects-link')
    createProjectButton.addEventListener('click', () => {
        const project = new Project
        project.initialDefaultProject(lanes)
        console.log(project)
        cb()
    })
}



export class Project {

        constructor (bpm, lanes, projectName) {
          this.projectName = projectName;
          this.bpm = bpm;
          this.lanes = lanes;
        }

        initialDefaultProject (defaultBPM, lanes) {
          this.projectName = "";
          this.bpm = defaultBPM;
          this.lanes = lanes;


        }
      
}

export {createProject, addProjectNameInputHandler, addSaveButtonHandler, addCreateProjectButtonHandler, getProjectName} 