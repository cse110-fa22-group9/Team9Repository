/**
 * File Header: smallMovieCard.js
 * 
 * Creates the class for the small movie card
 * **mostly copied over from lab 6 recipeCard.js**
 */

//importing functions from tools.js
import {getShowsFromStorage} from './tools.js';
import {saveShowsToStorage} from './tools.js';


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

        style.textContent = `
        * {
          font-family: sans-serif;
          margin: 0;
          padding: 0;
        }
      
        a {
          text-decoration: none;
        }
      
        a:hover {
          text-decoration: underline;
        }
      
        article {
          align-items: center;
          border: 1px solid rgb(223, 225, 229);
          border-radius: 8px;
          display: grid;
          grid-template-rows: 118px 56px 14px 18px 15px 36px;
          height: auto;
          row-gap: 5px;
          padding: 0 16px 16px 16px;
          width: 178px;
        }
      
        div.rating {
          align-items: center;
          column-gap: 5px;
          display: flex;
        }
      
        div.rating>img {
          height: auto;
          display: inline-block;
          object-fit: scale-down;
          width: 78px;
        }
      
        article>img {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          height: 118px;
          object-fit: cover;
          margin-left: -16px;
          width: calc(100% + 32px);
        }
      
        p.ingredients {
          height: 32px;
          line-height: 16px;
          padding-top: 4px;
          overflow: hidden;
        }
      
        p.organization {
          color: black !important;
        }
      
        p.title {
          display: -webkit-box;
          font-size: 16px;
          height: 36px;
          line-height: 18px;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      
        p:not(.title),
        span,
        time {
          color: #70757A;
          font-size: 12px;
        }`;
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
        if (!data) return;

        const shadowDom = this.shadowRoot;
        let article = shadowDom.querySelector('article');

        // TODO: Implement a progress bar (probably implemented as a slider for movies?)

        article.innerHTML =`<img src="${data['imgSrc']}"
                                alt="movieSrc">
                            <p class="title">
                                <a href="./assets/pages/movie-show-subpage.html?ind=${data['id']}">
                                    ${data['movieName']}
                                </a>
                            </p>
                            <div class="rating">
                                <img src="./assets/img/icons/${data['rating']}-star.svg" alt="${data['rating']} stars">
                            </div>
                            <time>${data['movieFar']} min / ${data['movieTime']} min</time>
                            <p class="review">
                                Review: ${data['review']}
                            </p>
                            <a href="./assets/pages/add-content.html?ind=${data['id']}">Edit Movie</a>`;
    }
}

customElements.define('small-movie-card', smallMovieCard);