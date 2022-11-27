describe('Test expanded show and movie card', () => {
    // the page url to check 
    let url = 'http://127.0.0.1:5501';
    // First, visit the main page
    beforeAll(async () => {
        //clear local storage before adding anything
        await page.evaluate(() => {
            window.localStorage.clear();
          });
        const json = [
            //Add 1 movie to test
            {id: 0, imgSrc: "https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg", 
            movie : true, movieFar:  "100", movieName: "movieTest1", movieTime: "10", rating: "0", 
            review: "testing"}, ];
        //Adding the movie to local storage
        await window.localStorage.setItem("shows", JSON.stringify(json));

      //Navigating to the movie's expanded card page
        await page.goto(`${url}/source/assets/pages/movie-show-subpage.html?ind=0`);
    });      
  
    // Check to make sure that all <expanded-movie-card> elements have data in them
    it('Make sure <expanded-movie-card> elements are populated', async () => {
      console.log('Checking to make sure <expanded-movie-card> elements are populated...');
      await page.reload();
      // Start as true, if any don't have data, swap to false
      let allArePopulated = true;
      let data, plainValue;
      // Query select all of the <expanded-movie-card> elements
      const movieCard = await page.$$('expanded-movie-card');
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


    
    // Make sure all the <expanded-movie-card> elements have correct link to thier expandedMovie page
    it('Make sure all the <expanded-movie-card> elements have correct link to the home page', 
    async () => {
        console.log('Checking <expanded-movie-card> elements home button links to the home page');
        await page.reload();
        // Start as true, if any don't have data, swap to false
        let allAreLinked = true;
        let data, plainValue;
        // Query select all of the <expanded-movie-card> elements
        const movieCard = await page.$$('expanded-movie-card');
        for (let i = 0; i < movieCard.length; i++) {
            // Grab the .data property of <expanded-movie-card> to grab all of the json data stored inside
            data = await movieCard[i].getProperty('data');
            // Convert that property to JSON
            plainValue = await data.jsonValue();
            // check the showCard 
            let shadowRoot = await movieCard[i].getProperty('shadowRoot');
            // get the value of expanedlink from shadow root
            let expandedLink = await shadowRoot.$('#homebutton');
            let expandedLinkHref = await expandedLink.parentElement.getProperty('href');
            //console.log(expandedLinkHref.toString());
            // compare if the link is correct
            if (expandedLinkHref.toString() != 
                `JSHandle:${url}/source/index.html`) 
            {allAreLinked = false;}
        }
    
        // Expect allArePopulated to still be true
        expect(allAreLinked).toBe(true);
    }, 10000);


    // Make sure all the <expanded-movie-card> elements have correct link to thier edit page
    it('Make sure all the <expanded-movie-card> elements have correct link to thier edit page', 
    async () => {
        console.log('Checking <expanded-movie-card> elements edit link are correct...');
        await page.reload();
        // Start as true, if any don't have data, swap to false
        let allAreLinked = true;
        let data, plainValue;
        // Query select all of the <expanded-movie-card> elements
        const showCard = await page.$$('expanded-movie-card');
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
    it('Make sure all the <expanded-movie-card> elements delete button deletes', 
    async () => {
        console.log('Checking <small-show-card> elements edit link are correct...');
        await page.reload();
        // Start as true, if any don't have data, swap to false
        let allAreLinked = true;
        let data, plainValue;
        // Query select all of the <small-show-card> elements
        const showCard = await page.$$('expanded-show-card');
        for (let i = 0; i < showCard.length; i++) {
            // Grab the .data property of <small-show-card> to grab all of the json data stored inside
            data = await showCard[i].getProperty('data');
            // Convert that property to JSON
            plainValue = await data.jsonValue();
            // get the value of expanedlink from shadow root
            let shadowRoot = await showCard[i].getProperty('shadowRoot');
            let trashbutton = await shadowRoot.$('#trashbutton');
            await trashbutton.click();
            //console.log(editLinkHref.toString());
            // compare if the link is correc
            let localStorageString = localStorage.getItem('shows');
            let localStorageArray = await JSON.parse(localStorageString);
        }
    
        // Expect allAreLinked to still be true
        expect(localStorageArray.length).toBe(0);
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