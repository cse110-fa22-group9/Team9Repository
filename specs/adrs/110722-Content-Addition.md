### ADR: How will additional content be added to the site

We decided on a single HTML form (accessed via a 'create content' button on the main page) to ask 
whether or not we were collecting data for a show or movie, and then show the correct data form depending
on the answer.

As discussed in the design meeting, we chose this option because it felt the most streamlined, another option
was to include two different forms, but that would result in 2 different buttons, linked to two different files, which
needed 2 js instances for very similar data collection procedures. 

Overall, unhiding and hiding the correct forms was a simpler solution that allows us to reduce the number of needed files 
and provide a better look to the site for users.
