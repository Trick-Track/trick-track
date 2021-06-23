const volumeControls = document.querySelectorAll('[data-action="volume"]');
const pannerControls = document.querySelectorAll('[data-action="panner"]');

const am = (buffer, audioData) => {
    volumeControls.forEach((volumeControl) => {
        console.log(volumeControl)
        volumeControl.addEventListener('input', () => {
            const j = volumeControls.indexOf(volumeControl, 0)
            const i = [...buffer.urls].indexOf(audioData, 0)
            if (j === i) {
                return volumeControl.value;
            } 
        })
    });
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
 //export {am}; 