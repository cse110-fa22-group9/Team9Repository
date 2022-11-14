/**
 * Testing show element
 */

 window.addEventListener('DOMContentLoaded', init);

 // Starts the program, all function calls trace back here
 function init() {
     let showObject = {
                     "showTitle" : "Stranger Things",
                     "imgSrc" : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Stranger_Things_logo.png/375px-Stranger_Things_logo.png",
                     "imgAlt" : "Stranger Things",
                     "numEpisodes" : 15,
                     "episodesWatched" : 5,
                     "rating" : 4,
                     "comments" : "pretty good"
                    }
     let main = document.querySelector('main');
     let show = document.createElement('small-show-card');
     show.data = showObject;

     let movieObject = {
                        "movieTitle" : "Parasite",
                        "imgSrc" : "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png",
                        "imgAlt" : "Parasite",
                        "movieDuration" : "2h 12m",
                        "progressMade" : "1h 50m",
                        "rating" : 5,
                        "comments" : "wow"
                       }
     let movie = document.createElement('small-movie-card');
     movie.data = movieObject;

     main.append(show);
     main.append(movie);
 }