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

const addBeatsButtonsClickHandlers = () => {
    incrementButton.addEventListener('click', addBeatsUnit);
    decrementButton.addEventListener('click', deleteBeatsUnit);
}

const addBeatsInputHandler = () => {
    beatsControl.addEventListener('change', function() {
        beatsControl.value = this.value;
    });
};

const addBeatsHandlers = () => {
    addBeatsButtonsClickHandlers();
    addBeatsInputHandler();
}

const setBeats = () => {
    return beatsControl.value
}

  export {addBeatsHandlers, setBeats}