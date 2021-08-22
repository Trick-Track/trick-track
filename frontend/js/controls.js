import {setProjectPannerValue, setProjectVolumeValue} from './project.js';
import {isMouseLeftEvent} from './util.js';


let prevY = 0;
let angleDegree = 0;


// const getCenter = (element) =>  {
//   const {left, top, width, height} = element.getBoundingClientRect();
//   return {x: left + width / 2, y: top + height / 2};
// };


const addPannerControlsHandler = (cb, project) => {
  const pannerLabels = document.querySelectorAll('.sequencer__controls-label--panner');
  const pannerControls = document.querySelectorAll('[data-action="panner"]');
  
  pannerLabels.forEach((pannerLabel) => {
    const pannerSpinner = pannerLabel.querySelector('.sequencer__controls-label-img');
    const pannerControl = pannerLabel.querySelector('[data-action="panner"]');
    //const imgCenter = getCenter(pannerSpinner);

    const onMouseLeftClick = (evt) => {
      if(isMouseLeftEvent(evt)) {
        evt.preventDefault();
        prevY !== 0;
        addEventsOnPannerSpinner('pointermove', 'pointerup');
      }
    };

    const onMouseMove = (evt) => { 
      if (prevY != 0) {
        if (evt.pageY <= prevY) {
          const  mouseDistance = prevY - evt.pageY;
          angleDegree += Math.floor(mouseDistance);
          if (angleDegree >= 360) {
            angleDegree = 360;
          }

        
        } 
        else if (evt.pageY > prevY){
          const mouseDistance = evt.pageY - prevY;
          angleDegree -= Math.floor(mouseDistance);
          if (angleDegree <= 0) {
            angleDegree = 0;
          }

          console.log(angleDegree);
        }
       
      }
      prevY = evt.pageY;
      pannerSpinner.style.transform = `rotate(${angleDegree}deg)`; 
      pannerControl.value = (angleDegree / 180).toFixed(2);
      cb(pannerControls, project);
      console.log(pannerControl.value);  
    };

    pannerSpinner.addEventListener('pointerdown', onMouseLeftClick);

    const addEventsOnPannerSpinner = (eventMove, eventEnd) => {
      document.addEventListener(eventMove, onMouseMove);
    
      document.addEventListener(eventEnd, () => {
        prevY = 0;
        document.removeEventListener(eventMove, onMouseMove);
        //pannerSpinner.removeEventListener('pointerdown', onMouseLeftClick);
      });

 
    };
  });
}; 


//angleDegree / 180).toFixed(2)
 

// pannerSpinner.addEventListener('mousemove', ({clientX, clientY}) => {
//   if (isPannerSpinnerMove == true) {
  
//     const angle = Math.atan2(clientY - imgCenter.y, clientX - imgCenter.x);

//     pannerSpinner.style.transform = `rotate(${angle}rad)`;
//     let angleDegree = (angle * 180) / Math.PI;
//     pannerControl.value = (angleDegree / 180).toFixed(2);

//     document.addEventListener('mouseup', () => {
//       if(isPannerSpinnerMove == true) {
//         isPannerSpinnerMove = false;
//       }
//     });

//     cb(pannerControls, project);
//   }
// });
//});


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