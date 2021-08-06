import {showError} from './messages.js';
import {createSavedProject} from './build-project.js';

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
      .then((response) => {const project = response.json();
        return project})
      .then((project) => {
        const json = JSON.parse(project)
        const id = json[0].pk;
        createSavedProject(id)}) 
      .then(onSuccess(currentProject))
      .catch((error) => showError(error))
  };

  // const getProject = () => {
  //   fetch(BASE_URL)
  //   .then((response) => response.json)
  //   .then(console.log(response.json))
  // }

  const updateProject = (body, onSuccess) => {
    fetch(`${BASE_URL}/${body.pk}`,
      {
        method: 'PUT',
        body: JSON.stringify(body)
      },
    )

    .then(checkStatusRequest)
    .then((response) => onSuccess(response))
    .catch((error) => showError(error))


  };

const loadProject = (onSuccess) => {
  fetch(`${BASE_URL/id}`)

    .then(checkStatusRequest)
    .then((response) => response.json())

    .then((project) => {
      onSuccess(project);
    })

    .catch((error) => showError(error));
}


export {sendProject, loadProject, updateProject}