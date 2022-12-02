## ADR: Add Content Limitation

User input can always be the most interesting case to handle so we have decided on a few things to reduce breakage from user error.
Currently these are:
- No negative Episode numbers
- 0 Episodes Defaults to 1
- Binge Tacker logo on no imgSrc (Yet to be implemented)
- Review Limitation (Until a fitting alternative is found)
- If amount of movie watched is more than movie length, movie watched is reverted to movie length
- Not allowing HTML tags to be input (May not be implemented by end of project)
