import {setProjectPannerValue, setProjectVolumeValue} from './project.js';
import {isMouseLeftEvent} from './util.js';


let prevY = 0;
let angleDegree = 0;


const addPannerControlsHandler = (cb, project) => {
  const pannerLabels = document.querySelectorAll('.sequencer__controls-label--panner');
  const pannerControls = document.querySelectorAll('[data-action="panner"]');
  
  pannerLabels.forEach((pannerLabel) => {
    const pannerSpinner = pannerLabel.querySelector('.sequencer__controls-label-img');
    const pannerControl = pannerLabel.querySelector('[data-action="panner"]');


    const onMouseLeftClick = (evt) => {
      if(isMouseLeftEvent(evt)) {
        evt.preventDefault();
        prevY !== 0;
        addEventsOnPannerSpinner('pointermove', 'pointerup');
        document.body.style.touchAction = 'none';
      }
    };

    const onMouseMove = (evt) => { 
      if (prevY != 0) {
        const  mouseDistance = (prevY - evt.pageY) * 2;
        angleDegree -= Math.floor(mouseDistance);

        if (evt.pageY < prevY) {
          if (angleDegree <= -90) {
            angleDegree = -90;
          }
        }

        else if (evt.pageY > prevY){
          if (angleDegree >= 90) {
            angleDegree = 90;
          }
        }
       
      }
      prevY = evt.pageY;
      pannerSpinner.style.transform = `rotate(${angleDegree}deg)`; 
      pannerControl.value = (angleDegree / 90).toFixed(2);
      cb(pannerControls, project);
    };

    pannerSpinner.addEventListener('pointerdown', onMouseLeftClick);

    const addEventsOnPannerSpinner = (eventMove, eventEnd) => {
      document.addEventListener(eventMove, onMouseMove);
    
      document.addEventListener(eventEnd, () => {
        prevY = 0;
        document.body.style.touchAction = 'auto';
        document.removeEventListener(eventMove, onMouseMove);
      });
    };
  });
}; 


const addVolumeControlsHandler = (cb, project) => {
  const volumeControls = document.querySelectorAll('[data-action="volume"]');
  volumeControls.forEach((volumeControl) => {
    volumeControl.addEventListener('input', (evt) => {
      document.body.touchAction = 'none';
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