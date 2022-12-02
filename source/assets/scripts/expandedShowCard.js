/**
 * File Header: expandedShowCard.js
 * 
 * Creates the class for the expanded show card
 */

/**
 * Class Header: expandedShowCard
 * 
 * A expanded show card that previews information about show on the user's watch list
 * Appears when you click on the small show card
 * Displays the show title, an image, rating, comments, and the progress the user made in the show,
 * along with the current season the user is on
 * 
 * data() - sets the show card data with the information provided from the data object
 * update() - updates page to show selected season
 * CreateActionListeners() - Generates listeners to listen for user switching seasons and checking/unchecking episodes
 * generatedInnerHTML() - Generates string representing innerHTML of expandedShowCard element
 * 
 */

//importing functions from tools.js
import {getShowsFromStorage} from './tools.js';
import {saveShowsToStorage} from './tools.js';

//this variable is used to get the current card's id
var currentInd;

class expandedShowCard extends HTMLElement {
    /**
     * Construct a expandedShowCard element
     * @constructor
     */
    constructor() {
        super();

        let shadow = this.attachShadow({ mode: "open" });
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

        .toptvshowheader {
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

        #tvshowheader {
            color: white;
            margin-left: 1em;
        }

        #innerbox {
            background-color: rgb(17, 151, 157);
            padding: 0.7em 0.7em 0.7em 0.7em;
        }

        #showandinfo {
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

        #progressheader {
            font-family: 'Oswald', sans-serif;
            margin-top: 0.3em;
            margin-bottom: 0em;
            color: white;
            font-weight: normal;
            font-size: 1.75em;
        }

        #seasonbuttons {
            padding: 0;
            height: 100%;
        }

        .currentSeasonButton{
            width: 13em;
            height: 3em;
            background-color: rgb(5, 94, 98);
            color: white;
            border: none;
            padding: 0;
            outline: none;
            vertical-align: text-bottom;
        }

        .seasonButton{
            width: 6.5em;
            height: 2.5em;
            background-color: rgb(1, 107, 112);
            color: white;
            border: none;
            padding: 0;
            outline: none;
            vertical-align: text-bottom;
        }

        #episodesDiv{
            background-color: rgb(219, 253, 255);
            padding-top: 1em;
            padding-right: 1em;
            padding-bottom: 3em;
            padding-left: 1em;
        }

        .showBoxChecked{
            background-color: rgb(12, 167, 137);
            width: 6.5em;
            height: 2.5em;
            border-style: solid;
            padding: 0;
        }

        .showBoxUnchecked{
            background-color: white;
            width: 6.5em;
            height: 2.5em;
            border-style: solid;
            padding: 0;
        }
        `;

        shadow.append(article);
        shadow.append(style);
    }

    /**
     * Called when the .data property is set on this element
     * 
     * For example:
     * let expandedShowCard = document.createElement('small-show-card'); // Calls constructor()
     * expandedShowCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
     * 
     * expandedShowCard and smallShowCard get data from same data object, smallShowCard just uses part of the data
     * 
     * @function
     * @param {Object} data - The data to pass into the <expanded-show-card>, must be of the following format:
     *                        {
     *                            "episodeArray": 2D array of booleans representing episodes per season and whether they have been watched
     *                            "id" : num representing place in local storage
     *                            "imgSrc" : "string"
     *                            "imgAlt" : "string"
     *                            "movie" : boolean representing whether or not item is a move
     *                            "rating" : number
     *                            "review" : "string"
     *                            "showTitle" : "string"
     *                        }
     */
    set data(data) {
        // if no data, return
        if (!data) return;
        const shadowDom = this.shadowRoot;
        update(data,  1, shadowDom);

    }

}

/**
 * This function gets the article associated with the shadow and then calls innerHTML on it
 * The generation will create the page with season buttons and checkboxes representing true or false on if the
 * episode is watched or not
 * 
 * Then, createActionListeners is called to generate listeners for the buttons and checkboxes created
 * 
 * This function is called everytime a season button is selected
 * 
 * @function
 * @param {Object} data - data passed in to expandedShowCard
 * @param {number} seasonNumber - the current selected season 
 * @param {*} shadowDom - shadowDOM associated with current object
 */

function update(data, seasonNumber, shadowDom){
    let article = shadowDom.querySelector('article');
    article.innerHTML = generatedInnerHTML(data, seasonNumber);
    CreateActionListeners(data, seasonNumber, shadowDom);
    currentInd = data.id;
}

/**
 * This function takes in the current selected season (chosen by clicking a button) and then generates event listeners to 
 * switch seasons, if a season is clicked it will take update the current html to reflect the checkbox array for that season
 * 
 * For the checkboxes which are displayed depending on the season selected, event listeners are generated so that data.episodeArray
 * booleans are updated depending on if the checkboxes are checked or unchecked
 * 
 * @function
 * @param {Object} data - data passed in to expandedShowCard
 * @param {number} seasonNumber - current selected season 
 * @param {*} shadowDom - shadowDOM associated with current object 
 * 
 */
function CreateActionListeners(data, seasonNumber, shadowDom){
    for(let i = 0; i < data.episodeArray.length; i++){
        let currNum = i + 1;
        let seasonObject = shadowDom.getElementById(`season_` + (currNum) + `_button`);
        seasonObject.addEventListener('click', () => {
            update(data, currNum, shadowDom);
        });
    }

    // get local storge
    let cards = getShowsFromStorage();

    for(let i = 0; i < data.episodeArray[seasonNumber - 1].length; i++){
        let checkboxObject = shadowDom.getElementById(`season_${seasonNumber}_episode_${i+1}_checkbox`);
        checkboxObject.addEventListener('click', () => {
            data.episodeArray[seasonNumber - 1][i] =  !data.episodeArray[seasonNumber - 1][i];
            
            //toggle the display class
            if(data.episodeArray[seasonNumber - 1][i]){ //checked
                checkboxObject.classList.remove("showBoxUnchecked");
                checkboxObject.classList.add("showBoxChecked");
            }else{ //unchecked
                checkboxObject.classList.remove("showBoxChecked");
                checkboxObject.classList.add("showBoxUnchecked");
            }
            cards[data.id] = data;
            // update local storge
            saveShowsToStorage(cards);
        })
    };

    let editbutton = shadowDom.getElementById("editbutton");
    editbutton.addEventListener('click', () => {
        window.location.href = `./add-content.html?ind=${data['id']}`;
    });

    /**
     * Sets action listener for the trash button, which lets you delete only
     * the current entry
     * 
     * When you confirm the deletion, you are immediately redirected to the home page
     * The entry is deleted from localStorage, and all ids for the remaining cards are updated
     * to be continuous
     * Then they are saved to localStorage again
     */
    let trashButton = shadowDom.getElementById("trashbutton");
    trashButton.addEventListener("click", function() {
        if(confirm("Are you sure you want to delete this entry?")) {
            let ind = currentInd;
            let cards = getShowsFromStorage();

            //edge case if there's only one show right now, deletes localStorage entirely
            if(cards.length == 1) {
                localStorage.removeItem('shows');
                window.location.href = '../../index.html';
                return;
            }

            //if there's more than one entry, removes current entry
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
}

/**
 * Generates string representing innerHTML of expandedShowCard element
 * 
 * @function
 * @param {Object} data - data passed in to expandedShowCard
 * @param {number} seasonNumber - the current selected season 
 * @returns {string} string representing the innerHTML of the expandedShowCard
 */
function generatedInnerHTML(data, seasonNumber){
    if(data.imgSrc == "./assets/img/icons/bingetracker_logo.png"){
        data.imgSrc = "../img/icons/bingetracker_logo.png";
    }

    let innerHTML =
                `<div id="outerbox">
                    <div class="toptvshowheader"> 
                        <div class="half"><h4 id="tvshowheader">TV Show</h4></div>
                        <div class="half"><a href="../../index.html"><button id="homebutton">
                            <img height="35em" src="../img/icons/home.png"></img>
                        </button></a></div>
                    </div>
                    <div id="innerbox">
                        <div id="showandinfo">
                            <img id="showimage" src=${data.imgSrc} alt=${data.imgAlt} height="240 em">
                            <div id="info">
                                <div id="titleandbuttons"> 
                                    <p class="title">Name: ${data.showTitle}</p>
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
                        <h2 id="progressheader">Progress: </h2>` +
                        generateSeasonsHTML(data.episodeArray, seasonNumber) + 
                        generateEpisodesForSeason(data.episodeArray[seasonNumber-1] ,seasonNumber) +
                        `</div>
                </div>`
                return innerHTML;
}
//<div class="comments">Comments: ${data.review}</div>

/**
 * Generates a HTML string for the episodes section
 * 
 * @function
 * @param {Array} episodes - an array of booleans representing which episodes are watched in a season
 * @param {number} seasonNumber - the current selected season
 * @returns a HTML string used to generate the episodes section
 */
 function generateEpisodesForSeason(episodes, seasonNumber){
    let s = `<div id="episodesDiv">`;
    for(let i = 0; i < episodes.length; i++){
        let checked;
        episodes[i] ? checked= "showBoxChecked" : checked = "showBoxUnchecked";
        s += `<button id="season_${seasonNumber}_episode_${i+1}_checkbox" class="${checked}"> ${i+1} </button>`;
    }
    s += `</div>`;
    return s;
}


// Example of an "episode array"
// Season 1: we watched epsiodes 1, 2, 4. Four total episodes.
// Season 2: we watched episodes 1, 3. Three total episodes. 
// episodes = [[true, true, false, true],[true, false, true]]

/**
 * Returns a string of HTML that generates multiple "progress bars" for each season
 * You can click through the top labels, each labeled "Season X", to switch between progress bars
 * Each bit of progress is marked by an image.
 * 
 * @function
 * @param {Array} episodes - an array of booleans representing the episodes in each season and whether or not they have been watched
 * @param {number} seasonNumber - the current selected season
 * @return a string representing the HTML for progress bars for each season
 */
function generateSeasonsHTML(episodes, seasonNumber){
    let s = `<div id="seasonbuttons">`;
    for(let i = 0; i < episodes.length; i++){
        s += `<button id="season_` + (i+1) + `_button" class="${seasonNumber == (i+1) ? "currentSeasonButton" : "seasonButton"}">Season ` + (i+1) + `</button>`;
    }
    s += `</div>`;
    return s;
}

customElements.define("expanded-show-card", expandedShowCard);