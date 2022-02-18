import React from "react";

const Cell = (props) => {
  const {cell, cells, checkCell, id} = props

  let classNames = 'sequencer__cell'

  let i = cells.indexOf(cell, 0)

  Math.floor((i / 4) % 2) == 0 ?
  classNames += ' sequencer__cell--even-quarter' :
  classNames += ' sequencer__cell--odd-quarter'

  if (cell.disabled == true) {
    classNames += ' sequencer__cell--disabled'
  }

  if (cell.checked == true) {
    classNames += ' sequencer__cell--checked'
  }

  return (
    <button
      className={classNames}
      onClick={()=> checkCell(id, i)}>
    </button>
  )
}

export default Cell