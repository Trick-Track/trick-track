const playbackWrapper = document.querySelector('.sequencer__playback');

const renderPlaybackLine = () => {
    const fragment = document.createDocumentFragment();

    for(let i = 0; i < 16; i++) {

   
    const playbackStep = document.createElement('div');

    playbackStep.classList.add('sequencer__playback-element');

    fragment.append(playbackStep);
    }
    playbackWrapper.append(fragment);
}

const fillCurrentPlaybackStep = (currentStep) => {
    const playbackSteps = document.querySelectorAll('.sequencer__playback-element');

    [...playbackSteps].forEach((playbackStep) => {
        const currentSte = playbackSteps[currentStep - 1];
        if (playbackStep == currentSte) {
            playbackStep.classList.add('sequencer__playback-element--played')
        }    
        else {
            playbackStep.classList.remove('sequencer__playback-element--played');
        }

    })
}

export {renderPlaybackLine, fillCurrentPlaybackStep}