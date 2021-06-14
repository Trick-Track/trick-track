const playButton = document.getElementById('play');
const stopButton = document.getElementById('stop');
let isPlaying = false;

const playProject = (cb) => {
    isPlaying = true;
    cb();
}

const stopPlayProject = (cb) => {
    isPlaying = false;
    
}

const addButtonPlayHandler = (cb) => {
    playButton.addEventListener('click', () => playProject(cb));
}

const addButtonStopHandler = () => {
    stopButton.addEventListener('click', stopPlayProject)
}

export {addButtonPlayHandler, addButtonStopHandler}