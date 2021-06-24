const bpmControl = document.querySelector('#bpm');


const addBpmInputHandler = () => {
    bpmControl.addEventListener('change', function() {
     bpmControl.value = this.value;
  });
};


const setTempo = () => {
    const bpm = bpmControl.value
    const tic = (60 / bpm) / 4;
    console.log(tic)
    return tic;  
  }

export {addBpmInputHandler, setTempo};
