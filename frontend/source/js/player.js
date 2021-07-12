const playButton = document.getElementById('play');
const stopButton = document.getElementById('stop');

const stopPlayback = (context) => {
    context.suspend();
    console.log(context.state)
    //currentStep = 0;
    playButton.removeEventListener('click', playSequencer)
}

const playSequencer = (context, callback) => {
    callback();
    console.log(context.state)
    if (context.state === 'suspended') {
        context.resume();
    }
}

const addButtonPlayHandler = (context, callback) => {
    playButton.addEventListener('click', () => {
        playSequencer(context, callback)
    });
}

const addButtonStopHandler = (context) => {
    stopButton.addEventListener('click', () => {stopPlayback(context)
    });
}

export {addButtonPlayHandler, addButtonStopHandler}