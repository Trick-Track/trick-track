import {addBpmHandlers} from './bpm.js';
import {addControlsHandlers, removeControlsHandlers} from './controls.js';
import {addArrowsHandlers} from './slider.js';
import {renderProject, addButtonCellHandlers, createAllCellsArray, addSoundsButtonHandlers, renderPlaybackLine} from './renderer.js';


const renderInitialProject = (project) =>  {
    addBpmHandlers();
    renderProject(project);
    renderPlaybackLine();
    createAllCellsArray(project, addButtonCellHandlers) ;
    addSoundsButtonHandlers(project);
    addControlsHandlers(project);
    addArrowsHandlers();
}

const removeOldEventListeners = () => {
 removeControlsHandlers()
}

export {renderInitialProject, removeOldEventListeners}