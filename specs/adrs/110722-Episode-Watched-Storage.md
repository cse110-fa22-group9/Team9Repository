### ADR: How to store current seasons and episodes

Our initial decision is to store whether or not an episode is watched in a 2D array of 
booleans, where rows represent the current seasons (i.e. season 1 would be array[0]) and 
initially the columns would be false values that would be changed to true per the user selecting
whether or not an episode has been watched.

In the lead and design meeting, this was our choice of data strucutre because as Ruihan demonstrated
when first giving the idea it was a convienent way to track both seasons and shows at once.

Other potential ways of storage considered were a integer variable that would be counted up and down,
but this would mean another variable for seasons as well. In addition, we could not accurately display how
many episodes were within each season as even more variables would be needed to store episode values for 
each season. 

Our 2D array structure essentially allows us to roll all inidividual components into one easily accessible data structure.
