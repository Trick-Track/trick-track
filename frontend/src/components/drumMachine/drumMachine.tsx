import React from "react";
import Lane from "../lane/lane";
import {LaneType} from '../../data/types'

type Key = string | number;

const DrumMachine: React.FC = (props: any) => {
  let {lanes, checkCell, playSample} = props;

  return (
    <div className="drumMachine__wrapper">
      <ul className="sequencer__samples-list">

        {lanes.map((lane:LaneType) => (
          <Lane
            key={lane.id}
            lane = {lane}
            checkCell={checkCell}
            playSample={playSample}
          />))
        }
      </ul>
    </div>
  )

}

export default DrumMachine
