### ADR: How will project files be arranged

#### Modified 11/14

Intial arragnement was 4 html files, one for the main page, one for adding shows, one for adding movies and the subpage
that would change depending on which movie is selected. 

This has been changed to 3 files, replacing adding shows and adding movies with one add-content file which performs both
actions. This was chagned to streamline the number of files needed for functinoality

Each card has it's own JS file, 