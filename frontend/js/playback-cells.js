const createPlaybackElement = () => {
    const playbackStep = document.createElement('div');
    playbackStep.classList.add('sequencer__playback-element');
    return playbackStep;
}
 
const createPlaybackElementsWrapper = (n) => {
    const playbackList = document.createElement('div');
    playbackList.classList.add('sequencer__playback-list');

    for (let i = 0; i < n ; i++) {
        const playbackStep = createPlaybackElement();
        playbackList.append(playbackStep);
    }
    return playbackList;
}

const renderPlaybackLine = () => {
    const playbackWrapperFirst = document.querySelector('.slide-1');
    const playbackWrapperSecond = document.querySelector('.slide-2');

    const fragment = document.createDocumentFragment();
    const fragmentOne = document.createDocumentFragment();
    
    const playbackList = createPlaybackElementsWrapper(16); 
    fragment.append(playbackList);

    const playbackListOne = createPlaybackElementsWrapper(16); 
    fragmentOne.append(playbackListOne);
    
    playbackWrapperFirst.append(fragment);
    playbackWrapperSecond.append(fragmentOne);
}


const fillCurrentPlaybackStep = (step) => {
    const playbackSteps = document.querySelectorAll('.sequencer__playback-element');

    [...playbackSteps].forEach((playbackStep) => {
        const currentStep = playbackSteps[step - 1];
        playbackStep == currentStep ? playbackStep.classList.add('sequencer__playback-element--played') :
        playbackStep.classList.remove('sequencer__playback-element--played');
    })
}

export {renderPlaybackLine, fillCurrentPlaybackStep}