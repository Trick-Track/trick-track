import {showError} from './messages.js';
import {createSavedProject} from './build-project.js';
import {resetProject} from './project.js';
import {renderInitialProject} from './renderer.js';


const BASE_URL = '/projects';


const checkStatusRequest = (response) => {
  if (response.ok) {
    return response;
  }
  const {status} = response;
  const error = new Error (`${status}`);
  throw error;
};


const sendProject = (body, onSuccess) => {
  console.log(body);
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
      console.log(project)
    
    }) 
    .then(() => onSuccess())
    .catch(error => {

      if (error.message == 401) {
        localStorage.setItem('project', JSON.stringify(body)); 
  
        document.location.href = '/accounts/login';} 
      else showError();
    });
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
  fetch(`${BASE_URL}/${pk}/`)
    .then(checkStatusRequest)
    .then((response) => response.json())
    .then((projectData) => JSON.parse(projectData))

    .then((newProject) => resetProject(project, () => {
      currentProject = newProject[0].fields;
      const id = newProject[0].pk;
      createSavedProject(id);
      renderInitialProject(currentProject);
    }))
    .then((onSuccess()))
    .catch((error) => console.log(error));
};  


const deleteProject = (body, onSuccess) => {
  fetch(`${BASE_URL}/${body.pk}/`,
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