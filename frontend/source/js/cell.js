
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
    const obj = {sound: sound, cells: steps, volume: 1}
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

const setCellPlayedColor = (cell) => {
  const {played} = cell;
  switch(played) {
    case true:
      return "#ff00ff";
    break;
    case (!true): 
      return ""
    case false:
      return "#ffffff";
    break;
    default:
      return "#ffffff";
  }
}



export {initialCells, createLanes, setCellCheckedColor, setCellPlayedColor}