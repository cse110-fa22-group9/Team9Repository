import smallShowCard from '../assets/scripts/smallShowCard.js';
import { totalepisodeNum } from '../assets/scripts/smallShowCard.js';
import { episodesWatched } from '../assets/scripts/smallShowCard.js';

describe("Validator", () => {
    const showCard = new smallShowCard();

    console.log(totalepisodeNum([[false]]));


    test('totalepisodeNum() test1', () => {
        expect(totalepisodeNum([[false]])).toStrictEqual(1);
       });
    
    test('totalepisodeNum() test2', () => {
        expect(totalepisodeNum([[false],[false]])).toStrictEqual(2);
       });

    test('totalepisodeNum() test3', () => {
        expect(totalepisodeNum([[false, true, true],[false, false], [true, true],
            [true, true], [true, true], [true, true], [true, true]]))
            .toStrictEqual(15);
       });

    test('totalepisodeNum() test4', () => {
        expect(totalepisodeNum([[false, true, true],[false, false], [true, true]]))
            .toStrictEqual(7);
       });

    test('totalepisodeNum() test5', () => {
        expect(totalepisodeNum([[false, true, true, true, true],[false, true], 
            [true, true], [false, true]])).toStrictEqual(11);
       });
    
    test('episodesWatched() test1', () => {
        expect(episodesWatched([[false]])).toStrictEqual(0);
       });
    
    test('episodesWatched() test2', () => {
        expect(episodesWatched([[false],[true]])).toStrictEqual(1);
       });

    test('episodesWatched() test3', () => {
        expect(episodesWatched([[false, true, true],[false, false], [true, true],
            [true, true], [true, true], [true, true], [true, true]]))
            .toStrictEqual(12);
       });

    test('episodesWatched() test4', () => {
        expect(episodesWatched([[false, true, true],[false, false], [true, true]]))
            .toStrictEqual(4);
       });

    test('episodesWatched() test5', () => {
        expect(episodesWatched([[false, true, true, true, true],[false, true], 
            [true, true], [false, true]])).toStrictEqual(8);
       });

    test('Test setData() and get data() for the smallShowCard Class test 1', () => {
        const testData1 = {id: 0, imgSrc: "TestingSmallShowCard!!!!", 
        movie : false, episodeArray: [[false]], imgAlt: "showTest1", showTitle: "showTest1", rating: "2", 
        review: "testing1"};
        showCard.data = testData1;
        expect(showCard.data).toStrictEqual(testData1);
       });


    test('Test setData() and get data() for the smallShowCard Class test 2', () => {
        const testData2 = {id: 1, imgSrc: "abcdefghijklmn", 
        movie : false, episodeArray: [[false, false, false], [false]], imgAlt: "showTest2", 
        showTitle: "showTest2", rating: "2", 
        review: "testing1"};
        showCard.data = testData2;
        expect(showCard.data).toStrictEqual(testData2);
       });

    test('Test setData() and get data() for the smallShowCard Class test 3', () => {
        const testData3 = {id: 2, imgSrc: "TestingSmallShowCard!!!!", 
        movie : false, episodeArray: [[false, false, false], [false], [false, false, false], [false]],
        imgAlt: "showTest3", showTitle: "showTest3", rating: "3", 
        review: "testing1"};
        showCard.data = testData3;
        expect(showCard.data).toStrictEqual(testData3);
       });

    test('Test setData() and get data() for the smallShowCard Class test 4', () => {
        const testData4 = {id: 3, imgSrc: "This is just a random test!", 
        movie : false, episodeArray: [[false]], imgAlt: "showTest5", showTitle: "showTest5", rating: "2", 
        review: "testing5"};
        showCard.data = testData4;
        expect(showCard.data).toStrictEqual(testData4);
       });

    test('Test setData() and get data() for the smallShowCard Class test 5', () => {
        const testData5 = {id: 4, imgSrc: "Lanmei0914", 
        movie : false, episodeArray: [[false]], imgAlt: "showTest5", showTitle: "showTest5", rating: "2", 
        review: "testing5"};
        showCard.data = testData5;
        expect(showCard.data).toStrictEqual(testData5);
       });

  });
