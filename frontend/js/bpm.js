const bpmControl = document.querySelector('#bpm');
const incrementButton = document.querySelector('.app-bpm__button--increment');
const decrementButton = document.querySelector('.app-bpm__button--decrement');


const initialBpm = (project) => {
  const {bpm} = project;
  bpmControl.value = bpm;
};

const addBpmUnit = () => {
  bpmControl.value = Number(bpmControl.value) + 1;
};

const deleteBpmUnit = () => {
  bpmControl.value = Number(bpmControl.value) - 1;
};


const addBpmButtonsClickHandlers = () => {
  incrementButton.addEventListener('click', addBpmUnit);
  decrementButton.addEventListener('click', deleteBpmUnit);
};


function onBpmInputChange () {
  bpmControl.value = this.value;
}

const checkBpmControlValidity = (cb) => {
  const validity = bpmControl.value < 1 ?
    bpmControl.setCustomValidity('bpm should only be grater than 0'):
    bpmControl.setCustomValidity('');
  bpmControl.reportValidity(validity);
  cb();
};


const changeBpmControlValue = () => {
  if (bpmControl.value < 1) {
    bpmControl.value = 1;
  }
};

const addBpmHandlers = () => {
  bpmControl.addEventListener('change', onBpmInputChange);
  addBpmButtonsClickHandlers();
  bpmControl.addEventListener('change', () => {
    checkBpmControlValidity(changeBpmControlValue);
  });
};


// const removeBpmHandlers = () => {
//   bpmControl.removeEventListener('change', onBpmInputChange);
//   incrementButton.removeEventListener('click', addBpmUnit);
//   decrementButton.removeEventListener('click', deleteBpmUnit);
//   bpmControl.removeEventListener('change', () => {
//     checkBpmControlValidity(changeBpmControlValue);
//   });
// };


const setBpm = () => {
  return bpmControl.value;
};


export {initialBpm, addBpmHandlers, setBpm};
