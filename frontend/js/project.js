import {isEscEvent} from './util.js';
import {sendProject, updateProject, deleteProject, getProjectsList} from './server.js';
import {setBpm} from './bpm.js';
import {setBeats} from './beats.js';
import {createDefaultProject, createLane} from './build-project.js';
import {showSuccess} from './messages.js';
import {ProjectItem} from './project-item.js';
import {removeOldEventListeners, resetProjectRendering, rerenderUpdatedProjectList, renderInitialProject} from './renderer.js';


/* global item: false */


const projectNameInput = document.querySelector('#project-name');
const saveButton = document.querySelector('.save-button');
const updateProjectButton = document.querySelector('.update-button');
const openModalButton = document.querySelector('.app__projects-link');
const modalNewProject = document.querySelector('.modal-new-project');
const createNewProjectButton = document.querySelector('.save__button--nosave');
const closeModalButton = document.querySelector('.save__button--save');
const deleteProjectButton = document.querySelector('.delete-button');


const setProjectName = () => {
  if (projectNameInput.value === '') {
    return 'noName';
  }  
  return projectNameInput.value;
};


const addProjectNameInputHandler = () => {
  projectNameInput.addEventListener('change', setProjectName);
};


const setProjectNamePlaceHolder = (project) => {
  projectNameInput.value = project.name;
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
  return window.currentProject;
};


const onCreateNewProjectButtonClick = () => {
  closeModalNewProject();
  changeProjectSaveButton();
  resetProject(currentProject, createNewProject);
};


const addOpenModalButtonHandler = (project) => {
  if(openModalButton) {
    openModalButton.onclick = function(evt) {
      evt.preventDefault();
      modalNewProject.classList.add('modal__show');
      closeModalButton.addEventListener('click', closeModalNewProject);
      createNewProjectButton.addEventListener('click', onCreateNewProjectButtonClick);
      document.addEventListener('keydown', onDocumentEscapePressed(project));
    };
  }
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
      window.item = new ProjectItem(currentProject);
      item.render();
    });
  });
};


const addUpdateButtonHandler = () => {
  updateProjectButton.addEventListener('click', () => {
    setProjectInputsValues(currentProject);
    updateProject(currentProject, () => {
      showSuccess();
      getProjectsList(rerenderUpdatedProjectList);
    });
  });
};


const addDeleteButtonHandler = () => {
  deleteProjectButton.addEventListener('click', () => {
    deleteProject(currentProject, () => {
      createNewProject();
      changeProjectSaveButton();
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


const addProjectsButtonsHandlers = () => {
  addSaveButtonHandler();
  addUpdateButtonHandler();
  addDeleteButtonHandler();

};


const removeProject = (project) => {
  Object.keys(project).forEach(key => {
    if (project.hasOwnProperty(key)) {
      delete project[key];
    }
  });
};


const resetProject = (project, cb) => {
  removeOldEventListeners(project);
  setTimeout(()=> {
    resetProjectRendering();
    projectNameInput.value = ''; 
    removeProject(project);
    cb();
  }, 0);
};


const addNewLane = (newSound, project) => {
  const {urls} = buffer;
  const newUrls = [...urls, newSound];
  
  window.buffer.urls = newUrls;
  console.log(newUrls)


  const {lanes} = project; 
  const newLane = createLane(newUrls[newUrls.length - 1]); 
  console.log(newLane);
  const newLanes = [...lanes, newLane];
  console.log(newLanes)

      
  window.currentProject = {
    name: currentProject.name,
    bpm: currentProject.bpm,
    lanes: newLanes
  };
  renderInitialProject(currentProject);

};


export {addOpenModalButtonHandler, resetProject, addProjectsButtonsHandlers, setProjectNamePlaceHolder, setProjectDisabledSteps, setProjectPannerValue, setProjectVolumeValue, changeProjectUpdateButton, addNewLane};