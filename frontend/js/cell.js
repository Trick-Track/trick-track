
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

const setCellCheckedColor = (cell) => {
  const {checked} = cell;
  switch(checked) {
    case true:
      return "#000000";
    break;
    case false:
      return "#ffffff";
    break;
    default:
      return "#ffffff";
  }
}

const setCellPlayedColor = (cell) => {
  const {played} = cell;
  switch(played) {
    case true:
      return "#ff00ff";
   break;
    case false:
      return "#ffffff";
    break;
    default:
      return "#ffffff";
  }
}



export {initialCells, setCellCheckedColor, setCellPlayedColor}