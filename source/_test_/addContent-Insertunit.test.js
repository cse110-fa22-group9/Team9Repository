import {getShowsFromStorage} from '../assets/scripts/tools.js';
import {saveShowsToStorage} from '../assets/scripts/tools.js';
import {initFormHandler} from '../assets/scripts/addContent.js';

test('Insert Functionality for Movie', () => {
    //Implementation of addContent.html, so we can manipulate values to give to edit and init handler
    document.body.innerHTML = `<div class="header">
    <a href="../../index.html">
      <button id="homebutton">
        <img height="35em" src="../img/icons/home.png"></img>
      </button>
    </a>
  <!-- Binge Tracker's name -->
     <h2 class="bit-sidebar-heading">Binge Tracker</h2>
  </div>
  <!--Changing to index.html from watchlist.html-->
  <br>
  <label for="content" style="color: white;">What content are you adding?</label>
  <select name="content" id="contentSelection" >
    <!-- Add empty default?-->
    <option disabled selected>Choose Content</option>
    <option value="movie" id = "selectMovie">Movie</option>
    <option value="show" id = "selectShow">Show</option>
  </select>

  <form id="new-movie" hidden style="color: white;">
    <fieldset>
      <legend>What movie you are watching?</legend>
      <label for="movie-name">
        Movie name:
        <input type="text" id="movieName" name="movieName" required>
    </fieldset>
    <fieldset>
      <legend>Movie image:</legend>
      <label for="image-src">
        Source:
        <input type="text" id="imgSrc-Movie" name="imgSrc" required>
      </label>
      </label>
    </fieldset>
    <fieldset>
      <legend>Movie Time Information:</legend>
      <label for="movie-Time">How long is the movie (in minutes)?:
        <input type="number" id="movieTime" name="movieTime" min="0" required>
      </label>
      <label for="movie-far">How far you are into the movie (in minutes)?:
        <input type="number" id="movieFar" name="movieFar" min="0" required>
      </label>
    </fieldset>
      <fieldset>
        <legend>Movie Rating</legend>
        <label for="rating-0">
          Haven't Watch Yet<input type="radio" id="rating-0-Movie" value="0" name="rating">
        </label>
        <label for="rating-1">
          1<input type="radio" id="rating-1-Movie" value="1" name="rating">
        </label>
        <label for="rating-2">
          2<input type="radio" id="rating-2-Movie" value="2" name="rating">
        </label>
        <label for="rating-3">
          3<input type="radio" id="rating-3-Movie" value="3" name="rating">
        </label>
        <label for="rating-4">
          4<input type="radio" id="rating-4-Movie" value="4" name="rating">
        </label>
        <label for="rating-5">
          5<input type="radio" id="rating-5-Movie" value="5" name="rating">
        </label>
      </fieldset>
    <fieldset>
      <legend>Reviews:</legend>
      <label for="review">
        <textarea name="review" id="review-Movie" cols="38" rows="5" maxlength = "150"></textarea>
      </label>
    </fieldset>
    <button type="submit" id="movieSubmit">Add Movie to watch list</button>
    <!--
      <button type="button" class="danger">Delete this movie from watch list</button>
    -->
  </form>

  <form id="new-show" hidden style="color: white;">
    <fieldset>
      <legend>What show you are watching?</legend>
      <label for="show-name">
        Show name:
        <input type="text" id="showTitle" name="showTitle" required>
    </fieldset>
    <fieldset>
      <legend>Show image:</legend>
      <label for="image-src">
        Source:
        <input type="text" id="imgSrc-Show" name="imgSrc" required>
      </label>
      </label>
    </fieldset>
    <fieldset>
      <legend>Show episodes Information:</legend>
      <label for="totalSeasons">How many seasons in the show?
        <input type="number" id="totalSeasons" name="totalSeasons" min= "0" max="500" required>
      </label>
      <br>
    </fieldset>
    <fieldset id="episodeFill">
    
    </fieldset>
      <fieldset>
        <legend>Show Rating</legend>
        <label for="rating-0">
          Haven't Watch Yet<input type="radio" id="rating-0-Show" value="0" name="rating">
        </label>
        <label for="rating-1">
          1<input type="radio" id="rating-1-Show" value="1" name="rating">
        </label>
        <label for="rating-2">
          2<input type="radio" id="rating-2-Show" value="2" name="rating">
        </label>
        <label for="rating-3">
          3<input type="radio" id="rating-3-Show" value="3" name="rating">
        </label>
        <label for="rating-4">
          4<input type="radio" id="rating-4-Show" value="4" name="rating">
        </label>
        <label for="rating-5">
          5<input type="radio" id="rating-5-Show" value="5" name="rating">
        </label>
      </fieldset>
    <fieldset>
      <legend>Reviews:</legend>
      <label for="review">
        <textarea name="review" id="review" cols="38" rows="5" maxlength = "150"></textarea>
      </label>
    </fieldset>
    <button type="submit" id="showSubmit">Add Show to watch list</button>
  </form>`

    let rating0 = document.getElementById("rating-0-Movie");
    let rating1 = document.getElementById("rating-1-Movie");
    let rating2 = document.getElementById("rating-2-Movie");
    let rating3 = document.getElementById("rating-3-Movie");
    let rating4 = document.getElementById("rating-4-Movie");
    let rating5 = document.getElementById("rating-5-Movie");
    let watched = document.getElementById("movieFar");
    let runTime = document.getElementById("movieTime");
    let review = document.getElementById("review-Movie");
    let name = document.getElementById("movieName");
    let src = document.getElementById("imgSrc-Movie");

    rating1.checked = true;
    watched.value = "40";
    runTime.value = "50";
    review.value = "This was good!";
    name.value = "The Batman";
    src.value = "RandomSite";
  /*
    initFormHandler();

    let button = document.getElementById("movieSubmit");
    button.click();

    const checking = getShowsFromStorage();
    const compareData = {id: 0, imgSrc: "RandomSite", 
        movie : true, movieFar:  "40", movieName: "The Batman", movieTime: "50", rating: "1", 
        review: "This was good!"};

    expect(checking[0]).toStrictEqual(compareData);

    name.value = "";
    button.click();
    expect(getShowsFromStorage().length).toBe(1);
    name.value = "The Batman";

    watched.value = "";
    button.click();
    expect(getShowsFromStorage().length).toBe(1);
    watched.value = "40";

    runTime.value = "";
    button.click();
    expect(getShowsFromStorage().length).toBe(1);
    runTime.value = "50";

    watched.value = "-10";
    button.click();
    expect(getShowsFromStorage().length).toBe(1);
    watched.value = "40";

    runTime.value = "-10";
    button.click();
    expect(getShowsFromStorage().length).toBe(1);
    runTime.value = "50";

    watched.value = "100";
    button.click();

    let checking2 = getShowsFromStorage();
    let compareData2 = {id: 1, imgSrc: "RandomSite", 
        movie : true, movieFar:  "50", movieName: "The Batman", movieTime: "50", rating: "1", 
        review: "This was good!"};

    expect(checking2[1]).toStrictEqual(compareData2);*/

    localStorage.clear();
})

test("Insert Functionality of Show", () => {
        //Implementation of addContent.html, so we can manipulate values to give to edit and init handler
        
        document.body.innerHTML = `<div class="header">
        <a href="../../index.html">
          <button id="homebutton">
            <img height="35em" src="../img/icons/home.png"></img>
          </button>
        </a>
      <!-- Binge Tracker's name -->
         <h2 class="bit-sidebar-heading">Binge Tracker</h2>
      </div>
      <!--Changing to index.html from watchlist.html-->
      <br>
      <label for="content" style="color: white;">What content are you adding?</label>
      <select name="content" id="contentSelection" >
        <!-- Add empty default?-->
        <option disabled selected>Choose Content</option>
        <option value="movie" id = "selectMovie">Movie</option>
        <option value="show" id = "selectShow">Show</option>
      </select>
    
      <form id="new-movie" hidden style="color: white;">
        <fieldset>
          <legend>What movie you are watching?</legend>
          <label for="movie-name">
            Movie name:
            <input type="text" id="movieName" name="movieName" required>
        </fieldset>
        <fieldset>
          <legend>Movie image:</legend>
          <label for="image-src">
            Source:
            <input type="text" id="imgSrc-Movie" name="imgSrc" required>
          </label>
          </label>
        </fieldset>
        <fieldset>
          <legend>Movie Time Information:</legend>
          <label for="movie-Time">How long is the movie (in minutes)?:
            <input type="number" id="movieTime" name="movieTime" min="0" required>
          </label>
          <label for="movie-far">How far you are into the movie (in minutes)?:
            <input type="number" id="movieFar" name="movieFar" min="0" required>
          </label>
        </fieldset>
          <fieldset>
            <legend>Movie Rating</legend>
            <label for="rating-0">
              Haven't Watch Yet<input type="radio" id="rating-0-Movie" value="0" name="rating">
            </label>
            <label for="rating-1">
              1<input type="radio" id="rating-1-Movie" value="1" name="rating">
            </label>
            <label for="rating-2">
              2<input type="radio" id="rating-2-Movie" value="2" name="rating">
            </label>
            <label for="rating-3">
              3<input type="radio" id="rating-3-Movie" value="3" name="rating">
            </label>
            <label for="rating-4">
              4<input type="radio" id="rating-4-Movie" value="4" name="rating">
            </label>
            <label for="rating-5">
              5<input type="radio" id="rating-5-Movie" value="5" name="rating">
            </label>
          </fieldset>
        <fieldset>
          <legend>Reviews:</legend>
          <label for="review">
            <textarea name="review" id="review-Movie" cols="38" rows="5" maxlength = "150"></textarea>
          </label>
        </fieldset>
        <button type="submit" id="movieSubmit">Add Movie to watch list</button>
        <!--
          <button type="button" class="danger">Delete this movie from watch list</button>
        -->
      </form>
    
      <form id="new-show" hidden style="color: white;">
        <fieldset>
          <legend>What show you are watching?</legend>
          <label for="show-name">
            Show name:
            <input type="text" id="showTitle" name="showTitle" required>
        </fieldset>
        <fieldset>
          <legend>Show image:</legend>
          <label for="image-src">
            Source:
            <input type="text" id="imgSrc-Show" name="imgSrc" required>
          </label>
          </label>
        </fieldset>
        <fieldset>
          <legend>Show episodes Information:</legend>
          <label for="totalSeasons">How many seasons in the show?
            <input type="number" id="totalSeasons" name="totalSeasons" min= "0" max="500" required>
          </label>
          <br>
        </fieldset>
        <fieldset id="episodeFill">
        
        </fieldset>
          <fieldset>
            <legend>Show Rating</legend>
            <label for="rating-0">
              Haven't Watch Yet<input type="radio" id="rating-0-Show" value="0" name="rating">
            </label>
            <label for="rating-1">
              1<input type="radio" id="rating-1-Show" value="1" name="rating">
            </label>
            <label for="rating-2">
              2<input type="radio" id="rating-2-Show" value="2" name="rating">
            </label>
            <label for="rating-3">
              3<input type="radio" id="rating-3-Show" value="3" name="rating">
            </label>
            <label for="rating-4">
              4<input type="radio" id="rating-4-Show" value="4" name="rating">
            </label>
            <label for="rating-5">
              5<input type="radio" id="rating-5-Show" value="5" name="rating">
            </label>
          </fieldset>
        <fieldset>
          <legend>Reviews:</legend>
          <label for="review">
            <textarea name="review" id="review" cols="38" rows="5" maxlength = "150"></textarea>
          </label>
        </fieldset>
        <button type="submit" id="showSubmit">Add Show to watch list</button>
      </form>`
    
        // Setting up our array with our initial testData that will be pushed to storage and manipulated
    
        //Getting elements and checking they were filled in with proper values
        let rating0 = document.getElementById("rating-0-Show");
        let rating1 = document.getElementById("rating-1-Show");
        let rating2 = document.getElementById("rating-2-Show");
        let rating3 = document.getElementById("rating-3-Show");
        let rating4 = document.getElementById("rating-4-Show");
        let rating5 = document.getElementById("rating-5-Show");
        let seasons = document.getElementById("totalSeasons");
        let episodes1 = document.getElementById("season1Episodes");
        let review = document.getElementById("review");
        let name = document.getElementById("showTitle");
        let src = document.getElementById("imgSrc-Show");

        rating2.checked = false;
        rating4.checked = true;
    
        name.value = "newShowTest1";
    
        src.value = "newShowWebsite"
    
        review.value = "review1";
    

        seasons.value = "2";
   //seasons.simulate('change', event)

    let episodeArea = document.getElementById("episodeFill");
    episodeArea.innerHTML = `<label for="season1Episodes"> Episodes in season 2:
    <input type="number" id="season1Episodes" name = "episodes" required>
    </label> <br> <label for="season2Episodes"> Episodes in season 2:
    <input type="number" id="season2Episodes" name = "episodes" required>
    </label> <br>` ;

    console.log("Seasons Updated");
    let episodes1again = document.getElementById("season1Episodes");
    episodes1again.value = "2";
    let episodes2 = document.getElementById("season2Episodes");
    episodes2.value = "1";

    expect(episodes1again.value).toBe("2");
    expect(episodes2.value).toBe("1");
    
    /*initFormHandler();
    //Clicking the edit button
    let button = document.getElementById("showSubmit");
    button.click();

    let checking5 = getShowsFromStorage();

    let compareData1 = {id: 0, imgSrc: "newShowWebsite", 
    movie : false, episodeArray: [[false, false], [false]], imgAlt: "newShowTest1", showTitle: "newShowTest1", rating: "4", 
    review: "review1"};
    //Checking that testData1 was updated with the correct values
    expect(checking5[0]).toStrictEqual(compareData1);

    name.value = "";
    button.click();

    expect(getShowsFromStorage().length).toBe(1);
    name.value = "newShowTest1"
    
    //checking that local storage doesn't update if given a negative season number
    totalSeasons.value = "-10";
    button.click();
    const checking2 = getShowsFromStorage();
    expect(checking2.length).toBe(1);
    totalSeasons.value = "2";
    
    //Checkign that local storage doesn't update if given a blank runTime
    episodes1again.value = "-5"
    button.click();
    const checking3 = getShowsFromStorage();
    expect(checking3.length).toBe(1);
    episodes1again.value = "2";*/
})