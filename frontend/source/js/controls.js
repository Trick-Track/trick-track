

const addVolumeControlsHandler = (lanes) => {
  const volumeControls = document.querySelectorAll('[data-action="volume"]');

  volumeControls.forEach((volumeControl) => {
        
        volumeControl.addEventListener('input', (evt) => {
          volumeControl = evt.target;
          const i = [...volumeControls].indexOf(volumeControl, 0);
          const lane = lanes[i]; 
          lane.volume = evt.target.value;
    })
  })
}

const getCenter = (element) =>  {
  const {left, top, width, height} = element.getBoundingClientRect();
  return {x: left + width / 2, y: top + height / 2}
}

const setControlAngle = () => {
  const pannerLabels = document.querySelectorAll('.sequencer__controls-label--panner')
  
  pannerLabels.forEach((pannerLabel) => {
    const pannerControl = pannerLabel.querySelector('[data-action="panner"]');
    const pannerSpinner = pannerLabel.querySelector('.sequencer__controls-label-img');
  

    const imgCenter = getCenter(pannerSpinner);
    pannerSpinner.addEventListener("mousemove", ({clientX, clientY}) => {
        const angle = Math.atan2(clientY - imgCenter.y, clientX - imgCenter.x);
        pannerSpinner.style.transform = `rotate(${angle}rad)`;
        pannerControl.value = angle / 2.2;
    });
  });

  
}




const addPannerControlsHandler = (lanes) => {
  const pannerControls = document.querySelectorAll('[data-action="panner"]');
  
      pannerControls.forEach((pannerControl) => {
          
          const i = [...pannerControls].indexOf(pannerControl, 0);
          const value = pannerControl.value;
          const lane = lanes[i]; 
          lane.panner = value;
    
        });
}


// const addPannerControlsHandler = (lanes) => {
//   const pannerControls = document.querySelectorAll('[data-action="panner"]');
  
//     pannerControls.forEach((pannerControl) => {

//       pannerControl.addEventListener('input', (evt) => {
//         pannerControl = evt.target;
//         const i = [...pannerControls].indexOf(pannerControl, 0);
//         const lane = lanes[i]; 
//         lane.panner = evt.target.value;
  
//       });
//     });
// }

const addControlsHandlers = (lanes) => {
  addVolumeControlsHandler(lanes);
  //addPannerControlsHandler(lanes)
}


export {addControlsHandlers, setControlAngle, addPannerControlsHandler}; 