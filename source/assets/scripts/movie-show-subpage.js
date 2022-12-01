// main.js

// import important functions from tools.js
//const functions = require('./tools.js');

import {getShowsFromStorage} from './tools.js';
import {saveShowsToStorage} from './tools.js';


// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  let queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const ind = urlParams.get('ind')
  console.log(ind);
  generateCard(ind);
}

function generateCard(ind) {
  let shows = getShowsFromStorage();
  let thisObject = shows[ind];

  let newCard;
  if(thisObject["movie"]) { //if show 
    newCard = document.createElement('expanded-movie-card');
  }
  else { //movie
    newCard = document.createElement('expanded-show-card');
  }
  newCard.data = thisObject;
  document.querySelector('main').append(newCard);
}
