//import {getShowsFromStorage} from '../assets/scripts/tools.js';
//import {saveShowsToStorage} from '../assets/scripts/tools.js';
//import {getIDFromStorage} from '../assets/scripts/tools.js';
const functions = require('../assets/scripts/tools.js');

test('testing whether method getShowsFromStorage returns the empty array', () => {
    expect(functions.getShowsFromStorage()).toBe([]);
});

test('testing whether method saveShowsToStorage properly saves to local storage', () => {
    shows = ['randomshowcheck', 'randomshowchecking'];
    functions.saveShowsToStorage(shows);
    expect(JSON.parse(localStorage.getItem('shows'))).toBe(['randomshowcheck', 'randomshowchecking']);
});

test('testing whether method getShowsFromStorage returns the proper non-empty array now', () => {
    expect(functions.getShowsFromStorage()).toBe(['randomshowcheck', 'randomshowchecking']);
});

test('testing whether method getIDFromStorage returns and increments the id', () => {
    expect(functions.getIDFromStorage()).toBe(0);
    expect(functions.getIDFromStorage()).toBe(1);
    expect(functions.getIDFromStorage()).toBe(2);
    expect(functions.getIDFromStorage()).toBe(3);
});