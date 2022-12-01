/**
 * File Header: smallShowCard.js
 * 
 * Creates the class for the small show card
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
 * set data() - sets the show card data with the information provided from the data object
 * get data() - returns the show card's data
 */
class smallShowCard extends HTMLElement {
    /**
     * Construct a smallShowCard element
     * @constructor
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
          background:#FFFFFF;
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
          margin-top: 20px !important;
          margin-left: 20px !important;
          justify-content: flex-end;
          position:static;
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5);
        }

        article:hover {
          box-shadow: 0 8px 16px 0 rgba(0,0,0,0.7);
        }
      
        div.rating {
          align-items: center;
          column-gap: 5px;
          display: flex;
        }
      
        div.rating>img {
          height: 100%;
          /*display: inline-block;*/
          object-fit: scale-down;
          width: 78px;
          margin-top: 5px;
        }

        .modification {
          padding-right: 0px;
          margin-top: 0px;
        }

        .modification img {
          height: 10%;
          object-fit: contain;
          width: 15px;
          margin-right: 0px;
        }

        article>img {
          object-fit: contain;
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
          position:relative; 
          top: -15px;
        }

        time {
          flex: 1;
          color: #70757A;
          font-size: 12px;
        }
        
        progress[value]::-webkit-progress-bar {
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
          width: 100%;
          height: 8px;
          margin-top:10px;
        }

        `;



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
     * @function
     * @param {Object} data - The data to pass into the <small-show-card>, must be of the following format:
     *                        {
     *                            "episodeArray": 2D array of booleans representing episodes per season and whether they have been watched
     *                            "imgSrc" : "string"
     *                            "imgAlt" : "string"
     *                            "movie" : boolean representing whether or not item is a move
     *                            "showTitle" : "string"
     *                            "rating" : number
     *                            "review" : "string"
     *                            "id" : num representing place in local storage
     *                        }
     */
    set data(data) {
        // if no data, return
        if (!data) return;

        this.json = data; // Store the data passed in for later

        const shadowDom = this.shadowRoot;
        let article = shadowDom.querySelector('article');

        // TODO: add js for a progress bar

        let watched = episodesWatched(data.episodeArray);
        let total = totalepisodeNum(data.episodeArray);

        article.innerHTML =`<img src="${data['imgSrc']}"
                                  alt="showSrc">
                            <div class="show-info">
                              <p class="title">
                                  <a href="./assets/pages/movie-show-subpage.html?ind=${data['id']}" id="expandedLink">
                                      ${data['showTitle']}
                                  </a>
                              </p>
                              <div class="rating">
                                  <img src="./assets/img/icons/${data['rating']}-star.svg" alt="${data['rating']} stars">
                              </div>
                              <label for="progress"></label>
                              <progress id="progress" value="${watched}" max="${total}"> 32% </progress>
                              <time>${watched} watched / ${total} total</time>
                              <p class="season"> ${data['episodeArray'].length} Season(s) Total </p>
                            </div>
                            
                            <div class="modification">
                              <a href="./assets/pages/add-content.html?ind=${data['id']}" id="editLink">
                                <img src="./assets/img/icons/Edit.svg" alt="edit">
                              </a>
                            </div>`;                            
    }

    /**
     * Returns the data set to the show card
     * @function
     * @return {Object} - small show card's data
     */
    get data() {
      return this.json;
    }
}

function totalepisodeNum(episodeArray){
  let sum = 0;
  for(let i = 0; i < episodeArray.length; i++){
    sum += episodeArray[i].length;
  } 
  return sum;
}

function episodesWatched(episodeArray){
  let sum = 0;
  for(let i = 0; i < episodeArray.length; i++){
    for(let j = 0; j < episodeArray[i].length; j++){
      if(episodeArray[i][j]){
        sum += 1;
      }
    }
  }
  return sum;
}

customElements.define("small-show-card", smallShowCard);