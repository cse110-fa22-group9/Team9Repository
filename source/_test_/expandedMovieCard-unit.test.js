import expandedMovieCard from '../assets/scripts/expandedMovieCard.js';
import { update } from '../assets/scripts/expandedMovieCard.js';
import {  CreateActionListeners } from '../assets/scripts/expandedMovieCard.js';
import { generatedInnerHTML } from '../assets/scripts/expandedMovieCard.js';

describe("Validator", () => {
    const movieCard = new expandedMovieCard();

    test('Test setData() and get data() for the expandedMovieCard Class test 1', () => {
        const testData1 = {id: 0, imgSrc: "websiteHere!", 
        movie : true, movieFar:  "100", movieName: "movieTest1", movieTime: "10", rating: "0", 
        review: "testing1"};
        movieCard.data = testData1;
        expect(movieCard.data).toStrictEqual(testData1);
      });

    test('Test setData() and get data() for the expandedMovieCard Class test 2', () => {
        const testData2 = {id: 1, imgSrc: "randomThing", 
        movie : true, movieFar:  "10", movieName: "movieTest1", movieTime: "10", rating: "0", 
        review: "testing2"};
        movieCard.data = testData2;
        expect(movieCard.data).toStrictEqual(testData2);
       });

    test('Test setData() and get data() for the expandedMovieCard Class test 3', () => {
        const testData3 = {id: 0, imgSrc: "abcdefghijklm", 
        movie : true, movieFar:  "100", movieName: "Hello", movieTime: "0", rating: "0", 
        review: "testing3"};
        movieCard.data = testData3;
        expect(movieCard.data).toStrictEqual(testData3);
      });

    test('Test setData() and get data() for the expandedMovieCard Class test 4', () => {
        const testData4 = {id: 0, imgSrc: "randomstuff", 
        movie : true, movieFar:  "100", movieName: "Lanmei0914", movieTime: "0", rating: "0", 
        review: "testing4"};
        movieCard.data = testData4;
        expect(movieCard.data).toStrictEqual(testData4);
       });

    test('Test setData() and get data() for the expandedMovieCard Class test 5', () => {
        const testData5 = {id: 0, imgSrc: "Hihihi", 
        movie : true, movieFar:  "1", movieName: "Test5", movieTime: "0", rating: "0", 
        review: "testing5"};
        movieCard.data = testData5;
        expect(movieCard.data).toStrictEqual(testData5);
       });

    test('test update() from expandedMovieCard', () => {
      const newData = {id: 0, imgSrc: "randomstuff", 
        movie : true, movieFar:  "100", movieName: "Lanmei0914", movieTime: "0", rating: "0", 
        review: "testing4"};
      const oldData = {id: 0, imgSrc: "H", 
        movie : true, movieFar:  "3", movieName: "Test5", movieTime: "0", rating: "0", 
        review: "testing5"};
        movieCard.data = oldData;
        update(newData,movieCard.shadowRoot);
    
        expect(movieCard.shadowRoot.querySelector('#movieimage').src).toStrictEqual("http://localhost/randomstuff");
    })
    test('test generateInnerHTmL() from expandedMovieCard', () => {
        const newData = {id: 0, imgSrc: "randomstuff", imgAlt: "lll", movie : true, movieFar:  "100", movieName: "Lanmei0914", movieTime: "0", rating: "0", 
        review: "testing4"};
        let HTMLString = generatedInnerHTML(newData);

        expect(HTMLString).toStrictEqual(`<div id="outerbox">
                    <div class="topmovieheader"> 
                        <div class="half"><h4 id="movieheader">Movie</h4></div>
                        <div class="half"><a href="../../index.html" id="homebuttonlink"><button id="homebutton">
                            <img height="35em" src="../img/icons/home.png"></img>
                        </button></a></div>
                    </div>
                    <div id="innerbox">
                        <div id="movieandinfo">
                            <img id="movieimage" src=randomstuff alt=lll height="240 em">
                            <div id="info">
                                <div id="titleandbuttons"> 
                                    <p class="title">Name: Lanmei0914</p>
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
                                <div class="rating">Rating: 0/5</div>
                                <div class="comments">Comments:</div>
                                <textarea id="commentArea" disabled> testing4</textarea>
                            </div>
                        </div>
                        <div>
                        <h2 id="progressheader">Progress: </h2>
                        <span id="slideVal"> 100/0 </span> <br>
                        <input type="range" min="0" max=0 value=100 class="slider" id="myRange">
                        </div>
                </div>`);
    })



  });