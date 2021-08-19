import {isEscEvent} from './util.js';
import {sendProject, getProject, updateProject, deleteProject} from './server.js';
import {setBpm} from './bpm.js';
import {setBeats} from './beats.js';
import {createDefaultProject} from './build-project.js';
import {showSuccess} from './messages.js';
import {getSounds} from './data-store.js';
import {removeOldEventListeners, resetProjectRendering, rerenderSavedProjectItem, rerenderDeletedProjectItem} from './renderer.js';


const projectNameInput = document.querySelector('#project-name');
const saveButton = document.querySelector('.save-button');
const updateProjectButton = document.querySelector('.update-button');
const openModalButton = document.querySelector('.app__projects-link');
const modalNewProject = document.querySelector('.modal-new-project');
const createNewProjectButton = document.querySelector('.save__button--nosave');
const closeModalButton = document.querySelector('.save__button--save');
const deleteProjectButton = document.querySelector('.delete-button');
const projectLinks = document.querySelectorAll('.app__project-link');


const setProjectName = () => {
  return projectNameInput.value;
};


const addProjectNameInputHandler = () => {
  projectNameInput.addEventListener('change', setProjectName);
};


const setProjectNamePlaceHolder = (project) => {
  projectNameInput.placeholder = project.name;
};


const setProjectPannerValue = (controls, project) => {
  const {lanes} = project;
  lanes.forEach((lane) => {
    const i = lanes.indexOf(lane, 0);
    let control = controls[i];
    lanes[i].panner = control.value;
  });
};


const setProjectVolumeValue = (controls, project) => {
  const {lanes} = project;
  lanes.forEach((lane) => {
    const i = lanes.indexOf(lane, 0);
    let control = controls[i];
    lanes[i].volume = control.value;
  });
};


const closeModalNewProject = () => {
  modalNewProject.classList.remove('modal__show');
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


const createNewProject = () => {
  window.currentProject = createDefaultProject(window.buffer.urls);
  // window.currentProject = newProject;
  console.log('in create new project', window.currentProject);
  return window.currentProject;
};


const onCreateNewProjectButtonClick = () => {
  closeModalNewProject();
  changeProjectSaveButton();
  resetProject(currentProject, createNewProject);
};


const addOpenModalButtonHandler = (project) => {
  openModalButton.onclick = function(evt) {
    evt.preventDefault();
    modalNewProject.classList.add('modal__show');
    closeModalButton.addEventListener('click', closeModalNewProject);
    createNewProjectButton.addEventListener('click', onCreateNewProjectButtonClick);
    document.addEventListener('keydown', onDocumentEscapePressed(project));
  };
};

const setProjectInputsValues = (project) => {
  project.name = setProjectName();
  project.bpm = setBpm();
};


const addSaveButtonHandler = () => {
  saveButton.addEventListener('click', () => {
    setProjectInputsValues(currentProject);
    sendProject(currentProject, () => {
      showSuccess();
      changeProjectUpdateButton();
    });
  });
};


const addUpdateButtonHandler = () => {
  updateProjectButton.addEventListener('click', () => {
    updateProject(currentProject, () => {
      setProjectInputsValues(currentProject);
      showSuccess();
      rerenderSavedProjectItem(currentProject);
    });
  });
};


const addDeleteButtonHandler = () => {
  deleteProjectButton.addEventListener('click', () => {
    deleteProject(currentProject, () => {
      resetProject(currentProject, createNewProject);
      changeProjectSaveButton();
      rerenderDeletedProjectItem(currentProject);
     
    });
  });
};


const setProjectDisabledSteps = (project, cb) => {
  const {lanes} = project;
  let activeStep = setBeats();
  lanes.forEach((lane) => {
    const {cells} = lane;
    cells.forEach((cell) => {
      const i = cells.indexOf(cell, 0);
      cells[i].disabled = i >= activeStep ? true : false;
      cb();
    });
  });
};


const changeProjectUpdateButton = () => {
  if (updateProjectButton.classList.contains('visually-hidden')) {
    saveButton.classList.add('visually-hidden');
    deleteProjectButton.classList.remove('visually-hidden');
    updateProjectButton.classList.remove('visually-hidden');
  }
};


const changeProjectSaveButton = () => {
  if (saveButton.classList.contains('visually-hidden')) {
    saveButton.classList.remove('visually-hidden');
    deleteProjectButton.classList.add('visually-hidden');
    updateProjectButton.classList.add('visually-hidden');
  }
};


const addProjectLinkHandler = (project) => {
  projectLinks.forEach((projectLink) => {
    projectLink.addEventListener('click', (evt) => {
      evt.preventDefault();
      const pk = evt.target.dataset.pk;
      getProject(pk, changeProjectUpdateButton, project);
    });
  });
}; 


const addProjectsButtonsHandlers = (project) => {
  addSaveButtonHandler();
  addProjectLinkHandler(project);
  console.log(project);
};


const removeProject = (project) => {
  Object.keys(project).forEach(key => {
    if (project.hasOwnProperty(key)) {
      delete project[key];
    }
  });
};


const resetProject = async function(project, cb) {
  removeOldEventListeners(project);
  setTimeout(()=> {
    resetProjectRendering();
    projectNameInput.value = ''; 
    removeProject(project);
    cb();
  }, 0);
};


export {addOpenModalButtonHandler, resetProject, addProjectsButtonsHandlers, setProjectNamePlaceHolder, addDeleteButtonHandler, setProjectDisabledSteps, addUpdateButtonHandler, setProjectPannerValue, setProjectVolumeValue};