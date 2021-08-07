import {showError} from './messages.js';
import {createSavedProject} from './build-project.js';
import { currentSlide } from './slider.js';

const BASE_URL = '/projects';

const checkStatusRequest = (response) => {
    if (response.ok) {
      return response;
    }
   
    const { statusText, status } = response;
   
    const error = new Error (`${status} (${statusText})`);
    throw error;
  }


const sendProject = (body, onSuccess) => {
  fetch(BASE_URL,
    {
      method: 'POST',
      body: JSON.stringify(body)
    },
  )
    .then(checkStatusRequest)
    .then((response) => {
      const projectData = response.json();
      return projectData})
    .then((projectData) => {
      const project = JSON.parse(projectData)
      const id = project[0].pk;
      createSavedProject(id)}) 
    .then(onSuccess(currentProject))
    .catch((error) => showError(error))
};


 
const updateProject = (body, onSuccess) => {
  fetch(`${BASE_URL}/${body.pk}/`,
    {
      method: 'PUT',
      body: JSON.stringify(body)
    },
  )

  .then(checkStatusRequest)
  .then((response) => onSuccess(response))
  .catch((error) => showError(error))
};



const getProject = (pk, onSuccess) => {
  fetch(`${BASE_URL}/${pk}`)

    .then(checkStatusRequest)
    .then((response) => response.json())
    .then((projectData) => {
      const project = JSON.parse(projectData);
     
      window.currentProject = project[0]
      return currentProject
      })
    .then((currentProject) => {
      let m = currentProject.fields; 
      onSuccess(m)})

    .catch((error) => console.log(error))

}


export {sendProject, getProject, updateProject}