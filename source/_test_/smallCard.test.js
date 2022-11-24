describe('Test small show and movie card', () => {
    // the page url to check 
    let url = 'http://127.0.0.1:5501';
    // First, visit the main page
    beforeAll(async () => {    
      await page.goto(`${url}/source/index.html`);
      await page.evaluate(() => {
        // clear the localStorge first
        window.localStorage.clear();
      })
    });

    // Add all the data to local storge 
    it("Initial Home Page - Add data into local storage", () => {
        console.log('Adding data into local storage');
        page.evaluate(function () {
            const shows = "shows";
            const json = [
                //movie 1
                {id: 0, imgSrc: "https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg", 
                movie : true, movieFar:  "100", movieName: "movieTest1", movieTime: "10", rating: "0", 
                review: "testing"}, 
                //movie 2
                {id: 1, imgSrc: "https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg", 
                movie : true, movieFar:  "100", movieName: "movieTest2", movieTime: "10", rating: "1", 
                review: "testing"},
                //movie 3
                {id: 2, imgSrc: "https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg", 
                movie : true, movieFar:  "100", movieName: "movieTest3", movieTime: "10", rating: "2", 
                review: "testing"},
                //show 1
                {id: 3, imgSrc: "https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg", 
                movie : false, episodeArray: [[false]], imgAlt: "showTest1", showTitle: "showTest1", rating: "0", 
                review: "testing"},
                //show 2
                {id: 4, imgSrc: "https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg", 
                movie : false, episodeArray: [[false]], imgAlt: "showTest2", showTitle: "showTest2", rating: "1", 
                review: "testing"},
                //show 3
                {id: 5, imgSrc: "https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg", 
                movie : false, episodeArray: [[false]], imgAlt: "showTest3", showTitle: "showTest3", rating: "2", 
                review: "testing"}];
            window.localStorage.setItem(shows, JSON.stringify(json));
        });
    });
  
    // Check to make sure that all <small-movie-card> elements have loaded
    it('Check for all <small-movie-card> items', async () => {
      console.log('Checking for all <small-movie-card> items...');
      await page.reload();
      // Query select all of the <small-movie-card> elements and return the length of that array
      const numMovieCard = await page.$$eval('small-movie-card', (prodItems) => {
        return prodItems.length;
      });
      // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
      expect(numMovieCard).toBe(3);
    });

    // Check to make sure that all <small-show-card> elements have loaded
    it('Check for all <small-show-card> items', async () => {
        console.log('Checking for all <small-show-card> items...');
        await page.reload();
        // Query select all of the <small-show-card> elements and return the length of that array
        const numShowCard = await page.$$eval('small-show-card', (prodItems) => {
            return prodItems.length;
        });
        // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
        expect(numShowCard).toBe(3);
    });
  
    // Check to make sure that all <small-movie-card> elements have data in them
    it('Make sure <small-movie-card> elements are populated', async () => {
      console.log('Checking to make sure <small-movie-card> elements are populated...');
      await page.reload();
      // Start as true, if any don't have data, swap to false
      let allArePopulated = true;
      let data, plainValue;
      // Query select all of the <small-movie-card> elements
      const movieCard = await page.$$('small-movie-card');
      for (let i = 0; i < movieCard.length; i++) {
        // Grab the .data property of <product-items> to grab all of the json data stored inside
        data = await movieCard[i].getProperty('data');
        // Convert that property to JSON
        plainValue = await data.jsonValue();
        // Make sure the title, price, and image are populated in the JSON
        /*{id: 0, imgSrc: "https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg", 
        movie : true, movieFar:  "100", movieName: "movieTest1", movieTime: "10", rating: "0", 
        review: "testing"}*/
        if (plainValue.id.length == 0) { allArePopulated = false; }
        if (plainValue.imgSrc.length == 0) { allArePopulated = false; }
        if (plainValue.movie.length == 0) { allArePopulated = false; }
        if (plainValue.movieFar.length == 0) { allArePopulated = false; }
        if (plainValue.movieName.length == 0) { allArePopulated = false; }
        if (plainValue.movieTime.length == 0) { allArePopulated = false; }
        if (plainValue.rating.length == 0) { allArePopulated = false; }
        if (plainValue.review.length == 0) { allArePopulated = false; }
      }
  
      // Expect allArePopulated to still be true
      expect(allArePopulated).toBe(true);
    }, 10000);

    // Check to make sure that all <small-movie-card> elements have data in them
    it('Make sure <small-movie-card> elements are populated', async () => {
        console.log('Checking to make sure <small-movie-card> elements are populated...');
        await page.reload();
        // Start as true, if any don't have data, swap to false
        let allArePopulated = true;
        let data, plainValue;
        // Query select all of the <small-movie-card> elements
        const showCard = await page.$$('small-show-card');
        for (let i = 0; i < showCard.length; i++) {
            // Grab the .data property of <product-items> to grab all of the json data stored inside
            data = await showCard[i].getProperty('data');
            // Convert that property to JSON
            plainValue = await data.jsonValue();
            // Make sure the title, price, and image are populated in the JSON
            /*{id: 5, imgSrc: "https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg", 
                movie : false, episodeArray: [[false]], imgAlt: "showTest3", showTitle: "showTest3", rating: "2", 
                review: "testing"}*/
            if (plainValue.id.length == 0) { allArePopulated = false; }
            if (plainValue.imgSrc.length == 0) { allArePopulated = false; }
            if (plainValue.movie.length == 0) { allArePopulated = false; }
            if (plainValue.episodeArray.length == 0) { allArePopulated = false; }
            if (plainValue.imgAlt.length == 0) { allArePopulated = false; }
            if (plainValue.showTitle.length == 0) { allArePopulated = false; }
            if (plainValue.rating.length == 0) { allArePopulated = false; }
            if (plainValue.review.length == 0) { allArePopulated = false; }
        }
    
        // Expect allArePopulated to still be true
        expect(allArePopulated).toBe(true);
    }, 10000);
    
    // Make sure all the <small-movie-card> elements have correct link to thier expandedMovie page
    it('Make sure all the <small-movie-card> elements have correct link to thier expandedMovie page', 
    async () => {
        console.log('Checking <small-movie-card> elements expanded link are correct...');
        await page.reload();
        // Start as true, if any don't have data, swap to false
        let allAreLinked = true;
        let data, plainValue;
        // Query select all of the <small-movie-card> elements
        const showCard = await page.$$('small-movie-card');
        for (let i = 0; i < showCard.length; i++) {
            // Grab the .data property of <small-movie-card> to grab all of the json data stored inside
            data = await showCard[i].getProperty('data');
            // Convert that property to JSON
            plainValue = await data.jsonValue();
            // check the showCard 
            let shadowRoot = await showCard[i].getProperty('shadowRoot');
            // get the value of expanedlink from shadow root
            let expandedLink = await shadowRoot.$('#expandedLink');
            let expandedLinkHref = await expandedLink.getProperty('href');
            //console.log(expandedLinkHref.toString());
            // compare if the link is correct
            if (expandedLinkHref.toString() != 
                `JSHandle:${url}/source/assets/pages/movie-show-subpage.html?ind=${plainValue.id}`) 
            {allAreLinked = false;}
        }
    
        // Expect allArePopulated to still be true
        expect(allAreLinked).toBe(true);
    }, 10000);

    //Make sure all the <small-show-card> elements have correct link to thier expandedShow page
    it('Make sure all the <small-show-card> elements have correct link to thier expandedShow page', 
    async () => {
        console.log('Checking <small-show-card> elements expanded link are correct...');
        await page.reload();
        // Start as true, if any don't have data, swap to false
        let allAreLinked = true;
        let data, plainValue;
        // Query select all of the <small-show-card> elements
        const showCard = await page.$$('small-show-card');
        for (let i = 0; i < showCard.length; i++) {
            // Grab the .data property of <small-show-card> to grab all of the json data stored inside
            data = await showCard[i].getProperty('data');
            // Convert that property to JSON
            plainValue = await data.jsonValue();
            // get the value of expanedlink from shadow root
            let shadowRoot = await showCard[i].getProperty('shadowRoot');
            let expandedLink = await shadowRoot.$('#expandedLink');
            let expandedLinkHref = await expandedLink.getProperty('href');
            //console.log(expandedLinkHref.toString());
            // compare if the link is correct
            if (expandedLinkHref.toString() != 
                `JSHandle:${url}/source/assets/pages/movie-show-subpage.html?ind=${plainValue.id}`) 
            {allAreLinked = false;}
        }
    
        // Expect allArePopulated to still be true
        expect(allAreLinked).toBe(true);
    }, 10000);

    // Make sure all the <small-movie-card> elements have correct link to thier edit page
    it('Make sure all the <small-movie-card> elements have correct link to thier edit page', 
    async () => {
        console.log('Checking <small-movie-card> elements edit link are correct...');
        await page.reload();
        // Start as true, if any don't have data, swap to false
        let allAreLinked = true;
        let data, plainValue;
        // Query select all of the <small-movie-card> elements
        const showCard = await page.$$('small-movie-card');
        for (let i = 0; i < showCard.length; i++) {
            // Grab the .data property of <small-movie-card> to grab all of the json data stored inside
            data = await showCard[i].getProperty('data');
            // Convert that property to JSON
            plainValue = await data.jsonValue();
            // get the value of editlink from shadow root
            let shadowRoot = await showCard[i].getProperty('shadowRoot');
            let editLink = await shadowRoot.$('#editLink');
            let editLinkHref = await editLink.getProperty('href');
            //console.log(editLinkHref.toString());
            // compare if the link is correct
            if (editLinkHref.toString() != 
                `JSHandle:${url}/source/assets/pages/add-content.html?ind=${plainValue.id}`) 
            {allAreLinked = false;}
        }
    
        // Expect allAreLinked to still be true
        expect(allAreLinked).toBe(true);
    }, 10000);

    // Make sure all the <small-show-card> elements have correct link to thier edit page
    it('Make sure all the <small-show-card> elements have correct link to thier edit page', 
    async () => {
        console.log('Checking <small-show-card> elements edit link are correct...');
        await page.reload();
        // Start as true, if any don't have data, swap to false
        let allAreLinked = true;
        let data, plainValue;
        // Query select all of the <small-show-card> elements
        const showCard = await page.$$('small-show-card');
        for (let i = 0; i < showCard.length; i++) {
            // Grab the .data property of <small-show-card> to grab all of the json data stored inside
            data = await showCard[i].getProperty('data');
            // Convert that property to JSON
            plainValue = await data.jsonValue();
            // get the value of expanedlink from shadow root
            let shadowRoot = await showCard[i].getProperty('shadowRoot');
            let editLink = await shadowRoot.$('#editLink');
            let editLinkHref = await editLink.getProperty('href');
            //console.log(editLinkHref.toString());
            // compare if the link is correct
            if (editLinkHref.toString() != 
                `JSHandle:${url}/source/assets/pages/add-content.html?ind=${plainValue.id}`) 
            {allAreLinked = false;}
        }
    
        // Expect allAreLinked to still be true
        expect(allAreLinked).toBe(true);
    }, 10000);

    // clean the local storge after test is done
    it('Clean the local storge after test is done', 
    async () => {
        console.log('Cleaning the local storge...');
        await page.evaluate(() => {
            window.localStorage.clear();
          })
    }, 10000);

    
  });