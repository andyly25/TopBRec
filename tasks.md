# Tasks:

## Features a lot missing...
- add event listeners! 
- create image links lead to new view for just a page
- ~~make logo bring back to home page~~
- make a return to top button
- have a return to previous page button?
- ~~loading image?~~
- styles
- Might have to edit to have specific titles
  - isbn is down
  - maybe grab all info from google api
  - tastedive only for recommendations
  - should stay make lead to separate page for more info
- Explain what the page is when someone lands on it

## Bugs:
- If we enter in a book, for example: goose girl
  - it gives mixed results
  - wrong google book api search result
  - correct, but doesn't match with Tastedive
    - maybe use wiki api instead?...
    - check out here https://www.mediawiki.org/wiki/API:Main_page
- If Search term not found, display error
- ~~fix so each book has their own image~~
- ~~**fix book search images so that they are in the right order**~~
- seems like google api if multiple words are separated by %20 by default gives
  - entirely different results, changed to have + in between
- if thumbnail does not exist, replace with temporary image

## useful
- ... useful to know
- using promise.all?
- Object.assign


main have flex and wrap
entry uses vw 
play around with it later