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
 * Displays the movie title, image, and progress made with the movie
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

        // style.textContent = ``  -- TODO: decide on style later
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
     *                        }
     */
    set data(data) {
        // If no data, return
        if (!data) return;

        const shadowDom = this.shadowRoot;
        let article = shadowDom.querySelector('article');

        // TODO: Implement a progress bar (probably implemented as a slider for movies?)

        article.innerHTML = `<h2 class="title">${data.movieTitle}</h2>
                             <img src=${data.imgSrc} alt=${data.imgAlt}>
                             <p class="amount watched>
                                <time class="progress">${data.progressMade}</time> of <time class="duration">${data.movieDuration}</time>
                             </p>
                             <p>TODO: add a progress bar</p>`;
    }
}

customElements.define("small-movie-card", smallMovieCard);