/**
 * File Header: addContent.js
 * 
 * Edit or insert a new movie or show to the local storge base on the from at 
 * add-content.html
 * 
 */

//importing functions from tools.js

import {getShowsFromStorage} from './tools.js';
import {saveShowsToStorage} from './tools.js';


// Binding initialization function to document listener
window.addEventListener('DOMContentLoaded', init);

/**
 * The init() function for the add-content.html. It will check if the calling link
 * has index or not. If have index then we are edit a exsit show and movie. Then we 
 * will calling editFormHandler with the corresponding index inside the link. If the
 * calling link doesn't have index then we are inserting a new movie or show to the
 * watch list. Then we will calling initFormHandler() to insert a new movie and show.
 * 
 * For example if the location is ./assets/pages/add-content.html?ind=0 Then the index
 * for the movie or show we want edit is 0. Then we will just called editformhandler(0)
 * to edit it.
 * 
 * @return none
 */
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

/**
 * Called when we want to edit an exsit show or movie. It will fill in the form with all the data
 * corresponding with the specfic show or movie with thier special index. When user click the submit
 * button it will update the new data to local stroge at corresponding index.
 * 
 * For example:
 * editFormHandler(0) will fill in the from with the data at local storge has index 0
 * 
 * 
 * @param ind - The index value for the Movie or Show
 * @return none
 */
function editFormHandler(ind) {
    // get element form html
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
        const totalSeasons = document.getElementById('totalSeasons');
        totalSeasons.value = `${card[ind]['episodeArray'].length}`;

        for(let i = 0; i< card[ind]['episodeArray'].length;  i++){
            episodeField.innerHTML += `<label for="season${i+1}Episodes"> Episodes in season ${i+1}:
                                    <input type="number" id="season${i+1}Episodes" name = "episodes" min="0" max="10000" required>
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

    
    // Once the season number is changed number inputs for the amount of episodes
    // appear based on the inputted number of seasons
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
     * Update the edit data to local storge with the corresponding index.
     * 
     * @return None
     */
    function editMovie() {
        const formData = new FormData(formSelectorMovie);
        let movieObject = {};
        let canSubmit = true;
        for (const [key, value] of formData) {
            card[ind][key] = value;
            if (key == "movieName" && value == "") {
                canSubmit = false;
            }
            if (key == "imgSrc" && value == "") {
                canSubmit = false;
            }
            if (key == "movieTime" && (value == "" || parseInt(value) < 0)) {
                canSubmit = false;
            }
            if (key == "movieFar" && (value == "" || parseInt(value) < 0)) {
                canSubmit = false;
            }
        }
        if (parseInt(card[ind]["movieFar"]) > parseInt(card[ind]["movieTime"])) {
            card[ind]["movieFar"] = card[ind]["movieTime"];
        }
        if (canSubmit) {
            movieObject["movie"] = true;
            saveShowsToStorage(card);
        }
        //movieObject["movie"] = true; 
        // update local storage
       // saveShowsToStorage(card);
    }
    
    /**
     * Update the edit data to local storge with the corresponding index.
     * The editShow function deals a little specially with being able to make
     * our 2D array to pass, it has an array "episodeArray" and array "toPush" 
     * Since "totalSeasons" isn't needed to create the expandedCard it's bypassed
     * Everytime an element with name "episodes" the function create false boolean
     * values which will represent unwatched episodes, and these are pushed to 
     * episode array to create a 2D array.
     * 
     * @return None
     */
    function editShow() {
        const formData = new FormData(formSelectorShow);
        let validEpisodes = true;
        let episodeArray = [];
        let toPush = [];
        //let smallShowObject = {};
        for (const [key, value] of formData) {
            //console.log("key: " + key);
            //console.log("value: " + value);
            if (key == "showTitle" && value == "") {
                validEpisodes = false;
            }
            if (key == "imgSrc" && value == "") {
                validEpisodes = false;
            }
            if (key == "episodeArray" && value.length == 0) {
                validEpisodes = false;
            }
            if(key == "totalSeasons"){
                if (value == "" || parseInt(value) < 0 || parseInt(value) > 500) {
                    validEpisodes = false;
                }
                continue;
            }
            else if(key == "episodes"){
                //totalEpisodes += value;
                if (value < 0) {
                    validEpisodes = false;
                }
                for(let i = 0; i < value; i++){
                    toPush.push(false);
                }
                if (toPush.length == 0) {
                    validEpisodes = false;
                }
                episodeArray.push(toPush);
                toPush = [];
                continue;
            }
            card[ind][key] = value;
        }
        if (validEpisodes) {
        // update the imgAlt and showTitle
            card[ind]["imgAlt"] = card[ind]["showTitle"];
            card[ind]["episodeArray"] = episodeArray;
            // update local storage
            saveShowsToStorage(card);
        }

        //window.location. = "http://127.0.0.1:5501/source/index.html";
    }


}


/**
 * Called when we want to create a new show or movie. It will 
 * 
 * For example:
 * editFormHandler(0) will fill in the from with the data at local storge has index 0
 */
function initFormHandler() {

    const contentSelection = document.getElementById("contentSelection");
    const formSelectorMovie = document.getElementById('new-movie');
    const formSelectorShow = document.getElementById('new-show');
    const seasonsNumber = document.getElementById("totalSeasons");
    const episodeField = document.getElementById('episodeFill');

    // This event listener will check what
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
                                    <input type="number" id="season${i+1}Episodes" name = "episodes" min="0" max="10000" required>
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
        /*
        function checkMovieImage(url) {
            try {
                const res = fetch(url).then((response) => {
                    if (!response.ok) {
                        return null;
                    }
                });
                const buff = res.blob();

                return buff.type.startsWith('image/');
            }
            catch (error) {
                return null;
            }
        }
        */
        const formData = new FormData(formSelectorMovie);
        let movieObject = {};
        for (let [key, value] of formData) {
            /*
            if (key == 'imgSrc') {
                if (checkMovieImage(value) == null) {
                    value = './assets/img/icons/bingetracker_logo.png';
                }
            }
            */
            movieObject[key] = value;
        }
        if(!(Object.keys(movieObject).includes('rating'))){
            movieObject['rating'] = 0;
        }
        movieObject["movie"] = true; 
        let movies = getShowsFromStorage();
        movieObject["id"] = movies.length;
        movies.push(movieObject);
        if (parseInt(movieObject["movieFar"]) > parseInt(movieObject["movieTime"])) {
            movieObject["movieFar"] =  movieObject["movieTime"];
        }
        // check the number of character in the input
        if (!(movieObject["movieName"] == "" || movieObject["imgSrc"] == "" ||
            movieObject["movieTime"] == "" || parseInt(movieObject["movieTime"]) < 0 ||
            movieObject["movieFar"] == "" || parseInt(movieObject["movieFar"]) < 0)) {
            saveShowsToStorage(movies);
        }
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
        /*
        function checkShowImage(url) {
            try {
                const res = fetch(url).then((response) => {
                    if (!response.ok) {
                        return null;
                    }
                });
                const buff = res.blob();

                return buff.type.startsWith('image/');
            }
            catch (error) {
                return null;
            }
            /*
            try {
                var checkRes = true;
                const res = fetch(url).then((response) => {
                    console.log("Response thing: " + response.ok);
                    if (!response.ok) {
                        checkRes = false;
                        return null;
                    }
                }).catch((error) => {
                    checkRes = false;
                    console.log("Catching the error: " + checkRes);
                    return null;
                });
                console.log("Res result: " + res);
                console.log("Checking res: " + checkRes);
                if (checkRes == false) {
                    console.log("Here?");
                    return null;
                }
                console.log("Does this work?" + res.blob());
                function validImage(imageURL) {
                    console.log(imageURL);
                    console.log(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageURL));
                    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageURL);
                }
                console.log("Hello");
                return buff.type.startsWith('image/') || validImage(url);
            }
            catch (error) {
                console.log(error);
                console.log("Error2106");
                return null;
            }
        }*/
        const formData = new FormData(formSelectorShow);
        let episodeArray = [];
        let toPush = [];
        let showObject = {};
        let validEpisodes = true;
        //let smallShowObject = {};
        for (let [key, value] of formData) {
            console.log("key: " + key);
            console.log("value: " + value);
            if (key == 'imgSrc') {
                /*
                if (checkShowImage(value) == null) {
                    value = './assets/img/icons/bingetracker_logo.png';
                }
                */
            }
            if(key == "totalSeasons"){
                if (value == "" || parseInt(value) < 0 || parseInt(value) > 500) {
                    validEpisodes = false;
                }
                continue;
            }
            else if(key == "episodes"){
                //totalEpisodes += value;
                if (value < 0) {
                    validEpisodes = false;
                }
                for(let i = 0; i < value; i++){
                    toPush.push(false);
                }
                if (toPush.length == 0) {
                    validEpisodes = false;
                }
                episodeArray.push(toPush);
                toPush = [];
                continue;
            }
            showObject[key] = value;
        }
        if(!(Object.keys(showObject).includes('rating'))){
            showObject['rating'] = 0;
        }

        showObject["imgAlt"] = showObject["showTitle"];
        showObject["episodeArray"] = episodeArray;
        showObject["movie"] = false;

        let shows = getShowsFromStorage();
        showObject["id"] = shows.length;
        shows.push(showObject);
        console.log(showObject["episodeArray"]);
        if (!(showObject["showTitle"] == "" || showObject["imgSrc"] == "" ||
            showObject["episodeArray"].length == 0) && validEpisodes) {
            saveShowsToStorage(shows);
        }
        //window.location. = "http://127.0.0.1:5501/source/index.html";
    }


}