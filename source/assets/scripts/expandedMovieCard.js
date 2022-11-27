
import {getShowsFromStorage} from './tools.js';
import {saveShowsToStorage} from './tools.js';/**
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
     *                            "movieName" : "string"
     *                            "imgSrc" : "string"
     *                            "imgAlt" : "string"
     *                            "movieTime" : "string"
     *                            "movieFar" : "string"
     *                            "rating" : number
     *                            "review" : "string"
     *                            "id" : number
     *                        }
     */
    
    set data(data) {
        // If no data, return
        if (!data) return;

        const shadowDom = this.shadowRoot;
        let article = shadowDom.querySelector('article');
        let cards = getShowsFromStorage();

        // TODO: Implement a progress bar (no "season" indicator needed for movies)

        article.innerHTML = `
                            <div class="toptvshowheader"> 
                                <div class="half"><h4 id="tvshowheader">TV Show</h4></div>
                                <div class="half"><a href="../../index.html"><button id="homebutton">
                                    <img height="35em" src="../img/icons/home.png"></img>
                                </button></a></div>
                            </div>
        
                            <p class="title">${data.movieName}</p>
                            <div id="buttons">
                                <a href="./add-content.html?ind=${data['id']}" id="editLink">
                                    <button id="editbutton">
                                        <img height="27em" src="../img/icons/edit.png"></img>
                                    </button>
                                </a>
                                <button id="trashbutton">
                                    <img height="27em" src="../img/icons/trash.png"></img>
                                </button>
                            </div>
                            <img src=${data.imgSrc} alt=${data.imgAlt}>
                            <time class="duration">${data.movieTime}</time>
                            <time class="progress">${data.movieFar}</time>
                            <p class="rating">${data.rating}/5</p>
                            <p class="comments">${data.review}</p>`;

        let trashButton = shadowDom.getElementById(`trashbutton`);
        trashButton.addEventListener('click', () => {
            cards.splice(data.id, 1);
            saveShowsToStorage(cards);
            window.location.href="./../../index.html";
        });
    }

}

customElements.define("expanded-movie-card", expandedMovieCard);