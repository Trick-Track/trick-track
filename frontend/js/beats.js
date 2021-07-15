const beatsControl = document.querySelector('#beats'); 
const incrementButton = document.querySelector('.app-beats__button--increment');
const decrementButton = document.querySelector('.app-beats__button--decrement');

const addBeatsUnit = () => {
    if (beatsControl.value < 32)
    beatsControl.value = Number(beatsControl.value) + 1;
}

const deleteBeatsUnit = () => {
    if (beatsControl.value > 1) {
    beatsControl.value = Number(beatsControl.value) - 1;
    }
   
}
const checkBeatsControlValidity = (cb) => {
    const validity = beatsControl.value < 1 || beatsControl.value > 32 ?
    beatsControl.setCustomValidity('beats 1 to 32'):
    beatsControl.setCustomValidity('');
  beatsControl.reportValidity(validity);
  cb()
}

const changeBeatsControlValue = () => {
    if (beatsControl.value > 32) {
        beatsControl.value = 32;
    }
  
    if (beatsControl.value < 1) {
        beatsControl.value = 1;
    }
}


const addBeatsButtonsClickHandlers = () => {
    incrementButton.addEventListener('click', addBeatsUnit);
    decrementButton.addEventListener('click', deleteBeatsUnit);
}

const addBeatsInputHandler = () => {
    beatsControl.addEventListener('change', function() {
        beatsControl.value = this.value;
    });
    beatsControl.addEventListener('change', () => {
        checkBeatsControlValidity(changeBeatsControlValue);
    });
}

const addBeatsHandlers = () => {
    addBeatsButtonsClickHandlers();
    addBeatsInputHandler();
}

const setBeats = () => {
    return beatsControl.value
}

const setBeatsInputDisabledState = (context) => {
    if (context.state === 'running') {
        beatsControl.disabled = true;
    }
    else {
        beatsControl.disabled = false;
    }
}


 
// const setCellDisabledState = (lanes) => {
//     lanes.forEach((lane) => {
        
//     })
// } 

  export {addBeatsHandlers, setBeats, setBeatsInputDisabledState}