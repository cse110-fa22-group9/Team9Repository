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

        style.textContent = `
        * {
          font-family: sans-serif;
          margin: 0px;
          padding: 0px;
        }
      
        a {
          top: 10px;
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
          /*margin: 0px 0px 0px 0px;*/
          margin-top: 20px !important;
          justify-content: flex-end;
          position:static;
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        }

        article:hover {
          box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
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
          background: #adadad;
          height: 50%;
          width: auto;
          margin-top: auto;
          margin-bottom:auto;
          flex: 1;
        }

        .show-info {
          display: flex;
          flex-direction: column;
          margin-right: 0px;
          padding-left: 10px;
          padding-top: 20px;
          justify-content:flex-start;
          flex: 2;
        }

        div.modification {
          padding-right: 5px;
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
        .seasons {
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
                            <div class="show-info">
                              <p class="title">
                                  <a href="./assets/pages/movie-show-subpage.html?ind=${data['id']}">
                                      ${data['showTitle']}
                                  </a>
                              </p>
                              <div class="rating">
                                  <img src="./assets/img/icons/${data['rating']}-star.svg" alt="${data['rating']} stars">
                              </div>
                              <p class="season"> ${data['episodeArray'].length} Season(s) Total </p>
                              <!--<p class="review">
                                  Review: ${data['review']}
                              </p>-->
                            </div>
                            <div class="modification">
                              <a href="./assets/pages/add-content.html?ind=${data['id']}"><i style='font-size:24px' class='fas'>&#xf044;</i></i></a>
                            </div>`;
    }
}

customElements.define("small-show-card", smallShowCard);