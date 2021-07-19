import {sendProject} from './server.js';
import {isEscEvent, isMouseLeftEvent} from './util.js';

const projectNameInput = document.querySelector('#project-name');
const saveButton = document.querySelector('.save-button');
const openModalButton = document.querySelector('.app__projects-link');
const modalNewProject = document.querySelector('.modal-new-project');
const createNewProjectButton = document.querySelector('.save__button--nosave');
const closeModalButton = document.querySelector('.save__button--save')


const onProjectNameInputChange = () => {
  const projectName = projectNameInput.value;
  return projectName
}

const addProjectNameInputHandler = () => {
  projectNameInput.addEventListener('change', onProjectNameInputChange);
};

const getProjectName = () => {
  console.log(projectNameInput.value)
  let projectName = projectNameInput.value;
  return projectName;
}

// const setFocusOnProjectNameInput = () => {
//   projectNameInput.focus();
// }

// const createProject = (newLanes, bpm) => {
//   const project = {bpm: bpm, lanes: newLanes, name: name}
//   return project;
// }



const addSaveButtonHandler = (project, onSuccess) => {
  saveButton.addEventListener('click', () => {
    sendProject(JSON.stringify(project), onSuccess);
    console.log(JSON.stringify(project))
  });
}



const closeModalNewProject = () => {
  modalNewProject.classList.remove('modal__show')
  closeModalButton.removeEventListener('click', closeModalNewProject);
  createNewProjectButton.removeEventListener('click', onCreateNewProjectButtonClick);
  document.removeEventListener('keydown', onDocumentEscapePressed);
};


const onDocumentEscapePressed = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModalNewProject();
  }
};

const onCreateNewProjectButtonClick = (project, lanes) => {
  //closeModalNewProject();
  createDefaultProject(project, lanes);
}

const addOpenModalButtonHandler = (project, lanes) => {
  openModalButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    modalNewProject.classList.add('modal__show');
    closeModalButton.addEventListener('click', closeModalNewProject);
    createNewProjectButton.addEventListener('click', onCreateNewProjectButtonClick(project, lanes))
    document.addEventListener('keydown', onDocumentEscapePressed);
  })
}

const createDefaultProject = (project, lanes) => {
  project = new Project
  project.initialProject(lanes);
  console.log(project)

}


export class Project {

        constructor (bpm, lanes, projectName) {
  
          this.projectName = projectName;
          this.bpm = bpm;
          this.lanes = lanes;
        }
        
        initialProject(lanes) {
          this.projectName = "";
          this.bpm = 120
          this.lanes = lanes;
        }
}

const addProjectsHandlers = () => {
  addProjectNameInputHandler();
  //addOpenModalButtonHandler();

}

export {addSaveButtonHandler, addProjectsHandlers, getProjectName, addOpenModalButtonHandler} 