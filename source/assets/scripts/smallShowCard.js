/**
 * File Header: smallShowCard.js
 * 
 * Creates the class for the small show card
 * **mostly copied over from lab 6 recipeCard.js**
 */

//importing functions from tools.js
import {getShowsFromStorage} from './tools.js';
import {saveShowsToStorage} from './tools.js';

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
     *                        }
     */
    set data(data) {
        // if no data, return
        if (!data) return;

        const shadowDom = this.shadowRoot;
        let article = shadowDom.querySelector('article');

        // TODO: add js for a progress bar

        article.innerHTML =`<img src="${data['imgSrc']}"
                                alt="showSrc">
                            <p class="title">
                                <a href="./assets/pages/movie-show-subpage.html?ind=${data['id']}">
                                    ${data['showTitle']}
                                </a>
                            </p>
                            <div class="rating">
                                <img src="./assets/img/icons/${data['rating']}-star.svg" alt="${data['rating']} stars">
                            </div>
                            <time> ${data['episodeArray'].length} Season(s) Total </time>
                            <p class="review">
                                Review: ${data['review']}
                            </p>
                            <a href="./assets/pages/add-content.html?ind=${data['id']}">Edit Show</a>`;
    }
}

customElements.define("small-show-card", smallShowCard);