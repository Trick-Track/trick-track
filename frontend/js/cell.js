const initialCells = (steps) => {
    let cells = [];
   
    for (let i = 0; i < steps; i++) {

      const cell = {
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

const resetLanes = (lanes) => {
  lanes.forEach((lane) => {
    const {cells, volume, panner} = lane;
      cells.forEach((cell) => {
      cell.checked = false;
    });

    volume == 1;
    panner == 1;
  });
  return lanes
}

// const setCellCheckedColor = (cell) => {
//   const {checked} = cell;

//   switch(checked) {
//     case true:
//       return ''
//     break;
//     case false:
//       return '#ffffff';
//     break;
//     default:
//       return '#ffffff';
//   }
// }




export {initialCells, createLanes, resetLanes}