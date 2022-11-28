describe('Test add content', () => {
    // the page url to check 
    let url = 'http://127.0.0.1:5501';
    // First, visit the main page
    beforeAll(async () => {    
      await page.goto(`${url}/source/assets/pages/add-content.html`);
      await page.evaluate(() => {
        // clear the localStorge first
        window.localStorage.clear();
      })
    });

    it('Fill out the form data for a movie and check whether it\'s properly saved to local storage', async () => {
        console.log('Check whether new movie, whose data is added to the form, gets properly saved to localStorage');
        // make sure the page is reloaded and all the dom content has been loaded as well
        await page.evaluate(() => { window.localStorage.clear() });
        expect(page.url()).toBe('http://127.0.0.1:5501/source/assets/pages/add-content.html');
        await page.reload({ waitUntil: [ 'networkidle0', "domcontentloaded" ] });
        //add data into the form
        await page.select('select#contentSelection', 'movie');
        await page.type('#movieName', 'The Bad Guys');
        await page.type('#imgSrc-Movie', 'https://images.moviesanywhere.com/5e90f05b65ad2b0459d864fcf3448e00/be7564e2-3c69-41bc-b888-697d87e797d6.jpg');
        await page.type('#movieTime', '100');
        await page.type('#movieFar', '23');
        
        // click the 5-star rating button
        const ratingFiveSelector = await page.$('#rating-5-Movie');
        await ratingFiveSelector.click();

        // fill out the review textarea
        await page.type('#review-Movie', 'Great Movie!');

        // hit the submit button and wait for the navigation to finish
        const movieSubmitSelector = await page.$('#movieSubmit');
        await movieSubmitSelector.click();
        await page.waitForNavigation();
        // check whether the content accurately appears in localStorage
        const localStorageShows = await page.evaluate(() => window.localStorage.getItem('shows'));
        const json = '[{"movieName":"The Bad Guys","imgSrc":"https://images.moviesanywhere.com/5e90f05b65ad2b0459d864fcf3448e00/be7564e2-3c69-41bc-b888-697d87e797d6.jpg","movieTime":"100","movieFar":"23","rating":"5","review":"Great Movie!","movie":true,"id":0}]';
        expect(localStorageShows).toBe(json);
        await page.evaluate(() => { window.localStorage.clear() });
    });

    it('Fill out the form data for a show and check whether it\'s properly saved to local storage', async () => {
        console.log('Check whether new show, whose data is added to the form, gets properly saved to localStorage');
        // make sure the page is reloaded and all the dom content has been loaded as well
        await page.goto(`${url}/source/assets/pages/add-content.html`);
        await page.evaluate(() => { window.localStorage.clear() });
        expect(page.url()).toBe('http://127.0.0.1:5501/source/assets/pages/add-content.html');
        await page.reload({ waitUntil: [ 'networkidle0', "domcontentloaded" ] });
        //add data into the form
        await page.select('select#contentSelection', 'show');
        await page.type('#showTitle', 'The Boys');
        await page.type('#imgSrc-Show', 'https://resizing.flixster.com/oynbxA9hJYlfdYfqcy_BrVNu_cQ=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vUlRUVjczNzIyNC53ZWJw');
        await page.type('#totalSeasons', '2');
        // once the number of seasons are put in, wait 2000 milliseconds for the corresponding episode boxes to load and keep going
        await page.evaluate(async() =>  {
            setTimeout(async function() {
                // enter in data for the episode boxes
                await page.type('#season1Episodes', '1');
                await page.type('#season2Episodes', '2');
                // click the 3-star rating button
                const ratingThreeSelector = await page.$('#rating-3-Show');
                await ratingThreeSelector.click();
                // fill out the review textarea
                await page.type('#review', 'Good Show');
                const showSubmitSelector = await page.$('showSubmit');
                await showSubmitSelector.click();
                await page.waitForNavigation();
                // check whether the content accurately appears in localStorage
                const localStorageShows = await page.evaluate(() => window.localStorage.getItem('shows'));
                const json = '[{"showTitle":"The Boys","imgSrc":"https://resizing.flixster.com/oynbxA9hJYlfdYfqcy_BrVNu_cQ=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vUlRUVjczNzIyNC53ZWJw","rating":"3","review":"Good Show","imgAlt":"The Boys","episodeArray":[[false],[false,false]],"movie":false,"id":0}]';
                expect(localStorageShows).toBe(json);
                await page.evaluate(() => { window.localStorage.clear() });
            }, 2000);
        });
    });
});