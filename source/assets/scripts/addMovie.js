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
    const formSelector = document.getElementById('new-movie');
    const submitSelector = document.querySelector("[type='submit']");
    submitSelector.addEventListener("click", insertMovie);
    function insertMovie() {
        const formData = new FormData(formSelector);
        let movieObject = {};
        for (const [key, value] of formData) {
        movieObject[key] = value;
        }
        movieObject["movie"] = true; 
        let movies = getShowsFromStorage();
        movies.push(movieObject);
        saveShowsToStorage(movies);
    }
}