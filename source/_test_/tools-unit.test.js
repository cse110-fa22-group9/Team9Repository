import {getShowsFromStorage} from '../assets/scripts/tools.js';
import {saveShowsToStorage} from '../assets/scripts/tools.js';
import {getIDFromStorage} from '../assets/scripts/tools.js';

test('testing whether method getShowsFromStorage returns the empty array', () => {
    const returnedShow = getShowsFromStorage();
    expect(returnedShow).toStrictEqual([]);
});

test('testing whether method saveShowsToStorage properly saves to local storage', () => {
    const shows = ['randomshowcheck', 'randomshowchecking'];
    saveShowsToStorage(shows);
    const returnedShow = JSON.parse(localStorage.getItem('shows'));
    expect(returnedShow).toStrictEqual(["randomshowcheck", "randomshowchecking"]);
});

test('testing whether method getShowsFromStorage returns the proper non-empty array now', () => {
    const returnedShow = getShowsFromStorage();
    expect(returnedShow).toStrictEqual(["randomshowcheck", "randomshowchecking"]);
});

test('testing whether method getIDFromStorage returns and increments the id', () => {
    expect(getIDFromStorage()).toBe(0);
    expect(getIDFromStorage()).toBe(1);
    expect(getIDFromStorage()).toBe(2);
    expect(getIDFromStorage()).toBe(3);
});