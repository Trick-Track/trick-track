const playButton = document.getElementById('play');
const stopButton = document.getElementById('stop');

const playProject = (project) => {
   const {isPlayed} = project;
   isPlayed = true; 
   cb()

}

const stopPlaybackProject = (project) => {
    const {isPlayed} = false;
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