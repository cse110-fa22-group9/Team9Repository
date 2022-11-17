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
    initFormHandler();
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
        //movieObject["id"] = getIDFromStorage();
        let movies = getShowsFromStorage();
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
        let expandShowObject = {};
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
            expandShowObject[key] = value;
        }


        expandShowObject["imgAlt"] = expandShowObject["showTitle"];
        expandShowObject["episodeArray"] = episodeArray;
        expandShowObject["id"] = 
        //showObject["movie"] = false;
        //showObject["id"] = getIDFromStorage();
        console.log(expandShowObject);

        let expandedCard = document.createElement('expanded-show-card');
        expandedCard.data = expandShowObject;        


        let shows = getShowsFromStorage();
        shows.push(expandShowObject);
        saveShowsToStorage(shows);

        //window.location. = "http://127.0.0.1:5501/source/index.html";
    }


}