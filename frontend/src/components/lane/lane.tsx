import React from "react";
import Cell from "../drumMachine/sequencer/cell/cell";
import Button from "../UI/button/button";
import { CellType } from "../../data/types";

type Key = string | number;

const Lane: React.FC = (props) => {
  const {lane, checkCell, playSample} = props;
  const {cells, sound, volume, panner} = lane

  return (
    <li className='sequencer__samples-item'>
      <div className="sequencer__sound-buttons">
        <Button
          onClick={()=>{playSample(sound, volume, panner)}}>
        {sound.replace(/^.*[\\/]/, '').slice(0, -4)}
        </Button>
      </div>
      <div className="sequencer__steps-list">
        {cells.map((cell: CellType) => (
        <Cell
          key = {cells.indexOf(cell, 0)}
          checkCell = {checkCell}
          cell = {cell}
          cells = {cells}
          id = {lane.id}
          />))
        }
      </div>
    </li>
  )

}

export default Lane
