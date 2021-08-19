import {addOpenModalButtonHandler, addProjectsButtonsHandlers, addUpdateButtonHandler, addDeleteButtonHandler} from './project.js';
import {createDefaultProject} from './build-project.js';
import {Buffer} from './buffer.js';
import {setSounds} from './data-store.js';
import {addPlayerButtonsHandlers} from './player.js';
import {addBpmHandlers} from './bpm.js';
import '../sass/style.sass';


let sounds = ['/static/samples/bdsh.wav',
  '/static/samples/boom.wav',
  '/static/samples/tsk.wav',
];


/* global currentProject:false, buffer:false, context: false */

window.context = new (window.AudioContext || window.webkitAudioContext)();
window.buffer = new Buffer(context, sounds);

buffer.createBuffer(() =>  {
  setSounds(buffer.urls);
});

window.currentProject = createDefaultProject(buffer.urls);

addOpenModalButtonHandler();

addPlayerButtonsHandlers();
addBpmHandlers();


addProjectsButtonsHandlers(window.currentProject);
console.log(currentProject);


addUpdateButtonHandler(() => {
  console.log(currentProject);
  console.log('ok');
});

addDeleteButtonHandler();
