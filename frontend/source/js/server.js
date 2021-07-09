import {showError} from './messages.js';

const BASE_URL = 'https://POST/projects/1';

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
        body,
      },
    )
  
      .then(checkStatusRequest)
      .then((result) => onSuccess(result))
      .catch((error) => showError(error))
  };

export {sendProject}