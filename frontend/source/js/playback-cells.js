

const renderPlaybackLine = (steps) => {

    const playbackWrapper = document.querySelector('.sequencer__playback');
    
    const fragment = document.createDocumentFragment();

    for(let i = 0; i < steps; i++) {

   
    const playbackStep = document.createElement('div');

    playbackStep.classList.add('sequencer__playback-element');

    fragment.append(playbackStep);
    }
    playbackWrapper.append(fragment);
}




const fillCurrentPlaybackStep = (step) => {
    const playbackSteps = document.querySelectorAll('.sequencer__playback-element');

    [...playbackSteps].forEach((playbackStep) => {
        const currentStep = playbackSteps[step - 1];
        if (playbackStep == currentStep) {
            playbackStep.classList.add('sequencer__playback-element--played')
        }    
        else {
            playbackStep.classList.remove('sequencer__playback-element--played');
        }

    })
}

export {renderPlaybackLine, fillCurrentPlaybackStep}