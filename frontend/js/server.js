import {showError} from './messages.js';
import {createSavedProject} from './build-project.js';
import {resetProject} from './project.js';
import {renderInitialProject} from './renderer.js';


const BASE_URL = '/projects';


const checkStatusRequest = (response) => {
  if (response.ok) {
    return response;
  }
  const { statusText, status } = response;
  const error = new Error (`${status} (${statusText})`);
  throw error;
};


const sendProject = (body, onSuccess) => {
  fetch(BASE_URL,
    {
      method: 'POST',
      body: JSON.stringify(body)
    },
  )
    .then(checkStatusRequest)
    .then((response) => {
      return response.json();
    })
    .then((projectData) => {
      const project = JSON.parse(projectData);
      const id = project[0].pk;
      createSavedProject(id);
    }) 
    .then(onSuccess(window.currentProject))
    .catch((error) => showError(error));
};


const updateProject = (body, onSuccess) => {
  fetch(`${BASE_URL}/${body.pk}/`,
    {
      method: 'PUT',
      body: JSON.stringify(body)
    },
  )
    .then(checkStatusRequest)
    .then((response) => {
      console.log(body);
      onSuccess(response);})
    .catch((error) => showError(error));
};


const getProject = (pk, onSuccess) => {
  fetch(`${BASE_URL}/${pk}`)

    .then(checkStatusRequest)
    .then((response) => response.json())
    .then((projectData) => JSON.parse(projectData))
    .then((project) => resetProject(currentProject, () => {
      const newProject = project[0].fields;
      window.currentProject = newProject;
      createSavedProject(Number(pk)); 

      console.log(currentProject);
      renderInitialProject(currentProject);
      //return currentProject;
    }))
    .then((onSuccess))
    .catch((error) => console.log(error));
};  


export {sendProject, getProject, updateProject};