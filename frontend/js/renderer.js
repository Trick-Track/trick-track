import {initialBpm, addBpmHandlers} from './bpm.js';
import {initialBeats, addBeatsHandlers} from './beats.js';
import {playSound} from './player.js';
import {setProjectDisabledSteps} from './project.js'


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

  const stepsList = newSample.querySelectorAll('.sequencer__steps-list');

  fillStep(stepsList, cells);
};


const renderProject = (project) => {
  initialBeats(project);
  let {lanes, bpm} = project;
    bpm = initialBpm(project);
    lanes.forEach((lane) => {
    generateMatrixLane(lane);
  })
};

const createCellsArray = (i) => {
  const slidesFirst = document.querySelectorAll('.sequencer__steps-list--first');
  const slidesSecond = document.querySelectorAll('.sequencer__steps-list--second');
  
  const cellsOfLane = [];
    cellsOfLane.push.apply(cellsOfLane, slidesFirst[i].children);
    cellsOfLane.push.apply(cellsOfLane, slidesSecond[i].children);
    
    return cellsOfLane;
}

const createAllCellsArray = (project, cb) => {
  const {lanes} = project;
  const allCellsLists = [];
  lanes.forEach((lane) => {
    const i = lanes.indexOf(lane, 0);
    const cellsOfLane = createCellsArray(i);
    allCellsLists.push(cellsOfLane);
    setCellBackgroundColor(allCellsLists)
  }) 
  cb(project, allCellsLists)
};

const setCellBackgroundColor = (cellsButtons) => {
  cellsButtons.forEach((cellsButtonsOfLane) => {
    for (let i = 0; i < cellsButtonsOfLane.length; i++) {
      if (Math.floor((i / 4) % 2) == 0) {
       cellsButtonsOfLane[i].classList.add('sequencer__cell--even-quarter')
      }
      else {cellsButtonsOfLane[i].classList.add('sequencer__cell--odd-quarter')
      };
    };
  });
};



const addButtonCellHandler = (project, cellsButtons, callback) => {
  const {lanes} = project;
  cellsButtons.forEach((cellsButtonsOfLane) => {
    const i = cellsButtons.indexOf(cellsButtonsOfLane, 0);
    const {cells} = lanes[i];
    cellsButtonsOfLane.forEach((cellElement) => cellElement.addEventListener('click', (evt) => {
      const cellElement = evt.target;
      const j = cellsButtonsOfLane.indexOf(cellElement, 0);
      cells[j].checked = cells[j].checked ? false : true; 
      callback(project, cellsButtons);
    }));
  });
};

const renderStateCellElement = (project, cellsButtons) => {
  const {lanes} = project;
  for (let i = 0; i < lanes.length; i++) {
    const {cells} = lanes[i]
    for (let j = 0; j < cells.length; j++) {  
      cells[j].disabled == true ? cellsButtons[i][j].classList.add('sequencer__cell--disabled') && cellsButtons[i][j].disabled == true :
      cellsButtons[i][j].classList.remove('sequencer__cell--disabled') && cellsButtons[i][j].disabled == false;
      cells[j].checked == true ? cellsButtons[i][j].classList.add('sequencer__cell--checked') : cellsButtons[i][j].classList.remove('sequencer__cell--checked') 
    }
  }
}

 
const createPlaybackElement = () => {
    const playbackStep = document.createElement('div');
    playbackStep.classList.add('sequencer__playback-element');
   // playbackStep.classList.add('sequencer__playback-element--no-played');
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
  console.log(playbackWrapperFirst)
};


const fillCurrentPlaybackStep = (step) => {
  const playbackSteps = document.querySelectorAll('.sequencer__playback-element');
  [...playbackSteps].forEach((playbackStep) => {
    const currentStep = playbackSteps[step];
    playbackStep == currentStep ? playbackStep.classList.add('sequencer__playback-element--played') :
    playbackStep.classList.remove('sequencer__playback-element--played'); 
  })
};

const getAllSoundsButtons = () => {
  let button = document.getElementsByClassName('button');
    let allSoundsButtons = [];
    allSoundsButtons.push.apply(allSoundsButtons, button);
    return allSoundsButtons;
}

const addSoundsButtonHandlers = (project) => {
  let allSoundsButtons = getAllSoundsButtons();

  allSoundsButtons.forEach((btn) => {
    btn.addEventListener('click', (evt) => {
      btn = evt.target;
      const i = allSoundsButtons.indexOf(btn, 0)
      playSound(buffer.getSound(i), 0, project);
    });
  });
};

const addButtonCellHandlers = (project, cellsButtons) => {
  addButtonCellHandler(project, cellsButtons, renderStateCellElement);
  addBeatsHandlers(() => setProjectDisabledSteps(project, () => {renderStateCellElement(project, cellsButtons)}))
}


const renderInitialProject = (project) => {
  addBpmHandlers();
  renderProject(project);
  renderPlaybackLine();
  createAllCellsArray(project, addButtonCellHandlers) ;
  addSoundsButtonHandlers(project);
}

//создание newlane

  

// const addNewLane = (lanes) => {
  
//   const before = lanes.slice(0, i);
//   const after = lanes.slice(i, i + 1);
//     const newArray = [...before, ...after];

//     return {
//       lanes: newArray,
//     }
//   })
// };




  
  export {renderInitialProject, generateMatrixLane, fillCurrentPlaybackStep, setCellBackgroundColor}