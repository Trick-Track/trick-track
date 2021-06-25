const bpmControl = document.querySelector('#bpm');


const addBpmInputHandler = () => {
    bpmControl.addEventListener('change', function() {
     bpmControl.value = this.value;
  });
};

const setBpm = () => {
  const bpm = bpmControl.value;
  return bpm
}

const setTempo = () => {
    const bpm = bpmControl.value
    const tic = (60 / bpm) / 4;
    return tic; 
  }

export {addBpmInputHandler, setBpm, setTempo};
