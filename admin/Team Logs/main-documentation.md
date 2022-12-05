# Main Documentation: Intro to the Binge Tracker

This document introduces go through all files inside sources directory in our github repo and explain their purposes and functionalities. 

## CI/CD Pipline
bla bla bla 

## JS Doc 
bla bla bla 

## Source Files 
Here is the overview of the hierarchy of all files in the source directory: \
(Click on each of it to see the decription of files and each function inside the file)

- src/
  - _test_/ \
 *(all testing files: each file include unit tests to the corresponding javascipt files)*
    - [addContent.test.js](#addContenttestjs)
    - [smallCard.test.js](#smallcardtestjs)
    - [smallMovieCard-unit.test.js](#smallmoviecard-unittestjs)
    - [smallShowCard-unit.test.js](#smallshowcard-unittestjs)
    - [tools-unit.test.js](#tools-unittestjs)
  - assets/
    - img/ \
    *(store all images in our project including beinge tracker's logo, images for ratings, and images for edit, delete, and home icons)*
    - pages/ *(design for all webpages)*
      - [add-content.html](#add-contenthtml)
      - [movie-show-subpage.html](#movie-show-subpagehtml)
      - [TestCard.html](#TestCardhtml)
    - scripts/ *(coding files)*
      - [addContent.js](#addcontentjs)
      - [expandedMovieCard.js](#expandedmoviecardjs)
      - [expandedShowCard.js](#expandedshowcardjs)
      - [jestLocalSotrage.js](#jestlocalsotragejs)
      - [main.js](#mainjs)
      - [movie-show-subpage.js](#movie-show-subpagejs)
      - [smallMovieCard.js](#smallmoviecardjs)
      - [smallShowCard.js](#smallshowcardjs)
      - [tools.js](#toolsjs)
  - docs/
    - [CardObjects.md](#CardObjectsmd)
  - [index.html](#indexhtml) *(design for the homepage)*

## Files Description

### Testing
#### addContent.test.js
#### smallCard.test.js
#### smallMovieCard-unit.test.js
#### smallShowCard-unit.test.js
#### tools-unit.test.js
[return to the Source Files](#Source-Files)

### Page Designs
#### add-content.html
The file consists of both css and html codes for the "add content" subpages. There are three main html conponents: movie/show selections page, add movie page, and add show page. Choosing movie or show in the selection page will display the corresponding html codes. 
#### movie-show-subpage.html
The file movie-show-subpage imports corresponding javascript files (expandedMovieCard, expandedShowcard, movie-show-subpage) which implement inner html and inner css for this page.
#### TestCard.html
[return to the overview](#Source-Files)

### Scripts 
#### addContent.js
#### expandedMovieCard.js
#### expandedShowCard.js
#### jestLocalStorage.js
#### main.js
#### movie-show-subpage.js
#### smallMovieCard.js
#### smallShowCard.js
#### tools.js
[return to the overview](#Source-Files)

#### index.html
This file contains both css and html codes for the main page, which established links to subpages and expanded movie card. The code also organize the layout for small movie cards. 
[return to the overview](#Source-Files)



