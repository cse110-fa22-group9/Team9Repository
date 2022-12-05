import expandedShowCard from '../assets/scripts/expandedShowCard.js';
import { update } from '../assets/scripts/expandedShowCard.js';
import { generatedInnerHTML } from '../assets/scripts/expandedShowCard.js';
import {generateEpisodesForSeason} from "../assets/scripts/expandedShowCard.js";
import {generateSeasonsHTML} from "../assets/scripts/expandedShowCard.js"

describe("Validator", () => {
    const showCard = new expandedShowCard();

    test('Test setData() and get data() for the expandedShowCard Class test 1', () => {
        const testData1 = {id: 0, imgSrc: "TestingSmallShowCard!!!!", 
        movie : false, episodeArray: [[false]], imgAlt: "showTest1", showTitle: "showTest1", rating: "2", 
        review: "testing1"};
        showCard.data = testData1;
        expect(showCard.data).toStrictEqual(testData1);
      });

    test('Test setData() and get data() for the expandedShowCard Class test 2', () => {
        const testData2 = {id: 1, imgSrc: "abcdefghijklmn", 
        movie : false, episodeArray: [[false, false, false], [false]], imgAlt: "showTest2", 
        showTitle: "showTest2", rating: "2", review: "testing1"};
        showCard.data = testData2;
        expect(showCard.data).toStrictEqual(testData2);
       });

    test('test update() from expandedShowCard', () => {
      const newData = {id: 0, imgSrc: "TestingSmallShowCard!!!!", 
      movie : false, episodeArray: [[false]], imgAlt: "showTest1", showTitle: "showTest1", rating: "2", 
      review: "testing1"};
      const oldData = {id: 1, imgSrc: "abcdefghijklmn", 
      movie : false, episodeArray: [[false, false, false], [false]], imgAlt: "showTest2", 
      showTitle: "showTest2", rating: "2", review: "testing1"}
      showCard.data = oldData;
        update(newData, 1 ,showCard.shadowRoot);
    
        expect(showCard.shadowRoot.querySelector('#showimage').src).toStrictEqual("http://localhost/TestingSmallShowCard!!!!");
    })
    test('test generateInnerHTmL() from expandedMovieCard', () => {
        const newData = {id: 1, imgSrc: "abcdefghijklmn", 
        movie : false, episodeArray: [[false, false, false], [false]], imgAlt: "showTest2", 
        showTitle: "showTest2", rating: "2", review: "testing1"}
        let HTMLString = generatedInnerHTML(newData, 1);

        expect(HTMLString).toStrictEqual(`<div id="outerbox">
                    <div class="toptvshowheader"> 
                        <div class="half"><h4 id="tvshowheader">TV Show</h4></div>
                        <div class="half"><a href="../../index.html"><button id="homebutton">
                            <img height="35em" src="../img/icons/home.png"></img>
                        </button></a></div>
                    </div>
                    <div id="innerbox">
                        <div id="showandinfo">
                            <img id="showimage" src=abcdefghijklmn alt=showTest2 height="240 em">
                            <div id="info">
                                <div id="titleandbuttons"> 
                                    <p class="title">Name: showTest2</p>
                                    <div id="buttons">
                                    <button id="editbutton">
                                        <img height="27em" src="../img/icons/edit.png"></img>
                                    </button>
                                        <button id="trashbutton">
                                            <img height="27em" src="../img/icons/trash.png">
                                            </img>
                                        </button>
                                    </div>
                                </div>
                                <div class="rating">Rating: 2/5</div>
                                <div class="comments">Comments: testing1</div>
                            </div>
                        </div>
                        <h2 id="progressheader">Progress: </h2><div id="seasonbuttons"><button id="season_1_button" class="currentSeasonButton">Season 1</button><button id="season_2_button" class="seasonButton">Season 2</button></div><div id="episodesDiv"><button id="season_1_episode_1_checkbox" class="showBoxUnchecked"> 1 </button><button id="season_1_episode_2_checkbox" class="showBoxUnchecked"> 2 </button><button id="season_1_episode_3_checkbox" class="showBoxUnchecked"> 3 </button>
    <div id="checkAllDiv">
        <p>Check All</p>
        <button id="checkAllButton">
            <img height="16em" src="../img/icons/checkboxicon.png">
            </img>
        </button>
    </div>
    </div></div>`);


    })

    test('test generateEpisodesForSeason() from expandedShowCard', () => {
        const testData5 = {id: 1, imgSrc: "abcdefghijklmn", 
        movie : false, episodeArray: [[false, false, false], [false]], imgAlt: "showTest2", 
        showTitle: "showTest2", rating: "2", review: "testing1"}
        showCard.data = testData5;
        const HTMLstring = generateEpisodesForSeason(testData5.episodeArray[0], 0);
        expect(HTMLstring).toStrictEqual(`<div id="episodesDiv"><button id="season_0_episode_1_checkbox" class="showBoxUnchecked"> 1 </button><button id="season_0_episode_2_checkbox" class="showBoxUnchecked"> 2 </button><button id="season_0_episode_3_checkbox" class="showBoxUnchecked"> 3 </button>
    <div id="checkAllDiv">
        <p>Check All</p>
        <button id="checkAllButton">
            <img height="16em" src="../img/icons/checkboxicon.png">
            </img>
        </button>
    </div>
    </div>`);
  });
  test('test generateSeasonsHTML() from expandedShowCard', () => {
    const testData5 = {id: 1, imgSrc: "abcdefghijklmn", 
    movie : false, episodeArray: [[false, false, false], [false]], imgAlt: "showTest2", 
    showTitle: "showTest2", rating: "2", review: "testing1"}
    showCard.data = testData5;
    const HTMLstring = generateSeasonsHTML(testData5.episodeArray, 0);
    console.log(HTMLstring);
    expect(HTMLstring).toStrictEqual(`<div id="seasonbuttons"><button id="season_1_button" class="seasonButton">Season 1</button><button id="season_2_button" class="seasonButton">Season 2</button></div>`);
    });
})