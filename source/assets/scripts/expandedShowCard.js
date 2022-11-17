/**
 * File Header: expandedShowCard.js
 * 
 * Creates the class for the expanded show card
 * **mostly copied over from lab 6 recipeCard.js**
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
 */

//importing functions from tools.js
import {getShowsFromStorage} from './tools.js';
import {saveShowsToStorage} from './tools.js';

 class expandedShowCard extends HTMLElement {
    /**
     * Construct a expandedShowCard element
     */
    constructor() {
        super();

        let shadow = this.attachShadow({ mode: "open" });
        let article = document.createElement('article');
        let style = document.createElement('style');

        //style.textContent = `` -- TODO: decide on style later

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
     * @param {Object} data - The data to pass into the <expanded-show-card>, must be of the following format:
     *                        {
     *                            "showTitle" : "string"
     *                            "imgSrc" : "string"
     *                            "imgAlt" : "string"
     *                            "episodeArray": 2D array of booleans representing show and seasons
     *                            "rating" : number
     *                            "comments" : "string"
     *                            "id": number
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
 * 
 * @param {*} data 
 * @param {*} seasonNumber 
 * @param {*} shadowDom 
 * 
 * This function gets the article associated with the shadow and then calls innerHTML on it
 * The generation will create the page with season buttons and checkboxes representing true or false on if the
 * episode is watched or not
 * 
 * Then, createActionListeners is called to generate listerners for the buttons and checkboxes created
 * 
 * This function is called everytime a season button is selected
 */

function update(data, seasonNumber, shadowDom){
    let article = shadowDom.querySelector('article');
    article.innerHTML = generatedInnerHTML(data, seasonNumber);
    CreateActionListeners(data, seasonNumber, shadowDom);
}

/**
 * 
 * @param {data passed in to expandedShowCard} data 
 * @param {current Selected season} seasonNumber 
 * @param {shadowDom associated with current object} shadowDom 
 * 
 * This function takes in the current selected season (chosen by clicking a button) and then generates event listeners to 
 * switch seasons, if a season is clicked it will take update the current html to reflect the checkbox array for that season
 * 
 * For the checkboxes which are displayed depending on the season selected, event listeners are generated so that data.episodeArray
 * booleans are updated depending on if the checkboxes are checked or unchecked
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
        checkboxObject.addEventListener('change', () => {
            data.episodeArray[seasonNumber - 1][i] =  !data.episodeArray[seasonNumber - 1][i];
            cards[data.id] = data;
            // update local storge
            saveShowsToStorage(cards);
        })
    }
    
}

/**
 * 
 * @param {a reference to the show data object} data 
 * @param {the season number for the season where the episodes are currently being diplayed 
 * in the epsides section} seasonNumber 
 * @returns 
 */
function generatedInnerHTML(data, seasonNumber){
    let innerHTML =
                `<div> 
                    <h4 id="tvshowheader">TV Show</h4>
                    <button> + </button>
                    <h4>Add show</h4>
                </div>
                <img src=${data.imgSrc} alt=${data.imgAlt}>
                <div> 
                    <p class="title">Name: ${data.showTitle}</p>
                    <button>Edit </button>
                    <button>trash </button>
                </div>
                <p class="rating">Rating: ${data.rating}/5</p>
                <p class="comments">Comments: ${data.comments}</p>
                <h2 id="progressheader">Progress: </h2>` +
                generateSeasonsHTML(data.episodeArray) + 
                generateEpisodesForSeason(data.episodeArray[seasonNumber-1] ,seasonNumber);
                //+ `<p class="watched">${WatchedEpisodes(data.episodeArray)}/${TotalEpisodes(data.episodeArray)} episodes watched</p>`;
                return innerHTML;
}

/**
 * Generates a HTML string for the episodes section
 * @param {an array of booleans repersenting which episodes are watched in a season} episodes 
 * @param {the current season of the show being displayed} seasonNumber
 * @returns a HTML string used to generate the episodes section
 */
 function generateEpisodesForSeason(episodes, seasonNumber){
    let s = `<div>`;
    for(let i = 0; i < episodes.length; i++){
        let checked;
        episodes[i] ? checked= "checked" : checked = "";
        s += `<input type="checkbox" id="season_${seasonNumber}_episode_${i+1}_checkbox" ${checked} class="showBox"> </input>`;
    }
    s += `</div>`;
    return s;
}


// Example of an "episode array"
// Season 1: we watched epsiodes 1, 2, 4. Four total episodes.
// Season 2: we watched episodes 1, 3. Three total episodes. 
// episodes = [[true, true, false, true],[true, false, true]]

/**
 * Parameter is an episode array
 * Returns a string of HTML that generates multiple "progress bars" for each season
 * You can click through the top labels, each labeled "Season X", to switch between progress bars
 * Each bit of progress is marked by an image.
 */
function generateSeasonsHTML(episodes){
    let s = `<div>`;
    for(let i = 0; i < episodes.length; i++){
        s += `<button id="season_` + (i+1) + `_button" class="seasonButton">Season ` + (i+1) + `</button>`;
    }
    s += `</div>`;
    return s;
}



/** 
 * Returns the total number of episodes for the show, given an episode array
*/
function TotalEpisodes(episodes) {
    let count = 0;
    for(let i = 0; i < episodes.length; i++){
        count += episodes[i].length;
    }
    return count;
}

/** 
 * Returns the total number of episodes for the show that have been 
 * WATCHED (marked true), given an episode array
*/
function WatchedEpisodes(episodes){
    let count = 0;
    for(let i = 0; i < episodes.length; i++){
        for(let j = 0; j < episodes[i].length; j++){
            if(episodes[i][j]){
                count++;
            }
        }
    }
    return count;
}

customElements.define("expanded-show-card", expandedShowCard);