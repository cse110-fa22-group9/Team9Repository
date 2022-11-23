/**
 * File Header: expandedMovieCard.js
 * 
 * Creates the class for the expanded movie card
 * **mostly copied over from lab 6 recipeCard.js**
 */

/**
 * Class Header: expandedMovieCard
 * 
 * When clicking on a small movie card, it expands and shows more detailed information about the show
 * Displays the movie title, image, progress, rating, and comments
 * 
 * data() - sets the movie card data with the information provided from the data object
 */
 class expandedMovieCard extends HTMLElement {
    /**
     * Construct a expandedMovieCard element
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
     * let expandedMovieCard = document.createElement('expanded-movie-card'); // Calls constructor()
     * expandedMovieCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
     * 
     * expandedMovieCard and smallMovieCard get data from same data object, smallMovieCard just uses part of the data
     * expandedMovieCard theoretically can just take a copy of the data object in the smallMovieCard
     * 
     * @param {Object} data - The data to pass into the <expanded-movie-card>, must be of the following format:
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

        // TODO: Implement a progress bar (no "season" indicator needed for movies)

        article.innerHTML = `<p class="title">${data.movieTitle}</p>
                             <img src=${data.imgSrc} alt=${data.imgAlt}>
                             <time class="duration">${data.movieDuration}</time>
                             <time class="progress">${data.progressMade}</time>
                             <p class="rating">${data.rating}/5</p>
                             <p class="comments">${data.comments}</p>`;

    }
}

customElements.define("expanded-movie-card", expandedMovieCard);