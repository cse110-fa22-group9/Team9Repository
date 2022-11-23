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
          background:#FFFFFF;
        }
      
        a {
          top: 5px;
          text-align: center;
          color: black;
          font-size: 22px;
          text-decoration: none;
        }
      
        a:hover {
          color: blue;
        }
      
        article {
          border: 1px solid rgb(223, 225, 229);
          border-radius: 5px;
          display: flex;
          grid-template-rows: 118px 56px 14px 18px 15px 36px;
          justify-content: space-between;
          height: 150px;
          width: 500px;
          margin-top: 20px !important;
          margin-left: 20px !important;
          position:static;
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5);
        }

        article:hover {
          box-shadow: 0 8px 16px 0 rgba(0,0,0,0.7);
        }
      
        div.rating {
          text-align: right;
          column-gap: 0px;
          display: flex;
        }
      
        div.rating>img {
          height: 100%;
          display: inline-block;
          object-fit: scale-down;
          width: 78px;
          margin-top: 10px;
        }

        .modification {
          padding-right: 0px;
          margin-top: 0px;
        }

        .modification img {
          height: 10%;
          object-fit: contain;
          width: 25px;
        }
      
        article>img {
          object-fit: contain;
          height: auto;
          width: 50%;
          flex: 1;
        }

        .movie-info {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          margin-right: 0px;
          padding-left: 10px;
          flex: 2;
        }

        p.title {
          display: -webkit-box;
          font-size: 20px;
          height: 36px;
          line-height: 18px;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      
        p:not(.title),
        span,
        time {
          flex: 1;
          color: #70757A;
          font-size: 12px;
        }

        progress[value]::-webkit-progress-bar {
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
          width: 100%;
          height: 8px;
        }

        `;
        
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
                            <div class="movie-info">
                              <p class="title">
                                  <br>
                                  <a href="./assets/pages/movie-show-subpage.html?ind=${data['id']}">${data['movieName']}</a>
                              </p>
                              <div class="rating">
                                  <img src="./assets/img/icons/${data['rating']}-star.svg" alt="${data['rating']} stars">
                              </div>
                              <br>
                              <label for="progress"></label>
                              <progress id="progress" value="${data['movieFar']}" max="${data['movieTime']}"> 32% </progress>
                              <time>${data['movieFar']} min / ${data['movieTime']} min</time>
                            </div>
                            <div class="modification">
                              <a href="./assets/pages/add-content.html?ind=${data['id']}">
                                  <img src="./assets/img/icons/Edit.svg" alt="edit">
                              </a>
                            </div>
                            `;
    }
}

customElements.define('small-movie-card', smallMovieCard);