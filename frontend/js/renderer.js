const sequencer = document.querySelector('.sequencer__wrapper');
const sampleList = sequencer.querySelector('.sequencer__samples-list');
const sampleTemplate = document.querySelector('#matrix').content.querySelector('.sequencer__samples-item');

// const createLine = (sound) => {
//   const newSample = sampleTemplate.cloneNode(true);
//   newSample.querySelector('.button').textContent = sound;
//   sampleList.append(newSample);
// }



const renderCell = () => {
  const cellElement = document.createElement('button');
  cellElement.classList.add('sequencer__cell');
  cellElement.type = 'button';
  
  return cellElement;
}

const setCellBackgroundColor = (cellElements) => {
  [...cellElements].forEach((cellElement) => {

    const cellIndex = [...cellElements].indexOf(cellElement, 0);
     if (Math.floor(cellIndex / 4) == 0) {
       cellElements[cellIndex].classList.add('sequencer__cell--even-quarter')
     }
    
    
  })
}




const fillStep = (stepsList, steps) => {
   
   const fragment = document.createDocumentFragment();
   const fragmentOne = document.createDocumentFragment();

   steps.slice(0, 16).forEach((step) => {
    
    const newStep = renderCell();
  
    fragment.append(newStep);
    });

    steps.slice(16, 32).forEach((step) => {
      const newStep = renderCell();
      fragmentOne.append(newStep);
      });
  
    stepsList[0].append(fragment);
    stepsList[1].append(fragmentOne);
};

const generateMatrixLane = (lane) => {
  const{sound, cells} = lane
  const newSample = sampleTemplate.cloneNode(true);
  newSample.querySelector('.button').textContent = sound.replace(/^.*[\\\/]/, '').slice(0, -4);
  sampleList.append(newSample);

  const stepsList = newSample.querySelectorAll('.sequencer__step-list');

  fillStep(stepsList, cells);
};


const generateMatrix = (project) => {
  const {lanes} = project;
    lanes.forEach((lane) => {
    generateMatrixLane(lane);
  })
};

const createCellsArray = (i) => {
  const slidesFirst = document.querySelectorAll('.slide-1');
  const slidesSecond = document.querySelectorAll('.slide-2');
  
  const cellsOfLane = [];
    cellsOfLane.push.apply(cellsOfLane, slidesFirst[i].children);
    cellsOfLane.push.apply(cellsOfLane, slidesSecond[i].children);
    
    return cellsOfLane;
}

const createAllCellsArray = (sounds) => {
  const allCellsLists = []
  for (let i = 0; i < sounds.length; i++) {
    const cellsOfLane = createCellsArray(i);
    allCellsLists.push(cellsOfLane);
  }
  return allCellsLists
}

const addButtonCellHandler = (cellsElements, project) => {
  const {lanes} = project;

  cellsElements.forEach((cellsOfLane) => {

    cellsOfLane.forEach((cell) => cell.addEventListener('click', (evt) => {
      const i = cellsElements.indexOf(cellsOfLane, 0);
      const {cells} = lanes[i];
      const cell = evt.target;
      const j = cellsOfLane.indexOf(cell, 0);
      cells[j].checked = cells[j].checked ? false : true; 
      cells[j].checked ==true ? cell.classList.add('sequencer__cell--checked') : cell.classList.remove('sequencer__cell--checked')
    }))
  })
};


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



// const renderPlayedCells = (cellsElements, lanes) => {

//   lanes.forEach((lane) => {
//     const {cells} = lane;
//     cells.forEach((cell) => {
//       const i = lanes.indexOf(lane);
//       const cellsOfLane = cellsElements[i];
//       const j = cells.indexOf(cell, 0);

      
//         cellsOfLane[j].style.borderColor = setCellBackgroundColor(lane);
      
      
//     })
//   })
// }


//создание новой дорожки

  

// const addNewLane = (lanes) => {
  
//   const before = lanes.slice(0, i);
//   const after = lanes.slice(i, i + 1);
//     const newArray = [...before, ...after];

//     return {
//       lanes: newArray,
//     }
//   })
// };




  
  export {generateMatrix, createAllCellsArray, generateMatrixLane, addButtonCellHandler, renderPlaybackLine, fillCurrentPlaybackStep}