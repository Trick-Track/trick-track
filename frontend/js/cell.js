
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

const setCellBackground = (checked, played) => {

      switch(true) {
      case checked && played:
        return "#ffffff";
      case checked && !played:
        return "#ffff00";
      case !checked && played:
        return "fffacd";
      default:
        return "white";
    }
  }


export {initialCells, setCellBackground}