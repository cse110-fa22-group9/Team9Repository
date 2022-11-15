
# Week8 Guidence Document

This is a guidence document of what we need to implement and test for week8, written by Ray. To reduce the complexity, the comments and thoughts are put at the end of this document.

## Data Storage
All the movie information are stored as value of key `shows` in localstorage. The following functions are required for data operations:
### Getter: `getShowsFromStorage()`
- Input: None;
- Output: The array contains all movie information that are stored as value of key `shows` in localstorage;
- Modification: None;
### Setter: `saveShowsToStorage()`
- Input: An array contains all movie information that want to be stored as value of key `shows` in localstorage;
- Output: None;
- Modification: update the localstorage.
### Sturecuture of `show`
We define the element in the the array contains all movie information that are stored as value of key `shows` in localstorage as `show`. Each show should have following key-value pairs:
- "title": `String`
- "imgSrc": `String`
- "imgAlt": `String`
- "Movie": `boolean`
- "Movie_Duration": `Integer`
- "Progess": 

## Main Page: `index.html`
![Mainpage_Picture](img/week8_p1.png)
### Navigate Bar
- Design and implement the navigate bar with following links:
  - Watch List: A linkage to watch list page.
### Add button
- Design and implement the add button for adding the show. Folling concerns should be considered before implementing:
  - Since we want to use "form" to make the user add data to our application, should we create another page called `form.html` that specifically built for this purpose or should we hide such form in `index.html` and appears only needed?
### Form: Add new `show` to our application. 

## Comments
### Change of the key used in localstorage
The current key used in localstorage is called `cards`. I changed it to `shows` as the data in localstorage are actually some attributes the show and has nothing to do with the cards so `shows` would be more self-explained.

### Combining `showCard` and `movieCard`
The current implementation of either small cards or expanded cards seperate `movieCard` from `showCard`. Such design has increased the complexity of the system and has no obvious benefit. Therefore, integrate `movieCard` into `showCard` seems like a great idea. Such change could making the initialization of cards simpler. 
