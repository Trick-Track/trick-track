import {setProjectPannerValue, setProjectVolumeValue} from './project.js';


const getCenter = (element) =>  {
  const {left, top, width, height} = element.getBoundingClientRect();
  return {x: left + width / 2, y: top + height / 2}
};




const addPannerControlsHandler = (cb, project) => {
  const pannerLabels = document.querySelectorAll('.sequencer__controls-label--panner');
  const pannerControls = document.querySelectorAll('[data-action="panner"]');

  pannerLabels.forEach((pannerLabel) => {
    const pannerControl = pannerLabel.querySelector('[data-action="panner"]');
    const pannerSpinner = pannerLabel.querySelector('.sequencer__controls-label-img');
  
 
    pannerSpinner.addEventListener("mousemove", ({clientX, clientY}) => {
        const imgCenter = getCenter(pannerSpinner);
        const angle = Math.atan2(clientY - imgCenter.y, clientX - imgCenter.x);
        pannerSpinner.style.transform = `rotate(${angle}rad)`;
        let angleDegree = (angle * 180) / Math.PI;
        pannerControl.value = (angleDegree / 180).toFixed(2);
        cb(pannerControls, project);
    });
  });
} 


const addVolumeControlsHandler = (cb, project) => {
  const volumeControls = document.querySelectorAll('[data-action="volume"]');
  volumeControls.forEach((volumeControl) => {
    volumeControl.addEventListener('input', (evt) => {
      volumeControl.value = evt.target.value;
      cb(volumeControls, project)
    });
  });
};

const removeVolumeControlsHandler = () => {
  const volumeControls = document.querySelectorAll('[data-action="volume"]');
  volumeControls.forEach((volumeControl) => {
    volumeControl.removeEventListener('input', (evt) => {
      volumeControl.value = evt.target.value;
    })
  })
}

const addControlsHandlers = (project) => {
  addVolumeControlsHandler(setProjectVolumeValue, project);
  addPannerControlsHandler(setProjectPannerValue, project);
};

const removeControlsHandlers = () => {
  removeVolumeControlsHandler();
}

 
export {addControlsHandlers, removeControlsHandlers}; 