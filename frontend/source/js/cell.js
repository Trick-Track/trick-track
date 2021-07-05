const barsControl = document.querySelector('#bars');

const initialCells = (steps) => {
    let cells = [];
   
    for (let i = 0; i < steps; i++) {

      const cell = {
        played: false,
        checked: false,
        disabled: false
      };

      cells.push(cell);
    }
    
    return cells;
}

const createLanes = (sounds, cells) => {
  const lines = []
 
  sounds.map((sound) => {
    const steps = [];

    for (let i = 0; i < cells.length; i++) {
      const clonedCell = Object.assign({}, cells[i]);
      steps.push(clonedCell)
    }
    const obj = {sound: sound, cells: steps, volume: 1, panner: 0}
    lines.push(obj)
  })
  return lines
}

const setCellCheckedColor = (cell) => {
  const {checked} = cell;
  switch(checked) {
    case true:
      return '#000000';
    break;
    case false:
      return '#ffffff';
    break;
    default:
      return '#ffffff';
  }
}




export {initialCells, createLanes, setCellCheckedColor}