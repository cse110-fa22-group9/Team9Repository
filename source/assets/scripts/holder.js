// main.js

// import important functions from tools.js
import {getShowsFromStorage} from './tools.js';
import {saveShowsToStorage} from './tools.js';


// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the cards from localStorage
  let shows = getShowsFromStorage();
  // Add each card to the <main> element
  addCardsToDocument(cards);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'cards' from localStorage and returns an array of
 * all of the cards found (parsed, not in string form). If
 * nothing is found in localStorage for 'cards', an empty array
 * is returned.
 * @returns {Array<Object>} An array of cards found in localStorage
 */
function getCardsFromStorage() {
  return JSON.parse(localStorage.getItem('cards')) || [];
}

/**
 * Takes in an array of cards and for each card creates a
 * new card element based on whether it is for a movie or show, adds the card data
 * using element.data = {...}, and then appends that new card
 * to <main>
 * @param {Array<Object>} cards An array of cards
 */
function addCardsToDocument(cards) {
  let mainElement = document.querySelector('main');
  for(var i = 0; i < cards.length; i++) {
    //TODO: FIGURE OUT HOW TO DIFFERENTIATE BETWEEN MOVIE AND SHOW CARDS
    /*
    if(current card is for movie) {
        let cardElement = document.createElement('expanded-movie-card');
    }
    else {
        let cardElement = document.createElement('expanded-show-card');
    }
    */
    let cardElement;
    if(cards[i]["showTitle"] != null) { //if show
      cardElement = document.createElement('expanded-show-card');
    }
    else { //movie
      cardElement = document.createElement('expanded-movie-card');
    }
    cardElement.data = cards[i];
    mainElement.append(cardElement);
  }
}

/**
 * Takes in an array of cards, converts it to a string, and then
 * saves that string to 'cards' in localStorage
 * TODO: Figure out if you can store cards in this way, by having both movie data and show data
 * in the same array
 * @param {Array<Object>} cards An array of cards
 */
function saveCardsToStorage(cards) {
  localStorage.setItem('cards',JSON.stringify(cards));
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
  /**
   * if(WE ARE ADDING A MOVIE) {
   *    let cardObject = {
   *        "movieTitle": formData.get("movieTitle"),
            "imgSrc": formData.get("imgSrc"),
            "imgAlt": formData.get("imgAlt"),
            "movieDuration": formData.get("movieDuration"),
            "progressMade": formData.get("progressMade"),
            "rating": formData.get("rating"),
            "comments": formData.get("comments"),
        }
        // cardObject["showTitle"] -> null/undefined
        let newCard = document.createElement('expanded-movie-card');
        
   * }
    //WE ARE ADDING A SHOW
     else {
        let cardObject = {
   *        "showTitle": formData.get("showTitle"),
            "imgSrc": formData.get("imgSrc"),
            "imgAlt": formData.get("imgAlt"),
            "episodeArray": formData.get("numEpisodes"),
            "rating": formData.get("rating"),
            "comments": formData.get("comments"),
        }

        let newCard = document.createElement('expanded-show-card');
     }
   */
    let newCard;
    let testObject = {
      "showTitle": "Star Trek",
      "imgSrc": "https://i.pinimg.com/originals/21/e0/6f/21e06f75f820b6eea65f02c254c1b0cc.png",
      "imgAlt": "https://i.postimg.cc/NfRt443h/bt.png",
      "episodeArray": [[true, true, false, true],[true, false, true]],
      "rating": 5,
      "comments": "very good would watch again",
    };
    if(testObject["showTitle"] != null) { //if show
      newCard = document.createElement('expanded-show-card');
    }
    else { //movie
      newCard = document.createElement('expanded-movie-card');
    }
    newCard.data = testObject;

    document.querySelector('main').append(newCard);

    let cardsArray = getCardsFromStorage();
    cardsArray.push(testObject);



  cardsArray.push(testObject);
  console.log(cardsArray);
  let clearButton = document.getElementById("clear");
  clearButton.addEventListener('click', (event) => {
    localStorage.clear();
    let mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
  });
}