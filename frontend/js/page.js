import {createDefaultProject} from './build-project.js';
import { getSounds } from './data-store.js';
import {renderProject} from './renderer.js';

const initializeProject = (cb) => {
    const project = createDefaultProject(getSounds());
    cb(project)
}

export {initializeProject}