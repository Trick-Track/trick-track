const bpmControl = document.querySelector('#bpm');
const incrementButton = document.querySelector('.app-bpm__button--increment');
const decrementButton = document.querySelector('.app-bpm__button--decrement');

const initialBpm = (project) => {
  const {bpm} = project;
  bpmControl.value = bpm;
}

const addBpmUnit = () => {
  bpmControl.value = Number(bpmControl.value) + 1;
}

const deleteBpmUnit = () => {
  bpmControl.value = Number(bpmControl.value) - 1;
}

const addBpmButtonsClickHandlers = () => {
  incrementButton.addEventListener('click', addBpmUnit);
  // incrementButton.addEventListener('mousedown', () => {
  
  //   let timeout = setTimeout(addBpmUnit, 1)
    
  // })
  decrementButton.addEventListener('click', deleteBpmUnit)
}

const addBpmInputHandler = () => {
    bpmControl.addEventListener('change', function() {
     bpmControl.value = this.value;
  });
};

const checkBpmControlValidity = (cb) => {
  const validity = bpmControl.value < 1 ?
  bpmControl.setCustomValidity('bpm should only be grater than 0'):
  bpmControl.setCustomValidity('');
  bpmControl.reportValidity(validity);
  cb()
}


const changeBpmControlValue = () => {
  if (bpmControl.value < 1) {
      bpmControl.value = 1;
  }
}

const addBpmHandlers = () => {
  addBpmInputHandler();
  addBpmButtonsClickHandlers();
  bpmControl.addEventListener('change', () => {
    checkBpmControlValidity(changeBpmControlValue);
  })
}

const setBpm = () => {
  return bpmControl.value;
  
}

const setTempo = () => {
  const bpm = bpmControl.value
  const tic = (60 / bpm) / 4;
  return tic; 
}

export {initialBpm, addBpmHandlers, setBpm, setTempo};
