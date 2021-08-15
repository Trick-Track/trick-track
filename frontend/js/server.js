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
    .then(onSuccess())
    .catch((error) => showError(error));
};


const updateProject = (body, onSuccess) => {
  fetch(`${BASE_URL}/${body.pk}/`,
    {
      method: 'PATCH',
      body: JSON.stringify(body)
    },
  )
    .then(checkStatusRequest)
    .then(onSuccess())
    .catch((error) => showError(error));
};


const getProject = (pk, onSuccess, project) => {
  fetch(`${BASE_URL}/${pk}`)
    .then(checkStatusRequest)
    .then((response) => response.json())
    .then((projectData) => JSON.parse(projectData))

    .then((newProject) => resetProject(project, () => {
      currentProject = newProject[0].fields;
      const id = newProject[0].pk;
      createSavedProject(id);
      renderInitialProject(currentProject);
      console.log(currentProject);
    }))
    .then((onSuccess()))
    .catch((error) => console.log(error));
};  


const deleteProject = (body, onSuccess) => {
  fetch(`${BASE_URL}/${body.pk}`,
    {
      method: 'DELETE',
      body: JSON.stringify(body)
    },
  )
    .then(checkStatusRequest)
    .then((response) => {
      onSuccess(response);})
    .catch((error) => console.log(error));

};


export {sendProject, getProject, updateProject, deleteProject};