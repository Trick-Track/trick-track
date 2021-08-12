import {getPkByProjectLink, addOpenModalButtonHandler, addSaveButtonHandler, changeProjectUpdateButton, addUpdateButtonHandler, addProjectsHandlers} from './project.js';
import {createDefaultProject} from './build-project.js';
import {showSuccess} from './messages.js';
import {Buffer} from './buffer.js';
import {setSounds} from './data-store.js';
import {addPlayerButtonsHandlers} from './player.js';
import {addBpmHandlers} from './bpm.js';
import '../sass/style.sass';


let sounds = ['/static/samples/bdsh.wav',
  '/static/samples/boom.wav',
  '/static/samples/tsk.wav',
];


window.context = new (window.AudioContext || window.webkitAudioContext)();
window.buffer = new Buffer(context, sounds);

buffer.createBuffer(() =>  {
  setSounds(window.buffer.urls);
});


/* global currentProject:false, buffer:false, context: false */

window.currentProject = createDefaultProject(buffer.urls);


addProjectsHandlers();
addOpenModalButtonHandler();

addPlayerButtonsHandlers();
addBpmHandlers();



addSaveButtonHandler(currentProject, () => {
  showSuccess();
  changeProjectUpdateButton();
});


addUpdateButtonHandler(currentProject, () => {
  console.log(currentProject);
  console.log('ok');
});


getPkByProjectLink(changeProjectUpdateButton);

