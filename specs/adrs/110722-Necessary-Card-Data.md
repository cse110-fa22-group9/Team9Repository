### ADR: What data is collected from the form, and how does that translate to an expanded / small card

Depending on whether a movie or a show is being requested to add,
Movie:
- Title
- IMG URL (optional)
- Duration (minutes)
- Time Watched (minutes)
- Rating (if any [optional])
- Review (if any [optional])

Show:
- Title
- IMG URL (optional)
- How many seasons is the show?
- Depending on num of seasons, how many episodes in each season?
- Rating (if any [optional])
- Review (if any [optional])

This data allows us to build the 2d array for a show which is pulled by expanded and small movie card, and will
let us fill in the data that reflects are current wireframe

