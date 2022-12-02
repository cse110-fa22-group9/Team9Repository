/**
 * File Header: expandedMovieCard.js
 * 
 * Creates the class for the expanded movie card
 */

/**
 * Class Header: expandedMovieCard
 * 
 * When clicking on a small movie card, it expands and shows more detailed information about the show
 * Displays the movie title, image, progress, rating, and comments
 * 
 * 
 * data() - sets the movie card data with the information provided from the data object
 */

//importing functions from tools.js
import {getShowsFromStorage} from './tools.js';
import {saveShowsToStorage} from './tools.js';

//this variable is used to get the current card's id
var currentInd;

class expandedMovieCard extends HTMLElement {
    /**
     * Construct a expandedMovieCard element
     * @constructor
     */
    constructor() {
        super();

        let shadow = this.attachShadow({ mode: "open"});
        let article = document.createElement('article');
        let style = document.createElement('style');

        style.innerHTML = `
            #outerbox {
                background-color: rgb(1, 107, 112);
                padding: 0em 2em 1em 2em;
                overflow-x: scroll;
                resize: none;
                width: 76em;
            }

            #homebutton {
                border: 0;
                background-color: rgb(1, 107, 112);
                float: right;
                margin-right: 0.5em;
            }

            .topmovieheader {
                background-color: rgb(1, 107, 112);
                display: flex;
                justify-content: space-between;
                width: 100%;
                font-family: Arial;
                color: white;
                height: 3em;
            }

            .half{
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            #movieheader {
                color: white;
                margin-left: 1em;
            }

            #innerbox {
                background-color: rgb(17, 151, 157);
                padding: 0.7em 0.7em 0.7em 0.7em;
            }

            #movieandinfo {
                display: flex;
            }

            #info {
                margin-left: 0.7em;
                width: 100%;
            }
            
            #titleandbuttons {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 2.5em;
                width: 100%;
            }

            #titleandbuttons p {
                display: inline;
                height: 2.5em;
                line-height: 2.5em; 
                font-family: 'Oswald', sans-serif;
                color: white;
                font-size: 1.75em;
                margin: 0;
            }

            #titleandbuttons button {
                display: inline;
                margin-left: 0.6em;
                border: 0;
                background-color: rgb(17, 151, 157);
            }

            .rating {
                height: 2.5em;
                line-height: 2.5em; 
                font-family: 'Oswald', sans-serif;
                color: white;
                font-size: 1.75em;
            }

            .comments {
                height: 2.4em;
                line-height: 1.6em; 
                font-family: 'Oswald', sans-serif;
                color: white;
                font-size: 1.75em;
            }

            #progressheader, #slideVal {
                font-family: 'Oswald', sans-serif;
                margin-top: 0.3em;
                margin-bottom: 0em;
                color: white;
                font-weight: normal;
                font-size: 1.75em;
            }
            `;
        shadow.append(article);
        shadow.append(style);
    }

    /**
     * Called when the .data property is set on this element
     * 
     * For example:
     * let expandedMovieCard = document.createElement('expanded-movie-card'); // Calls constructor()
     * expandedMovieCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
     * 
     * expandedMovieCard and smallMovieCard get data from same data object, smallMovieCard just uses part of the data
     * expandedMovieCard theoretically can just take a copy of the data object in the smallMovieCard
     * 
     * @function
     * @param {Object} data - The data to pass into the <expanded-movie-card>, must be of the following format:
     *                        {
     *                            "movieName" : "string"
     *                            "movieFar" : "string"
     *                            "movieTime" : "string"
     *                            "imgSrc" : "string"
     *                            "imgAlt" : "string"
     *                            "rating" : number
     *                            "review" : "string"
     *                            "id" : num representing place in local storage
     *                        }
     */
     set data(data) {
        // if no data, return
        if (!data) return;
        const shadowDom = this.shadowRoot;
        update(data, shadowDom);

    }
}

/**
 * 
 * @param {*} data 
 * @param {*} shadowDom 
 * 
 * This function gets the article associated with the shadow and then calls innerHTML on it
 * The generation will create the page with a progress bar representing true or false on if the
 * episode is watched or not
 * 
 * Then, createActionListeners is called to generate listerners for the buttons created
 * 
 */
function update(data, shadowDom){
    let article = shadowDom.querySelector('article');
    article.innerHTML = generatedInnerHTML(data);
    CreateActionListeners(data, shadowDom);
    currentInd = data.id;
}

/**
 * 
 * @param {data passed in to expandedShowCard} data 
 * @param {shadowDom associated with current object} shadowDom 
 * 
 * Creates action listener for the trash button
 */
function CreateActionListeners(data, shadowDom) {
    /**
     * Sets action listener for the trash button, which lets you delete only
     * the current entry
     * 
     * When you confirm the deletion, you are immediately redirected to the home page
     * The entry is deleted from localStorage, and all ids for the remaining cards are updated
     * to be continuous
     * Then they are saved to localStorage again
     */
    let editbutton = shadowDom.getElementById("editbutton");
    editbutton.addEventListener('click', () => {
        window.location.href = `./add-content.html?ind=${data['id']}`;
    });

    let trashButton = shadowDom.getElementById("trashbutton");
    trashButton.addEventListener("click", function() {
        if(confirm("Are you sure you want to delete this entry?")) {
            let ind = currentInd;
            let cards = getShowsFromStorage();

            //edge case if there's only one show right now
            if(cards.length == 1) {
                localStorage.removeItem('shows');
                window.location.href = '../../index.html';
                return;
            }

            //removes current entry
            cards.splice(ind, 1);

            //after you splice the cards, you must update the ids for each
            for(let i = 0; i < cards.length; i++) {
                cards[i].id = i;
            }

            //saves the new array (without the deleted entry) to localStorage
            saveShowsToStorage(cards);

            //redirects you to the home page
            window.location.href = '../../index.html';
        }
        else {
            return;
        }
    ;});

    let cards = getShowsFromStorage();
    
    let progressSlider = shadowDom.getElementById('myRange');

    progressSlider.addEventListener('change', () => {
        data.movieFar = progressSlider.value;
        cards[data.id] = data;
    // update local storage
        saveShowsToStorage(cards);
    });

    let progressVal = shadowDom.getElementById("slideVal");
    progressSlider.oninput = function () {
        progressVal.innerHTML = `${this.value}/${data.movieTime}`;
    }
}

/**
 * 
 * @param {a reference to the movie data object} data 
 * @returns 
 */
function generatedInnerHTML(data){
    if(data.imgSrc == "./assets/img/icons/bingetracker_logo.png"){
        data.imgSrc = "../img/icons/bingetracker_logo.png";
    }

    let innerHTML =
                `<div id="outerbox">
                    <div class="topmovieheader"> 
                        <div class="half"><h4 id="movieheader">Movie</h4></div>
                        <div class="half"><a href="../../index.html"><button id="homebutton">
                            <img height="35em" src="../img/icons/home.png"></img>
                        </button></a></div>
                    </div>
                    <div id="innerbox">
                        <div id="movieandinfo">
                            <img id="movieimage" src=${data.imgSrc} alt=${data.imgAlt} height="240 em">
                            <div id="info">
                                <div id="titleandbuttons"> 
                                    <p class="title">Name: ${data.movieName}</p>
                                    <div id="buttons">
                                    <button id="editbutton">
                                        <img height="27em" src="../img/icons/edit.png"></img>
                                    </button>
                                        <button id="trashbutton">
                                            <img height="27em" src="../img/icons/trash.png">
                                            </img>
                                        </button>
                                    </div>
                                </div>
                                <div class="rating">Rating: ${data.rating}/5</div>
                                <div class="comments">Comments:</div>
                                <textarea cols="38" rows="5" disabled> ${data.review}</textarea>
                            </div>
                        </div>
                        <div>
                        <h2 id="progressheader">Progress: </h2>
                        <span id="slideVal"> ${data.movieFar}/${data.movieTime} </span> <br>
                        <input type="range" min="0" max=${data.movieTime} value=${data.movieFar} class="slider" id="myRange">
                        </div>
                </div>`
                return innerHTML;
}

customElements.define("expanded-movie-card", expandedMovieCard);