describe('Test expanded show', () => {
    // the page url to check 
    let url = 'https://cse110-fa22-group9.github.io/Team9Repository';
    // First, visit the main page
    beforeAll(async () => {
        //clear local storage before adding anything
        await page.goto(`${url}/source/index.html`);
        await page.evaluate(() => {
            window.localStorage.clear();
        });

      //Navigating to the movie's expanded card page
        //await page.goto(`${url}/source/assets/pages/movie-show-subpage.html?ind=0`);
    });      

    it("Inital Home Page - Add data into local storage", () => 
    {
        page.evaluate(function (){
            const shows = "shows";
            /*const json = [
            //Add 1 movie to test
            {id: 0, imgSrc: "https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg", 
            movie : true, movieFar:  "100", movieName: "movieTest1", movieTime: "10", rating: "0", 
            review: "testing"}];*/

            const json = [
                {id: 0, imgSrc: "https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg", 
                movie : false, episodeArray: [[false,true,true,true,false],[true,true,false,true,false]], imgAlt: "showTest1", showTitle: "showTest1", rating: "0", 
                review: "testing"}
            ]
        //Adding the movie to local storage
        window.localStorage.setItem(shows, JSON.stringify(json));
        })
    })
  
    // Check to make sure that all <expanded-movie-card> elements have data in them
    it('Make sure <expanded-movie-card> elements are populated', async () => {
      console.log('Checking to make sure <expanded-movie-card> elements are populated...');
      await page.goto(`${url}/source/assets/pages/movie-show-subpage.html?ind=0`);
      //await page.reload();
      // Start as true, if any don't have data, swap to false
      let allArePopulated = true;
      let data, plainValue;
      // Query select all of the <expanded-show-card> elements
      const showCard = await page.$$('expanded-show-card');
      console.log(showCard);
      for (let i = 0; i < showCard.length; i++) {
        console.log("please for the love of god")
        // Grab the .data property of <product-items> to grab all of the json data stored inside
        data = await showCard[i].getProperty('data');
        console.log(data);
        // Convert that property to JSON
        plainValue = await data.jsonValue();
        console.log(plainValue);
        // Make sure the title, price, and image are populated in the JSON
        /*            const json = [
                {id: 0, imgSrc: "https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg", 
                movie : false, episodeArray: [[false,true,true,true,false],[true,true,false,true,false]], imgAlt: "showTest1", showTitle: "showTest1", rating: "0", 
                review: "testing"}
            ]*/
        if (plainValue.id.length == 0) { allArePopulated = false; }
        if (plainValue.imgSrc.length == 0) { allArePopulated = false; }
        if (plainValue.movie.length == 1) { allArePopulated = false; }
        if (plainValue.episodeArray.length == 0) { allArePopulated = false; }
        if (plainValue.imgAlt.length == 0) { allArePopulated = false; }
        if (plainValue.showTitle.length == 0) { allArePopulated = false; }
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
        const showCard = await page.$$('expanded-show-card');
        for (let i = 0; i < showCard.length; i++) {
            // Grab the .data property of <expanded-movie-card> to grab all of the json data stored inside
            data = await showCard[i].getProperty('data');
            // Convert that property to JSON
            plainValue = await data.jsonValue();
            // check the showCard 
            let shadowRoot = await showCard[i].getProperty('shadowRoot');
            // get the value of expanedlink from shadow root
            let expandedLink = await shadowRoot.$('#testhomebutton');
            console.log(expandedLink.parentElement);
            let expandedLinkHref = await expandedLink.getProperty('href');
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
        const showCard = await page.$$('expanded-show-card');
        for (let i = 0; i < showCard.length; i++) {
            // Grab the .data property of <small-movie-card> to grab all of the json data stored inside
            data = await showCard[i].getProperty('data');
            // Convert that property to JSON
            plainValue = await data.jsonValue();
            // get the value of editlink from shadow root
            let shadowRoot = await showCard[i].getProperty('shadowRoot');
            let editLink = await shadowRoot.$('#editbutton');
            await editLink.click();

            await page.waitForNavigation();

            let editUrl = page.url();

            console.log(editUrl);
            //console.log(editLinkHref.toString());
            // compare if the link is correct
            if (editUrl.toString() != 
                `${url}/source/assets/pages/add-content.html?ind=${plainValue.id}`) 
            {allAreLinked = false;}

            await page.goto(`${url}/source/assets/pages/movie-show-subpage.html?ind=0`);
        }
    
        // Expect allAreLinked to still be true
        expect(allAreLinked).toBe(true);
    }, 10000);
    it('Clicking season button', 
    async () => {
        console.log('Checking <small-show-card> elements edit link are correct...');
        await page.reload();
        let data, plainValue;
        // Query select all of the <small-show-card> elements
        const showCard = await page.$$('expanded-show-card');

        // Grab the .data property of <small-show-card> to grab all of the json data stored inside
        data = await showCard[0].getProperty('data');
        // Convert that property to JSON
        plainValue = await data.jsonValue();
        // get the value of expanedlink from shadow root
        let shadowRoot = await showCard[0].getProperty('shadowRoot');
        let season2button = await shadowRoot.$('.seasonButton');
        let yum = await season2button.getProperty('id');
        let season2json = await yum.jsonValue();
        console.log(season2json.toString());
        await season2button.click();
        let index = await shadowRoot.$('.currentSeasonButton');
        yum = await index.getProperty('id');
        season2json = await yum.jsonValue();
        console.log(season2json.toString());
        let ans = season2json.toString()
        //console.log(index.getProperty('id').jsonValue.toString);

        expect(ans).toBe('season_2_button');
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
        }

        await page.goto(`${url}/source/index.html`);

        let length = await page.evaluate(() => {
            let localStorageString = window.localStorage.getItem('shows');
            if(localStorageString == null){
                return 0;
            }
            var localStorageArray = JSON.parse(localStorageString);
            return localStorageArray.length;
        })

        expect(length).toBe(0);
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