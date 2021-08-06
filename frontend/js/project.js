import {isEscEvent} from './util.js';
import {sendProject, loadProject} from './server.js';
import {setBpm} from './bpm.js';
import {setBeats} from './beats.js';
import {createDefaultProject} from './build-project.js'
import {getSounds} from './data-store.js';


const projectNameInput = document.querySelector('#project-name');
const saveButton = document.querySelector('.save-button');
const updateProjectButton = document.querySelector('.update-button');
const openModalButton = document.querySelector('.app__projects-link');
const modalNewProject = document.querySelector('.modal-new-project');
const createNewProjectButton = document.querySelector('.save__button--nosave');
const closeModalButton = document.querySelector('.save__button--save');
const projectIdLink = document.querySelectorAll('.app__project-button');


const onProjectNameInputChange = () => {
  const projectName = projectNameInput.value;
  return projectName;
}

const addProjectNameInputHandler = () => {
  projectNameInput.addEventListener('change', onProjectNameInputChange);
};


const setProjectPannerValue = (controls, project) => {
  const {lanes} = project;
    lanes.forEach((lane) => {
    const i = lanes.indexOf(lane, 0);
    let control = controls[i];
    lanes[i].panner = control.value;
  });
}

const setProjectVolumeValue = (controls, project) => {
  const {lanes} = project
  lanes.forEach((lane) => {
    const i = lanes.indexOf(lane, 0);
    let control = controls[i];
    lanes[i].volume = control.value;
  });
};

const closeModalNewProject = () => {
  modalNewProject.classList.remove('modal__show');
  closeModalButton.removeEventListener('click', closeModalNewProject);
  // createNewProjectButton.removeEventListener('click', () => {
  //   window.project = createDefaultProject(getSounds)
  //   console.log(project)
  // } );
  document.removeEventListener('keydown', onDocumentEscapePressed);
};


const onDocumentEscapePressed = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModalNewProject();
  }
};

// const onCreateNewProjectButtonClick = () => {
//   closeModalNewProject();
//   project = createDefaultProject(getSounds)
// }

const addOpenModalButtonHandler = () => {

  openModalButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    modalNewProject.classList.add('modal__show');
    closeModalButton.addEventListener('click', closeModalNewProject);
    createNewProjectButton.addEventListener('click', () => {
     currentProject = null;

    })
    document.addEventListener('keydown', onDocumentEscapePressed);
  })
}



const addProjectsHandlers = () => {
  addProjectNameInputHandler();
  //addOpenModalButtonHandler();
}

const addSaveButtonHandler = (project, onSuccess) => {
  saveButton.addEventListener('click', () => {
    project.name = onProjectNameInputChange();
    project.bpm = setBpm();
    sendProject(project, onSuccess);
    //console.log(JSON.stringify(project))
  });
}


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
  saveButton.classList.add('visually-hidden');
  updateProjectButton.classList.remove('visually-hidden');
   
  //projectNameInput.placeholder = project.name;
};

const resetProject = (project) => {
  
} 







export {addProjectsHandlers, addOpenModalButtonHandler, addSaveButtonHandler, setProjectDisabledSteps, setProjectPannerValue, setProjectVolumeValue, changeProjectUpdateButton} 