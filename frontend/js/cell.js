
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

const setCellBackground = (lanes) => {
  const {cells} = lanes[0];
  const {played, checked} = cells;

      switch(true) {
      case checked && played:
        return "#ffffff";
      case checked && !played:
        return "#ffff00";
      case !checked && played:
        return "#fffacd";
      default:
        return "#000000";
    }
  }


export {initialCells, setCellBackground}