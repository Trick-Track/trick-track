const createProject = (newLanes, bpm) => {
    const project = {bpm: bpm, lanes: newLanes, name: name, isPlayed: false}
    return project;
}



// export default class Project {

//         constructor (bpm, lanes) {
//           this.name = name;
//           this.bpm = bpm;
//           this.lanes = lanes;
//         }
      
// }

export {createProject} 