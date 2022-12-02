## ADR: Updating IDs on deletion of a single local storage element

We have decided to implement a refactor each time a element is deleted from local storage to increment or decrement all the id tags currently in local
storage. This is so the right edit page and expanded Pages are always pulled up successfully since the use the IDs to call from that place in local storage
specifically.

Another available option was leaving the holes and not updating IDs, but this could cause a lot of memory issues for continuous use if the elements are not
properly cleared.
