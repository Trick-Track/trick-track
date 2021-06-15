const player = document.querySelectorAll('.player')
const playButton = document.getElementById('play');
const stopButton = document.getElementById('stop');

const playProject = (cb) => {
    //isPlaying = true;
    cb();
}

const stopPlayProject = (cb) => {
    //isPlaying = false;
    cb();
}

const addButtonPlayHandler = (callback, cb) => {
    playButton.addEventListener('click', (callback));
    stopButton.removeEventListener('click', (cb))
}

const addButtonStopHandler = (cb, callback) => {
    stopButton.addEventListener('click', (cb));
    playButton.removeEventListener('click', callback)

}

export {addButtonPlayHandler, addButtonStopHandler}