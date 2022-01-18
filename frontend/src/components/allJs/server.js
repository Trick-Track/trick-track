import {showError} from './messages.js';
import {createSavedProject} from './build-project.js';
import {resetProject} from './project.js';
import {renderInitialProject, rerenderDeletedProjectList} from './renderer.js';


const BASE_URL = '/projects';


const checkStatusRequest = (response) => {
  if (response.ok) {
    return response;
  }
  
  const {status} = response;

  const error = new Error (`${status}`);
  throw error;
};

const getProjectData = (projectData) => {
  if (projectData.hasOwnProperty('error')) {
    const {error} = projectData;
    const err = new Error(error);
    throw err;
  }
  else {
    const project = JSON.parse(projectData);
    const id = project[0].pk;
    const savedProject = createSavedProject(id);
    return savedProject;
  }
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
      return response.json();})
  
    .then((projectData) => {
      getProjectData(projectData);
    }) 
    .then((project) => onSuccess(project))
    .catch((error) => {
  
      if (error.message == 401) {
        localStorage.setItem('project', JSON.stringify(body)); 
  
        document.location.href = '/accounts/login';} 
      else showError(error.message);
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
    .then((response) => response.json())
    .then((projectData) => getProjectData(projectData))
    .then((project) => onSuccess(project))
    .catch((error) => showError(error.message));
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


const getProjectsList = (onSuccess) => {
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((projects) => JSON.parse(projects))
    .then((objs) => onSuccess(objs));
};


const deleteProject = (body, onSuccess) => {
  fetch(`${BASE_URL}/${body.pk}/`,
    {
      method: 'DELETE',
      body: JSON.stringify(body)
    },
  )
    .then(checkStatusRequest)
    .then((response) => response.json())
    .then(resetProject(currentProject, onSuccess))
    .then((projectData) => JSON.parse(projectData))
    .then((projects) => rerenderDeletedProjectList(projects))
    .catch((error) => console.log(error));

};


export {sendProject, getProject, updateProject, deleteProject, getProjectsList};