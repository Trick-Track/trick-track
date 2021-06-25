
const pannerControls = document.querySelectorAll('[data-action="panner"]');


const addVolumeControlsHandler = (lanes) => {
  const volumeControls = document.querySelectorAll('[data-action="volume"]');

  volumeControls.forEach((volumeControl) => {
        
        volumeControl.addEventListener('input', (evt) => {
          volumeControl = evt.target;
          const i = [...volumeControls].indexOf(volumeControl, 0);
          const lane = lanes[i]; 
          lane.volume = evt.target.value;
          console.log(lane)
    })
  })
}

// volumeControl.addEventListener('input', function() {
//     
// 	gainNode.gain.value = this.value;
// }, false);

// // panning
// const pannerOptions = {pan: 0};
// const panner = new StereoPannerNode(context, pannerOptions);


// pannerControl.addEventListener('input', function() {
// 	panner.pan.value = this.value;	
// }, false);

export {addVolumeControlsHandler}; 