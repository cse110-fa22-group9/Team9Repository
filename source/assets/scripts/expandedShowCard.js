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
     *                            "numEpisodes" : number
     *                            "episodesWatched" : number
     *                            "rating" : number
     *                            "comments" : "string"
     *                        }
     */
    set data(data) {
        // if no data, return
        if (!data) return;

        const shadowDom = this.shadowRoot;
        let article = shadowDom.querySelector('article');

        // TODO: add js for a progress bar
        // TODO: Figure out how to implement the "season" indicator, or if we're even going to do it

        article.innerHTML = `   
                            <div> 
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
                            generateSeasonsHTML(data.episodeArray)
                            + `<p class="watched">${WatchedEpisodes(data.episodeArray)}/${TotalEpisodes(data.episodeArray)} episodes watched</p>`;
    }

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
    for(var i = 0; i < episodes.length; i++){
        s += `<button id="season_` + (i+1) + `_button">Season ` + (i+1) + `</button>`;
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