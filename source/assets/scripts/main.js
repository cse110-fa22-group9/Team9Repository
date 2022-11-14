// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the cards from localStorage
  let cards = getCardsFromStorage();
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
  // A9. TODO - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.
  
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
  // A10. TODO - Get a reference to the <main> element
  let mainElement = document.querySelector('main');
  // A11. TODO - Loop through each of the cards in the passed in array,
  //            create a card element for each one, and populate
  //            each card with that card data using element.data = ...
  //            Append each element to <main>
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
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  localStorage.setItem('cards',JSON.stringify(cards));
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {

  // B2. TODO - Get a reference to the <form> element
  //let formElement = document.getElementById('new-card');
  // B3. TODO - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  //let submitButton = document.getElementById("submit");
  //submitButton.addEventListener('click', (event) => {
  // Steps B4-B9 will occur inside the event listener from step B3
  // B4. TODO - Create a new FormData object from the <form> element reference above
    //let formData = new FormData(formElement);

  // B5. TODO: Create an empty object, and based on whether we are
  // adding a show or a move, extract the keys and corresponding
  // values from the FormData object and insert them into the object
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
  // B7. TODO - Add the cardObject data to the card element using element.data
    newCard.data = testObject;

  // B8. TODO - Append this new card element to <main>
    document.querySelector('main').append(newCard);

  // B9. TODO - Get the cards array from localStorage, add this new card to it, and
  //            then save the cards array back to localStorage
    let cardsArray = getCardsFromStorage();
    cardsArray.push(testObject);

    //saveCardsToStorage(cardsArray);
  //});



  cardsArray.push(testObject);
  console.log(cardsArray);
  // B10. TODO - Get a reference to the "Clear Local Storage" button
  let clearButton = document.getElementById("clear");
  // B11. TODO - Add a click event listener to clear local storage button
  clearButton.addEventListener('click', (event) => {
  // Steps B12 & B13 will occur inside the event listener from step B11
  // B12. TODO - Clear the local storage
    localStorage.clear();
  // B13. TODO - Delete the contents of <main>
    let mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
  });
}