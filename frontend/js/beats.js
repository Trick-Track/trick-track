const beatsControl = document.querySelector('#beats'); 
const incrementButton = document.querySelector('.app-beats__button--increment');
const decrementButton = document.querySelector('.app-beats__button--decrement'); 


const initialBeats = (project) => {
  const {lanes} = project;
  lanes.forEach((lane) => {
    const {cells} = lane;
   // cells.every((cell => cell.disabled = false))
   //const cellDisabled = (cell) => cell.disabled = true;
   
   const l = cells.find(cell => cell.disabled == true)
   const i = cells.indexOf(l, 0);

  
   i < 0 ? beatsControl.value = 32 : beatsControl.value = i;
  
  });
};

const addBeatsUnit = () => {
  if (beatsControl.value < 32){
    beatsControl.value = Number(beatsControl.value) + 1;
  };
};

const deleteBeatsUnit = () => {
  if (beatsControl.value > 1) {
    beatsControl.value = Number(beatsControl.value) - 1;
  };
};

const checkBeatsControlValidity = (cb) => {
  const validity = beatsControl.value < 1 || beatsControl.value > 32 ?
  beatsControl.setCustomValidity('beats 1 to 32'):
  beatsControl.setCustomValidity('');
  beatsControl.reportValidity(validity);
  cb()
};

const changeBeatsControlValue = () => {
  if (beatsControl.value > 32) {
    beatsControl.value = 32;
  }

  if (beatsControl.value < 1) {
    beatsControl.value = 1;
  }
};


const addIncrementButtonClickHandler = (cb) => {
  incrementButton.addEventListener('click', () => {
    addBeatsUnit();
    cb();
  })
};


const addDecrementButtonClickHandler = (cb) => {
  decrementButton.addEventListener('click', () => {
    deleteBeatsUnit();
    cb();
  })
};



const addBeatsInputHandler = (cb) => {
  beatsControl.addEventListener('change', function () {
    beatsControl.value = this.value;
    checkBeatsControlValidity(changeBeatsControlValue);
    cb();
  });
}

const addBeatsHandlers = (cb) => {
  addIncrementButtonClickHandler(cb);
  addDecrementButtonClickHandler(cb);
  addBeatsInputHandler(cb);
}

const setBeats = () => {
  return beatsControl.value
}

const setBeatsInputDisabledState = () => {
  beatsControl.disabled = true;
  incrementButton.disabled = true;
  decrementButton.disabled = true;
}

const setBeatsInputEnabledState = () => {
  beatsControl.disabled = false;
  incrementButton.disabled = false;
  decrementButton.disabled = false;
}

 
export {initialBeats, addBeatsHandlers, setBeats, setBeatsInputDisabledState, setBeatsInputEnabledState}