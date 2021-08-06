import {renderInitialProject} from './renderer.js';
import {addArrowsHandlers} from './slider.js';
import {addPlayerButtonsHandlers} from './player.js';
import {addControlsHandlers} from './controls.js';
import {addProjectsHandlers, addOpenModalButtonHandler, addSaveButtonHandler, changeProjectUpdateButton} from './project.js';
import {createDefaultProject} from './build-project.js';
import {showSuccess} from './messages.js';
import {Buffer} from './buffer.js'
import {setSounds} from './data-store.js';

import '../sass/style.sass';


let sounds = ['/static/samples/bdsh.wav',
                '/static/samples/boom.wav',
                '/static/samples/tsk.wav',
              ];

window.context = new (window.AudioContext || window.webkitAudioContext)();
window.buffer = new Buffer(context, sounds);

buffer.createBuffer(() =>  {
  setSounds(buffer.urls)
})

const project = createDefaultProject(buffer.urls);

window.currentProject = project;
renderInitialProject(currentProject);


//addProjectsHandlers()
addOpenModalButtonHandler();


addArrowsHandlers(); //стрелки слайдера

addControlsHandlers(currentProject) //звук и панорама для дорожек
addPlayerButtonsHandlers();



addSaveButtonHandler(currentProject, () => {
  showSuccess();
  changeProjectUpdateButton();
  console.log(currentProject)
})







