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

**totalepisodeNum(episodeArray)**

Exports a function that returns the total number of episodes in the show

*Parameters:*
| Name | Type | Description |
| ----------- | ----------- | ----------- |
| episodeArray | Array | A 2D array that contains the watch value of each episode |

*Returns:*

The total number of episodes in the show
>Type: Number

**episodesWatched(episodeArray)**

Exports a function that returns the number of episodes that the user has checked as "watched"

*Parameters:*
| Name | Type | Description |
| ----------- | ----------- | ----------- |
| episodeArray | Array | A 2D array that contains the watch value of each episode |

*Returns:*

The number of episodes that have been checked as "watched" by the user
>Type: Number

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
`new expandedShowCard()` - Construct an expandedShowCard element

### Methods
**set data(data)**

Called when the .data property is set on the expandedShowCard element

*Parameters:*
| Name | Type | Description |
| ----------- | ----------- | ----------- |
| data | Object | The data to pass into the expanded show card |

**update(data, seasonNumber, shadowDom)**

This function gets the article associated with the shadow and calls innerHTML on it. This will generate the page with season buttons and checkboxes representing true or false depending on whether the episode is watched or not. Then, createActionListeners is called to generate listners for the buttons and checkboxes created. This function is called everytime a season button is selected

*Parameters:*
| Name | Type | Description |
| ----------- | ----------- | ----------- |
| data | Object | The data to pass into the expandedShowCard |
| seasonNumber | number | the current selected season |
| shadowDom | ShadowDOM | the shadowDOM associated with the current object |

**createActionListeners(data, seasonNumber, shadowDom)**

This function takes in the current selected season and then generates event listeners to switch seasons. If a season is clicked it will update the current html to reflect the checkbox array for that season. For the checkboxes which are displayed, event listeners are generated so that the data.episodeArrat booleans are updated depending on if the checkboxes are checked or unchecked. This also creates an
event listener for the trash icon.

*Parameters:*
| Name | Type | Description |
| ----------- | ----------- | ----------- |
| data | Object | The data to pass into the expandedShowCard |
| seasonNumber | number | the current selected season |
| shadowDom | ShadowDOM | the shadowDOM associated with the current object |

**generatedInnerHTML(data, seasonNumber)**

This function takes in the current data and number of seasons to generate the HTML for the
entire card. The data processed into the correct HTML elements. The number of seasons is used
to generate checkboxes for every season, which correspond to the episodes boolean array.

*Parameters:*
| Name | Type | Description |
| ----------- | ----------- | ----------- |
| data | Object | The data to pass into the expandedShowCard |
| seasonNumber | number | the current selected season |

*Returns:*

The string representation of the HTML
>Type: String

**generateEpisodesForSeason(episodes, seasonNumber)**

This function generates the HTML for the episodes section. It determines if each episode is watched
or unwatched from the given array and constructs the checkboxes accordingly.

*Parameters:*
| Name | Type | Description |
| ----------- | ----------- | ----------- |
| episodes | Array | A 2D array of boolean values that correspond to the watch value of each episode |
| seasonNumber | number | the current selected season |

*Returns:*

The string representation of the HTML
>Type: String

**generateSeasonsHTML(episodes, seasonNumber)**

This function generates the HTML for the season buttons. Each season gets its own button, and the
season that is currently selected has a different style than every other one.

*Parameters:*
| Name | Type | Description |
| ----------- | ----------- | ----------- |
| episodes | Array | A 2D array of boolean values that correspond to the watch value of each episode |
| seasonNumber | number | the current selected season |

*Returns:*

The string representation of the HTML
>Type: String

# Class: expandedMovieCard
An expanded movie card that displays all the information about a movie on the user's watch list. Appears when you click on the movie's corresponding small card from the home page. Displays the movie title, the movie's image, rating, and comments

### Constructor
`new expandedMovieCard()` - Construct an expandedMovieCard element

### Methods
**set data(data)**

Called when the .data property is set on the expandedMovieCard element

*Parameters:*
| Name | Type | Description |
| ----------- | ----------- | ----------- |
| data | Object | The data to pass into the expanded movie card |

**update(data, shadowDom)**

This function gets the article associated with the shadow and calls innerHTML on it. This will generate the page with the correct HTML. Then, createActionListeners is called to generate listeners, mostly
for the trash icon. 

*Parameters:*
| Name | Type | Description |
| ----------- | ----------- | ----------- |
| data | Object | The data to pass into the expandedMovieCard |
| shadowDom | ShadowDOM | the shadowDOM associated with the current object |

**createActionListeners(data, shadowDom)**

This function currently only creates an event listener for the trash icon.

*Parameters:*
| Name | Type | Description |
| ----------- | ----------- | ----------- |
| data | Object | The data to pass into the expandedMovieCard |
| shadowDom | ShadowDOM | the shadowDOM associated with the current object |

**generatedInnerHTML(data)**

This function takes in the current data to generate the HTML for the
entire card. The data processed into the correct HTML elements for the rating, comments,
and so on.

*Parameters:*
| Name | Type | Description |
| ----------- | ----------- | ----------- |
| data | Object | The data to pass into the expandedMovieCard |

*Returns:*

The string representation of the HTML
>Type: String