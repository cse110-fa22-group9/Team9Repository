# Team 9 (T9) Meeting Minutes #6

#### Meeting Type:
Project Breakdown

# Attendance

* Aedan Bailey
* Pranav Puttaparthi
* Ruihan Zeng

#### Meeting Location & Start Time:
Online Zoom - November 7, 2022 at 8:00 PM PST

# Meeting Agenda
Breakdown of entirety of project to be assigned in tickets

Small MovieCard
Progress bar pulling data from current season array of booleans
Pulls show image
Show years (if given)
Current fractional episode count
Title


EXPANDED MovieCard
Pulls show image
Show years

Account for different num of episodes per season, 2D array of booleans, ADR

Checkbox progress bar, selectable, determined by num of episodes in season

[[true, true, false, false], []]

Show[0][1] = true;

Season selector box, dropdown box
SAVED EACH TIME A BOX IS SELECTED or SAVE BUTTON, ADR

Edit Button, brings up form layered on top of expanded movie card, ADR
- Edit button brings up create form with current numbers filled in to change
Delete button, remove from local storage
- Confirmation screen

Comments, saved as string (additional sprint feature for writing tools)
- Expanding Text Field (Where do we place)
Ratings, saved as num (How do we want to represent ratings?)
- Star images, select star, fills in ratings


Two different data functions for cards?

CREATE button
- Option for movie or Show
- Optional year to year 
- User submitted image
    - What if user doesn’t have an image (BingeTracker logo)
- Number of Seasons

Is this a show or a movie? -> Movie form or -> show form
Movieform
- Title
- Image (optional)
- Release (optional)

Showform
- Title (Text box)
- Seasons (Text box) with confirm button (Edge case of large amount of seasons? Negative Seasons)
- Generates Boxes for number of seasons to input episodes based on seasons
- Show Img
- Starting year to Ending Year (Optional, show as optional)

(Potential feature, movies that are part of trilogies or series)?

How many seasons in this Show? [7] [confirm] (unclickable unless valid input)
Season 1 episodes [] (is this the same num of episodes per seasons checkbox)
Seasons 2 episodes []
Seasons 3 episodes []
…


Our actual site with tabs for Checklist and Reviews / stars

Delete all button, remove all from local storage
- Found on Home Screen, probably red
- CONFRIMATION SCREEN
