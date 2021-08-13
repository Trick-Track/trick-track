import {setProjectPannerValue, setProjectVolumeValue} from './project.js';
import {isMouseLeftEvent} from './util.js';


let isPannerSpinnerMove = false;


const getCenter = (element) =>  {
  const {left, top, width, height} = element.getBoundingClientRect();
  return {x: left + width / 2, y: top + height / 2};
};


const onMouseLeftClick = (evt) => {
  if(isMouseLeftEvent(evt)) {
    evt.preventDefault();
    isPannerSpinnerMove = true;
  }
};


const addPannerControlsHandler = (cb, project) => {
  const pannerLabels = document.querySelectorAll('.sequencer__controls-label--panner');
  const pannerControls = document.querySelectorAll('[data-action="panner"]');
  
  pannerLabels.forEach((pannerLabel) => {
    const pannerSpinner = pannerLabel.querySelector('.sequencer__controls-label-img');
    const pannerControl = pannerLabel.querySelector('[data-action="panner"]');
    const imgCenter = getCenter(pannerSpinner);

    pannerSpinner.addEventListener('mousedown', onMouseLeftClick);
  
    pannerSpinner.addEventListener('mousemove', ({clientX, clientY}) => {
      if (isPannerSpinnerMove == true) {
      
        const angle = Math.atan2(clientY - imgCenter.y, clientX - imgCenter.x);

        pannerSpinner.style.transform = `rotate(${angle}rad)`;
        let angleDegree = (angle * 180) / Math.PI;
        pannerControl.value = (angleDegree / 180).toFixed(2);

        document.addEventListener('mouseup', () => {
          if(isPannerSpinnerMove == true) {
            isPannerSpinnerMove = false;
          }
        });

        cb(pannerControls, project);
      }
    });
  });
};


const addVolumeControlsHandler = (cb, project) => {
  const volumeControls = document.querySelectorAll('[data-action="volume"]');
  volumeControls.forEach((volumeControl) => {
    volumeControl.addEventListener('input', (evt) => {
      volumeControl.value = evt.target.value;
      cb(volumeControls, project);
    });
  });
};


const removeVolumeControlsHandler = () => {
  const volumeControls = document.querySelectorAll('[data-action="volume"]');
  volumeControls.forEach((volumeControl) => {
    volumeControl.removeEventListener('input', (evt) => {
      volumeControl.value = evt.target.value;
    });
  });
};


const addControlsHandlers = (project) => {
  addVolumeControlsHandler(setProjectVolumeValue, project);
  addPannerControlsHandler(setProjectPannerValue, project);
};


const removeControlsHandlers = () => {
  removeVolumeControlsHandler();
};

 
export {addControlsHandlers, removeControlsHandlers}; 