[phase1 Drawio](/admin/cipipeline/phase1.drawio.png)

Things already implemented
  - linting and code style enforcement
    - Check at github action called Lint Code Base
    - Using super-linter to check all the code style inside the src file
  - Code quality via tool 
    - Using Codacy to check the code quality
    - Can check it at [Codacy](https://app.codacy.com/gh/cse110-fa22-group9/Team9Repository/dashboard )
    - Check the code style and bug
  - code quality via human review
    - Created at Github branches
    - Add the protection rules for main branch
    - Every merge request to branch need review and approved by another teammate in Team9
  - CI.ytml
    - Check the code quality for html file's at github action called CI
    - Maybe Update later to check more

  - unit test via automation
    - smallCard.test.js. This test file is used to test the correctness of the small show and movie card. It will first clear and insert 3 movie data and 3 show data to the localstorge. Dring the testing, it will test serverl things to make sure the small movie and show card is create by main.js, smallMoviecard.js, and smallShowcard.js correctly to the main.html.
      - before the test: clean the local storge
      - test 1: Add all the data to local storge (should always pass)
      - test 2: Check to make sure that all <small-movie-card> elements have loaded
      - test 3Check to make sure that all <small-show-card> elements have loaded
      - test 4: Check to make sure that all <small-movie-card> elements have data in them
      - test 5:Check to make sure that all <small-show-card> elements have data in them
      - test 6: Make sure all the <small-movie-card> elements have correct link to thier expandedMovie page
      - test 7:Make sure all the <small-show-card> elements have correct link to thier expandedShow page
      - test 8: Make sure all the <small-movie-card> elements have correct link to thier expandedMovie page
      - test 9: Make sure all the <small-show-card> elements have correct link to thier edit page
      - test 10: clean the local storge after test is done(should always pass) 



Things planning to implemented
  - unit tests via automation
    - planning implemented before the checkpoint 2 with study of the lab 8
  - documentation generation via automation 
    -  planning implemented before the checkpoint 2 with study of the lab 8