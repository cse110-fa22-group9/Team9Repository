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

        article.innerHTML = `<p class="title">${data.showTitle}</p>
                             <img src=${data.imgSrc} alt=${data.imgAlt}>
                             <p class="watched">${data.episodesWatched}/${data.numEpisodes}</p>
                             <p class="rating">${data.rating}/5</p>
                             <p class="comments">${data.comments}</p>`;
    }
}

customElements.define("expanded-show-card", expandedShowCard);