# Card Objects

# Class: smallShowCard

A small show card that previews information about a show on the user's watch list. Displays the show title, the show image, and the progress the user has made in the show

### Constructor
`new smallShowCard()` - construct a smallShowCard element

### Methods
**set data(data)**

Called when the .data property is set on the smallShowCard element.

*Parameters:*

| Name | Type | Description |
| ----------- | ----------- | ----------- |
| data | Object | The data to pass into the small show card |

**get data()**

*Returns:*

Small show card's data
>Type: Object

# Class: smallMovieCard
A small movie card that previews information about movies on the user's watch list. Displays the movie title, image, and progress made with the movie

### Constructor
`new smallMovieCard()` - Construct a smallMovieCard element

### Methods
**set data(data)**

Called when the .data property is set on the smallMovieCard element

*Parameters:*
| Name | Type | Description |
| ----------- | ----------- | ----------- |
| data | Object | The data to pass into the small movie card |

**get data()**

*Returns:*

The movie card's data
>Type: Object

# Class: expandedShowCard
An expanded show card that displays all the information about a show on the user's watch list. Appears when you click on the show's corresponding small card from the home page. Displays the show title, the show's image, rating, comments, the progress the user has made in the show, and the current season that the user is on

### Constructor
`new expandedMovieCard()` - Construct an expandedShowCard element

### Methods
**set data(data)**

Called when the .data property is set on the expandedShowCard element

*Parameters:*
| Name | Type | Description |
| ----------- | ----------- | ----------- |
| data | Object | The data to pass into the expanded movie card |

**update(data, seasonNumber, shadowDom)**

This function gets the article associated with the shadow and calls innerHTML on it. This will generate the page with season buttons and checkboxes representing true or false depending on whether the episode is watched or not. Then, createActionListeners is called to generate listners for the buttons and checkboxes created. This function is called everytime a season button is selected

*Parameters:*
| Name | Type | Description |
| ----------- | ----------- | ----------- |
| data | Object | The data to pass into the expandedShowCard |
| seasonNumber | number | the current selected season |
| shadowDom | ShadowDOM | the shadowDOM associated with the current object |

**createActionListeners(data, seasonNumber, shadowDom)**

This function takes in the current selected season and then generates event listeners to switch seasons. If a season is clicked it will update the current html to reflect the checkbox array for that season. For the checkboxes which are displayed, event listeners are generated so that the data.episodeArrat booleans are updated depending on if the checkboxes are checked or unchecked.

*Parameters:*
| Name | Type | Description |
| ----------- | ----------- | ----------- |
| data | Object | The data to pass into the expandedShowCard |
| seasonNumber | number | the current selected season |
| shadowDom | ShadowDOM | the shadowDOM associated with the current object |



