import React from "react";
import Lane from "../lane/lane";
import {LaneType} from '../../redux/types'

const DrumMachine: React.FC = (props: any) => {
  let {lanes, checkCell} = props;
  return (
    <div className="sequencer__wrapper">
      <ul className="sequencer__samples-list">

        {lanes.map((lane:LaneType) => (
          <Lane
            key={0}
            lane ={lane}
            checkCell={checkCell}
          />))
        }
      </ul>
    </div>
  )

}

export default DrumMachine
