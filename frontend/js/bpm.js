let tempo = 60;
const bpmControl = document.querySelector('#bpm');


const addBpmInputHandler = () => {bpmControl.addEventListener('input', function() {
    tempo = this.value;
    return tempo
})};

export {addBpmInputHandler}

