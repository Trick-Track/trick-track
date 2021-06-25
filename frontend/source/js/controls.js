
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


const addPannerControlsHandler = (lanes) => {
  const pannerControls = document.querySelectorAll('[data-action="panner"]');
  
    pannerControls.forEach((pannerControl) => {

      pannerControl.addEventListener('input', (evt) => {
        pannerControl = evt.target;
        const i = [...pannerControls].indexOf(pannerControl, 0);
        const lane = lanes[i]; 
        lane.panner = evt.target.value;
        console.log(lanes);
      });
    });
}

const addControlsHandlers = (lanes) => {
  addVolumeControlsHandler(lanes);
  addPannerControlsHandler(lanes)
}


export {addControlsHandlers}; 