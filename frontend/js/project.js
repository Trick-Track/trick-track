
import {isEscEvent} from './util.js';
import {sendProject} from './server.js';

const projectNameInput = document.querySelector('#project-name');
const saveButton = document.querySelector('.save-button');
const openModalButton = document.querySelector('.app__projects-link');
const modalNewProject = document.querySelector('.modal-new-project');
const createNewProjectButton = document.querySelector('.save__button--nosave');
const closeModalButton = document.querySelector('.save__button--save');


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



const addProjectsHandlers = () => {
  addProjectNameInputHandler();
  //addOpenModalButtonHandler();

}


const addSaveButtonHandler = (project, onSuccess) => {
  saveButton.addEventListener('click', () => {
    sendProject(JSON.stringify(project), onSuccess);
    console.log(JSON.stringify(project))
  });
}

export {addProjectsHandlers, getProjectName, addOpenModalButtonHandler, addSaveButtonHandler} 