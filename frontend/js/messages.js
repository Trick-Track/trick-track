import {isEscEvent, isMouseLeftEvent} from './util.js';

const SHOW_SUCCESS_TIME = 2500;

const MessageTypes = {
    success: 'success',
    error: 'error',
  }

  
  const showMessage = (messageType) => {
    const resultTemplate = document.querySelector(`#${messageType}`)
      .content
      .querySelector(`.${messageType}__wrapper`)
      .cloneNode(true);
  
    resultTemplate.style.zIndex = 500;
  
    const fragment = document.createDocumentFragment();
    fragment.append(resultTemplate);
  
    const closeButton = resultTemplate.querySelector('.error__button')
  
    const removeTemplate = () => {
      resultTemplate.remove();
  
      if (closeButton) {
        closeButton.removeEventListener('click', onButtonCloseClick);
      }
  
      document.removeEventListener('keydown', onDocumentEscapePressed);
    }
  
  
    const onButtonCloseClick = (evt) => {
      if (isMouseLeftEvent(evt)) {
        removeTemplate();
      }
    }
  
    const onDocumentEscapePressed = (evt) => {
      if (isEscEvent(evt)) {
        evt.preventDefault();
        removeTemplate();
      }
    };
  
    document.body.appendChild(fragment);
    document.addEventListener('keydown', onDocumentEscapePressed);
  
    if (closeButton) {
      closeButton.addEventListener('click', onButtonCloseClick);
    }

    if(messageType === 'success') {
      setTimeout(() => {
        resultTemplate.remove();
      }, SHOW_SUCCESS_TIME);
    }
  }


const showSuccess = () => showMessage(MessageTypes.success);
const showError = () => showMessage(MessageTypes.error);


  export {showSuccess, showError}
  