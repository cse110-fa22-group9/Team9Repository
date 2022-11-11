/**
 * File Header: smallMovieCard.js
 * 
 * Creates the class for the small movie card
 * **mostly copied over from lab 6 recipeCard.js**
 */

/**
 * Class Header: smallMovieCard
 * 
 * A small movie card that previews information about movies on the user's watch list
 * 
 * data() - sets the movie card data with the information provided from the data object
 */
class smallMovieCard extends HTMLElement {
    /**
     * Construct a smallMovieCard element
     */
    constructor() {
        super();

        let shadow = this.attachShadow({ mode: "open"});
        let article = document.createElement('article');
        let style = document.createElement('style');

        // style.textContent = ``  -- decide on style later
        shadow.append(article);
        shadow.append(style);
    }

    /**
     * Called when the .data property is set on this element
     * 
     * For example:
     * let smallMovieCard = document.createElement('small-movie-card'); // Calls constructor()
     * smallMovieCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
     * 
     * expandedMovieCard and smallMovieCard get data from same data object, smallMovieCard just uses part of the data
     * 
     * @param {Object} data - The data to pass into the <small-movie-card>, must be of the following format:
     *                        {
     *                            "movieTitle" : "string"
     *                            "imgSrc" : "string"
     *                            "imgAlt" : "string"
     *                            "movieDuration" : "string"
     *                            "progressMade" : "string"
     *                            "rating" : number
     *                            "comments" : "string"
     *                        }
     */
    set data(data) {
        // If no data, return
        if (!data) return;

        const shadowDom = this.shadowRoot;
        let article = shadowDom.querySelector('article');

        article.innerHTML = `<p class="title">${data.movieTitle}</p>
                             <img src=${data.imgSrc} alt=${data.imgAlt}>
                             <time class="duration">${data.movieDuration}</time>
                             <time class="progress">${data.progressMade}</time>`;
    }
}

customElements.define("small-movie-card", smallMovieCard);