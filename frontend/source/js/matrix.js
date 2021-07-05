const sequencer = document.querySelector('.sequencer__wrapper');
const sampleList = sequencer.querySelector('.sequencer__samples-list');
const sampleTemplate = document.querySelector('#matrix').content.querySelector('.sequencer__samples-item');

// const createLine = (sound) => {
//   const newSample = sampleTemplate.cloneNode(true);
//   newSample.querySelector('.button').textContent = sound;
//   sampleList.append(newSample);
// }

const renderStep = () => {
  const cellElement = document.createElement('button');
  cellElement.classList.add('sequencer__cell');
  cellElement.type = 'button';
  cellElement.tabIndex = 0;

  return cellElement;
}

const fillStep = (stepsList, steps) => {
   
   const fragment = document.createDocumentFragment();
   const fragmentOne = document.createDocumentFragment();

   steps.slice(0, 16).forEach((step) => {
    
    const newStep = renderStep();
  
    fragment.append(newStep);
    });

    steps.slice(16, 32).forEach((step) => {
      const newStep = renderStep();
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


const generateMatrix = (lanes) => {
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

const createAllCellsArray = () => {
  const allCellsLists = []
  for (let i = 0; i < 3; i++) {
    const cellsOfLane = createCellsArray(i);
    allCellsLists.push(cellsOfLane);
  }
  return allCellsLists
}

const addButtonCellHandler = (cellsElements, lanes, cb) => {
  //const cellsButtonsArray = createAllCellsArray();
  cellsElements.forEach((cellsOfLane) => {

    cellsOfLane.forEach((cell) => cell.addEventListener('click', (evt) => {
      const i = cellsElements.indexOf(cellsOfLane, 0);
      const {cells} = lanes[i];
      const cell = evt.target;
      const j = cellsOfLane.indexOf(cell, 0);
      cells[j].checked = cells[j].checked ? false : true; 
      cell.style.background = cb(cells[j]);
    }))
  })
};

// const renderPlayedCells = (cellsElements, lanes) => {

//   lanes.forEach((lane) => {
//     const {cells} = lane;
//     cells.forEach((cell) => {
//       const i = lanes.indexOf(lane);
//       const cellsOfLane = cellsElements[i];
//       const j = cells.indexOf(cell, 0);

//       if (cell.played != false) {
//         cellsOfLane[j].style.borderColor = setCellPlayedColor(cell);
//       }
      
//     })
//   })
// }


//создание новой дорожки

  

// const deleteLane = (lanes) => {
  
//   const before = lanes.slice(0, i);
//   const after = lanes.slice(i, i + 1);
//     const newArray = [...before, ...after];

//     return {
//       lanes: newArray,
//     }
//   })
// };




  
  export {generateMatrix, createAllCellsArray, generateMatrixLane, addButtonCellHandler}