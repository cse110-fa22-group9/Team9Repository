import smallMovieCard from '../assets/scripts/smallMovieCard.js';

describe("Validator", () => {
    const movieCard = new smallMovieCard();

    //console.log(movieCard.shadowRoot);

    test('Test setData() and get data() for the smallMovieCard Class test 1', () => {
        const testData1 = {id: 0, imgSrc: "websiteHere!", 
        movie : true, movieFar:  "100", movieName: "movieTest1", movieTime: "10", rating: "0", 
        review: "testing1"};
        movieCard.data = testData1;
        expect(movieCard.data).toStrictEqual(testData1);
      });

    //console.log(movieCard.shadowRoot);

    test('Test setData() and get data() for the smallMovieCard Class test 2', () => {
        const testData2 = {id: 1, imgSrc: "randomThing", 
        movie : true, movieFar:  "10", movieName: "movieTest1", movieTime: "10", rating: "0", 
        review: "testing2"};
        movieCard.data = testData2;
        expect(movieCard.data).toStrictEqual(testData2);
       });

    test('Test setData() and get data() for the smallMovieCard Class test 3', () => {
        const testData3 = {id: 0, imgSrc: "abcdefghijklm", 
        movie : true, movieFar:  "100", movieName: "Hello", movieTime: "0", rating: "0", 
        review: "testing3"};
        movieCard.data = testData3;
        expect(movieCard.data).toStrictEqual(testData3);
      });

    test('Test setData() and get data() for the smallMovieCard Class test 4', () => {
        const testData4 = {id: 0, imgSrc: "randomstuff", 
        movie : true, movieFar:  "100", movieName: "Lanmei0914", movieTime: "0", rating: "0", 
        review: "testing4"};
        movieCard.data = testData4;
        expect(movieCard.data).toStrictEqual(testData4);
       });

    test('Test setData() and get data() for the smallMovieCard Class test 5', () => {
        const testData5 = {id: 0, imgSrc: "Hihihi", 
        movie : true, movieFar:  "1", movieName: "Test5", movieTime: "0", rating: "0", 
        review: "testing5"};
        movieCard.data = testData5;
        expect(movieCard.data).toStrictEqual(testData5);
       });

  });
