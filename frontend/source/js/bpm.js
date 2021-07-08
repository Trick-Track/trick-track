const bpmControl = document.querySelector('#bpm');
const incrementButton = document.querySelector('.app-bpm__button--increment');
const decrementButton = document.querySelector('.app-bpm__button--decrement');

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

const addBpmHandlers = () => {
  addBpmInputHandler();
  addBpmButtonsClickHandlers();
}

const setBpm = () => {
  const bpm = bpmControl.value;
  return bpm
}

const setTempo = () => {
    const bpm = bpmControl.value
    const tic = (60 / bpm) / 4;
    return tic; 
  }

export {addBpmHandlers, setBpm, setTempo};
