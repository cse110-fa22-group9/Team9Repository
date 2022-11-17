//importing functions from tools.js
import {getShowsFromStorage} from './tools.js';
import {saveShowsToStorage} from './tools.js';


// Binding initialization function to document listener
window.addEventListener('DOMContentLoaded', init);

// input: None
// Output: None
// Operations: when the user click the submit button, insert new movie into local storage
// by calling initFormHandler()
function init() {
    let queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ind = urlParams.get('ind')
    if (ind != null) {
        editFormHandler(ind);
    } else {
        initFormHandler();
    }
    
}

function editFormHandler(ind) {

    const contentSelection = document.getElementById("contentSelection");
    const formSelectorMovie = document.getElementById('new-movie');
    const formSelectorShow = document.getElementById('new-show');
    const seasonsNumber = document.getElementById("totalSeasons");
    const episodeField = document.getElementById('episodeFill');

    let card = getShowsFromStorage();

    //Check if we are eidt movie or show
    if(!(card[ind]['movie'])){
        formSelectorMovie.hidden = true;
        formSelectorShow.hidden = false;
        // change contentSelection to show and hidden movie
        contentSelection.value = 'show';
        const selectMovie = document.getElementById("selectMovie");
        selectMovie.hidden = true;
        // fill in movie name
        const showTitle = document.getElementById('showTitle');
        showTitle.value = `${card[ind]['showTitle']}`;
        // fill in imgSrc
        const imgSrc = document.getElementById('imgSrc-Show');
        imgSrc.value = `${card[ind]['imgSrc']}`;
        // recreate episodes bar
        for(let i = 0; i< card[ind]['episodeArray'].length;  i++){
            episodeField.innerHTML += `<label for="season${i+1}Episodes"> Episodes in season ${i+1}:
                                    <input type="number" id="season${i+1}Episodes" name = "episodes" required>
                                    </label> <br>` ;
        }
        // fill in number of episode for each season
        for(let i = 0; i< card[ind]['episodeArray'].length;  i++){
            const season = document.getElementById(`season${i+1}Episodes`);
            season.value = card[ind]['episodeArray'][i].length;
        }

        // fill in label
        const label0 = document.getElementById('rating-0-Show');
        const label1 = document.getElementById('rating-1-Show');
        const label2 = document.getElementById('rating-2-Show');
        const label3 = document.getElementById('rating-3-Show');
        const label4 = document.getElementById('rating-4-Show');
        const label5 = document.getElementById('rating-5-Show');

        if (card[ind]['rating'] == 0) {label0.click();}
        else if (card[ind]['rating'] == 1) {label1.click();}
        else if (card[ind]['rating'] == 2) {label2.click();}
        else if (card[ind]['rating'] == 3) {label3.click();}
        else if (card[ind]['rating'] == 4) {label4.click();}
        else {label5.click();}
        // fill in review
        const review = document.getElementById('review');
        review.value = `${card[ind]['review']}`;
        // change inner Text to edit
        const movieSubmit = document.getElementById('showSubmit');
        movieSubmit.innerText = 'Edit Show';

    } else {
        formSelectorMovie.hidden = false;
        formSelectorShow.hidden = true;
        // change contentSelection to movie and hidden show
        contentSelection.value = 'movie';
        const selectShow = document.getElementById("selectShow");
        selectShow.hidden = true;
        // fill in movie name
        const movieName = document.getElementById('movieName');
        movieName.value = `${card[ind]['movieName']}`;
        // fill in imgSrc
        const imgSrc = document.getElementById('imgSrc-Movie');
        imgSrc.value = `${card[ind]['imgSrc']}`;
        // fill in movieTime
        const movieTime = document.getElementById('movieTime');
        movieTime.value = `${card[ind]['movieTime']}`;
        // fill in movieFar
        const movieFar = document.getElementById('movieFar');
        movieFar.value = `${card[ind]['movieFar']}`;
        // fill in label
        const label0 = document.getElementById('rating-0-Movie');
        const label1 = document.getElementById('rating-1-Movie');
        const label2 = document.getElementById('rating-2-Movie');
        const label3 = document.getElementById('rating-3-Movie');
        const label4 = document.getElementById('rating-4-Movie');
        const label5 = document.getElementById('rating-5-Movie');

        if (card[ind]['rating'] == 0) {label0.click();}
        else if (card[ind]['rating'] == 1) {label1.click();}
        else if (card[ind]['rating'] == 2) {label2.click();}
        else if (card[ind]['rating'] == 3) {label3.click();}
        else if (card[ind]['rating'] == 4) {label4.click();}
        else {label5.click();}
        // fill in review
        const review = document.getElementById('review-Movie');
        review.value = `${card[ind]['review']}`;
        // change inner Text to edit
        const movieSubmit = document.getElementById('movieSubmit');
        movieSubmit.innerText = 'Edit Movie';
    }

    /**
     * Once the season number is changed number inputs for the amount of episodes
     * appear based on the inputted number of seasons
     */
    seasonsNumber.addEventListener('change',() => {
        episodeField.innerHTML = "";
        for(let i = 0; i< seasonsNumber.value;  i++){

            episodeField.innerHTML += `<label for="season${i+1}Episodes"> Episodes in season ${i+1}:
                                    <input type="number" id="season${i+1}Episodes" name = "episodes" required>
                                    </label> <br>` ;
        }
    })


    //These lines get the two respective buttons for movie and show submit
    const submitSelectorMovie = document.getElementById("movieSubmit");
    const submitSelectorShow = document.getElementById("showSubmit");
    
    submitSelectorMovie.addEventListener("click", editMovie);
    submitSelectorShow.addEventListener("click", editShow);
    
    /**
     * The function to create a movie object if that is the current form being
     * submitted
     */
    function editMovie() {
        const formData = new FormData(formSelectorMovie);
        let movieObject = {};
        for (const [key, value] of formData) {
            card[ind][key] = value;
        }
        movieObject["movie"] = true; 
        saveShowsToStorage(card);
    }
    
    /**
     * The insertShow function deals a little specially with being able to make
     * our 2D array to pass, it has an array "episodeArray" and array "toPush" 
     * Since "totalSeasons" isn't needed to create the expandedCard it's bypassed
     * Everytime an element with name "episodes" the function create false boolean
     * values which will represent unwatched episodes, and these are pushed to 
     * episode array to create a 2D array.
     * 
     * Small objects still need to be created from this currently
     * 
     * Once the objects are created, you are taken to the homepage
     */
    function editShow() {
        const formData = new FormData(formSelectorShow);
        let episodeArray = [];
        let toPush = [];
        //let smallShowObject = {};
        for (const [key, value] of formData) {
            //console.log("key: " + key);
            //console.log("value: " + value);
            if(key == "totalSeasons"){
                continue;
            }
            else if(key == "episodes"){
                //totalEpisodes += value;
                for(let i = 0; i < value; i++){
                    toPush.push(false);
                }
                episodeArray.push(toPush);
                toPush = []
                continue;
            }
            card[ind][key] = value;
        }


        card[ind]["imgAlt"] = card[ind]["showTitle"];
        card[ind]["episodeArray"] = episodeArray;

        /*expandShowObject["id"] = 
        //showObject["movie"] = false;
        //showObject["id"] = getIDFromStorage();
        console.log(expandShowObject);

        let expandedCard = document.createElement('expanded-show-card');
        expandedCard.data = expandShowObject;*/

        saveShowsToStorage(card);

        //window.location. = "http://127.0.0.1:5501/source/index.html";
    }


}


// input: None
// output: None
// Operation: when the user click the submit button, insert new movie into local storage
function initFormHandler() {

    const contentSelection = document.getElementById("contentSelection");
    const formSelectorMovie = document.getElementById('new-movie');
    const formSelectorShow = document.getElementById('new-show');
    const seasonsNumber = document.getElementById("totalSeasons");
    const episodeField = document.getElementById('episodeFill');

    /**
     * This event listener will check what
     */
    contentSelection.addEventListener('change', () =>{
        if(contentSelection.value == "show"){
            formSelectorMovie.hidden = true;
            formSelectorShow.hidden = false;
        }

        else{
            formSelectorMovie.hidden = false;
            formSelectorShow.hidden = true;
        }
    });

    /**
     * Once the season number is changed number inputs for the amount of episodes
     * appear based on the inputted number of seasons
     */
    seasonsNumber.addEventListener('change',() => {
        episodeField.innerHTML = "";
        for(let i = 0; i< seasonsNumber.value;  i++){

            episodeField.innerHTML += `<label for="season${i+1}Episodes"> Episodes in season ${i+1}:
                                    <input type="number" id="season${i+1}Episodes" name = "episodes" required>
                                    </label> <br>` ;
                                    
            ;
        }
    })


    //These lines get the two respective buttons for movie and show submit
    const submitSelectorMovie = document.getElementById("movieSubmit");
    const submitSelectorShow = document.getElementById("showSubmit");
    
    submitSelectorMovie.addEventListener("click", insertMovie);
    submitSelectorShow.addEventListener("click", insertShow);
    
    /**
     * The function to create a movie object if that is the current form being
     * submitted
     */
    function insertMovie() {
        const formData = new FormData(formSelectorMovie);
        let movieObject = {};
        for (const [key, value] of formData) {
            movieObject[key] = value;
        }


        movieObject["movie"] = true; 
        let movies = getShowsFromStorage();
        movieObject["id"] = movies.length;
        movies.push(movieObject);
        saveShowsToStorage(movies);
    }
    
    /**
     * The insertShow function deals a little specially with being able to make
     * our 2D array to pass, it has an array "episodeArray" and array "toPush" 
     * Since "totalSeasons" isn't needed to create the expandedCard it's bypassed
     * Everytime an element with name "episodes" the function create false boolean
     * values which will represent unwatched episodes, and these are pushed to 
     * episode array to create a 2D array.
     * 
     * Small objects still need to be created from this currently
     * 
     * Once the objects are created, you are taken to the homepage
     */
    function insertShow() {
        const formData = new FormData(formSelectorShow);
        let episodeArray = [];
        let toPush = [];
        let showObject = {};
        //let smallShowObject = {};
        for (const [key, value] of formData) {
            console.log("key: " + key);
            console.log("value: " + value);
            if(key == "totalSeasons"){
                continue;
            }
            else if(key == "episodes"){
                //totalEpisodes += value;
                for(let i = 0; i < value; i++){
                    toPush.push(false);
                }
                episodeArray.push(toPush);
                toPush = []
                continue;
            }
            showObject[key] = value;
        }


        showObject["imgAlt"] = showObject["showTitle"];
        showObject["episodeArray"] = episodeArray;
        showObject["movie"] = false;

        let shows = getShowsFromStorage();
        showObject["id"] = shows.length;
        shows.push(showObject);
        saveShowsToStorage(shows);

        //window.location. = "http://127.0.0.1:5501/source/index.html";
    }


}