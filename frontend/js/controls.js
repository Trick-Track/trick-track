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


const setPannerControlValue = (cb, lanes) => {
  const pannerLabels = document.querySelectorAll('.sequencer__controls-label--panner');
  const pannerControls = document.querySelectorAll('[data-action="panner"]');
  
  pannerLabels.forEach((pannerLabel) => {
    const pannerControl = pannerLabel.querySelector('[data-action="panner"]');
    const pannerSpinner = pannerLabel.querySelector('.sequencer__controls-label-img');
  

    const imgCenter = getCenter(pannerSpinner);
    pannerSpinner.addEventListener("mousemove", ({clientX, clientY}) => {
        const angle = Math.atan2(clientY - imgCenter.y, clientX - imgCenter.x);
        pannerSpinner.style.transform = `rotate(${angle}rad)`;
        let angleDegree = (angle * 180) / Math.PI;
        pannerControl.value = (angleDegree / 180).toFixed(2);
        console.log(pannerControl.value)
        cb(pannerControls, lanes)
    });
  });
}

const addPannerControlsHandler = (controls, lanes) => {
  controls.forEach((control) => {
    const i = [...controls].indexOf(control, 0);
    const value = control.value;
    const lane = lanes[i]; 
    lane.panner = value;
  });
}

const addControlsHandlers = (lanes) => {
  addVolumeControlsHandler(lanes);
  setPannerControlValue(addPannerControlsHandler, lanes)
}


export {addControlsHandlers}; 