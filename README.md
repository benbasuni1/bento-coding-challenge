# Bento Coding Challenge

### Instructions:
---

##### Resources: 
1. React
2. Cat Images => http://thecatapi.com/api/images/get?format=xml&results_per_page=25
3. Cat Facts  => http://cors-proxy.htmldriven.com/?url=https://catfact.ninja/facts?limit=25

##### Functionality of Page:
1. Allow users to **view only favorited images**
![viewFavoriteImages](https://github.com/benbasuni1/bento-coding-challenge/blob/master/planning/01-functionality-view-favorited.png)

2. Allow users to **view 1 photo and fact at a time**
![viewOnePhoto](https://github.com/benbasuni1/bento-coding-challenge/blob/master/planning/02-functionality-view-1photo.png)

3. Allow users to **sort alphabetically by last word in the cat fact**
![sortAlphabetically](https://github.com/benbasuni1/bento-coding-challenge/blob/master/planning/03-functionality-sortByLastWord.png)

4. Allow users to **favorite an image w/ fact**
![favoriteImage](https://github.com/benbasuni1/bento-coding-challenge/blob/master/planning/04-functionality-favorites.png)

### Thought Process:
---
##### Phase 1 (SETUP):
  1. [x] Connect React-Bootstrap, Center h1 Title 'Bento-Bento Cats'
  2. [x] Create Navbar with title and sort & favorite buttons
  3. [x] Establish data structures and variables needed to pass information throughout application
  4. [x] Get Data properly parsed from API's
        [x] Create parser function for cat Description
        [x] Create parser function for cat Picture
  5. [x] Instantiate 1 cat card
        * Favorite Button
        * Image
        * Description
---
##### Phase 2 (FUNCTIONALITY):
  1. [x] Implement Render Modal functionality
        * Tag along id, description, and image
  2. [x] Populate All cards in Card Component
        * Attach description, id, last, and image
  3. [x] Click on Favorites & toggle to 1 & 0
  4. [x] View Cards that are favorited
  5. [x] Sort based on Last

---
##### Phase 3 (FINAL TOUCH UPS):
  1. [x] Create Overlay for description to pop up when hovering
  2. [x] Create Modal Component and render the correct descriptions, etc.
  3. [ ] Make navbar stuck on top
  4. [ ] Upload better fonts
  5. [ ] Modal brush-up, consistent size
