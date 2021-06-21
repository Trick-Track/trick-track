const bpmControl = document.querySelector('#bpm');


const addBpmInputHandler = (callback) => {
  let tempo
    bpmControl.addEventListener('change', function() {
    tempo = this.value;
    callback(tempo)
  });
  
};

const setTempo = (tempo) => {
    //const tempo = bpmControl.value;
    const tic = (60 / tempo) / 4;
    return tic;  
  }



export {addBpmInputHandler, setTempo};
