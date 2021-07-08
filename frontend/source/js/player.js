const playButton = document.getElementById('play');
const stopButton = document.getElementById('stop');

const stopPlayback = (context, currentStep) => {
    context.close();
    currentStep = 0
}

const addButtonPlayHandler = (callback) => {
    playButton.addEventListener('click', (callback));
}

const addButtonStopHandler = (callback, cb) => {
    stopButton.addEventListener('click', cb);
    playButton.removeEventListener('click', callback)

}

export {addButtonPlayHandler, addButtonStopHandler}