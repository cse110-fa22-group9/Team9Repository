//importing functions from tools.js
import {getShowsFromStorage} from './tools.js';
import {saveShowsToStorage} from './tools.js';


// Binding initialization function to document listener
window.addEventListener('DOMContentLoaded', init);

// input: None
// Output: None
// Operations: when the user click the submit button, insert new show into local storage
// by calling initFormHandler()
function init() {
    initFormHandler();
}

// input: None
// output: None
// Operation: when the user click the submit button, insert new show into local storage
function initFormHandler() {
    const formSelector = document.getElementById('new-show');
    const submitSelector = document.querySelector("[type='submit']");
    submitSelector.addEventListener("click", insertShow);
    function insertShow() {
        const formData = new FormData(formSelector);
        let showObject = {};
        for (const [key, value] of formData) {
            showObject[key] = value;
        } 
        let shows = getShowsFromStorage();
        shows.push(showObject);
        saveShowsToStorage(shows);
    }

}