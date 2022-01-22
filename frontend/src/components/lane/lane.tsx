import React from "react";
import Cell from "../cell/cell";
import { CellType } from "../../redux/types";

const Lane: React.FC = (props: any) => {
  const {lane, checkCell} = props;
  const {cells} = lane
  return (
    <li className='sequencer__samples-item'>
      <div className="sequencer__steps-list">
        {cells.map((cell: CellType) => (
        <Cell
          checkCell = {checkCell}
          ></Cell>))
        }
      </div>
    </li>
  )

}

export default Lane
