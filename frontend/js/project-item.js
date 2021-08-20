import {getProject} from './server.js';
import{changeProjectUpdateButton} from './project.js';


const projectsList = document.querySelector('.app__project-list');

export class ProjectItem {

  constructor(project) {
    this.pk = project.pk;
    this.name = project.name;  
  }

  render() {
    const projectItem = document.createElement('li');
    projectItem.classList.add('app__project-item');
    const projectLink = document.createElement('a');
    projectLink.classList.add('app__project-link');
    projectLink.setAttribute('data-pk', this.pk);

    projectLink.setAttribute('href', '#');
    
    projectLink.innerHTML = this.name;
    projectItem.append(projectLink);
    projectsList.append(projectItem);

    projectLink.onclick = function(evt) {
      evt.preventDefault();
      const pk = evt.target.dataset.pk;
      getProject(pk, changeProjectUpdateButton, currentProject);
    }; 
  }

  rerenderSavedProjecItem(project) {
    const {pk} = project;
    const projectLink = document.querySelector(`[data-pk='${pk}']`);
    projectLink.innerHTML = this.name;
  }


  deleteItem(project) {
    const {pk} = project;
    const link = document.querySelector(`[data-pk='${pk}']`);
    projectsList.removeChild(link.parentNode);
  }
}