// main.js
//importing functions from tools.js

import {getShowsFromStorage} from './tools.js';
import {saveShowsToStorage} from './tools.js';


// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let content = getShowsFromStorage();
  // Add each recipe to the <main> element
  addContentToDocument(content);

}


function addContentToDocument(content) {
  const mainSelector = document.querySelector("main");
  content.forEach(element => {
    if (element['movie']) {
        
        let movieCard = document.createElement('small-movie-card');
        movieCard.data = element;
        mainSelector.append(movieCard);
    } else {
        let showCard = document.createElement('small-show-card');
        showCard.data = element;
        mainSelector.append(showCard);
    }
  })
}
