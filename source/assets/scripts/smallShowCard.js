/**
 * File Header: smallShowCard.js
 * 
 * Creates the class for the small show card
 * **mostly copied over from lab 6 recipeCard.js**
 */

/**
 * Class Header: smallShowCard
 * 
 * A small show card that previews information about show on the user's watch list
 * Displays the show title, an image, and the progress the user made in the show
 * 
 * data() - sets the show card data with the information provided from the data object
 */
class smallShowCard extends HTMLElement {
    /**
     * Construct a smallShowCard element
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
     * let smallShowCard = document.createElement('small-show-card'); // Calls constructor()
     * smallShowCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
     * 
     * expandedShowCard and smallShowCard get data from same data object, smallShowCard just uses part of the data
     * 
     * @param {Object} data - The data to pass into the <small-show-card>, must be of the following format:
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

        // TODO: add js for checkmark-style progress bar

        article.innerHTML = `<p class="title">${data.showTitle}</p>
                             <img src=${data.imgSrc} alt=${data.imgAlt}>
                             <p class="watched">${data.episodesWatched}/${data.numEpisodes}</p>`;
    }
}

customElements.define("small-show-card", smallShowCard);