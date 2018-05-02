# Bento Coding Challenge

### Instructions:
1. Use one of the following frameworks to build the project: Angular (v1 || v2), React, or Vue
2. Use cat images from http://thecatapi.com/api/images/get?format=xml&results_per_page=25
3. Use cat facts from http://cors-proxy.htmldriven.com/?url=https://catfact.ninja/facts?limit=25
4. Allow users to sort photos alphabetically by the last word in the cat fact
5. Allow users to “favorite” an image (with attached fact) and allow users to view only favorited images
6. Allow users to view one photo and fact at a time

##### Pictures of Application
1. Main Page
![main](https://github.com/benbasuni1/bento-coding-challenge/blob/master/planning/bento-cats.png)

2. Modal When Clicked
![modal](https://github.com/benbasuni1/bento-coding-challenge/blob/master/planning/bento-cats-2.png)

##### Application Layout:
1. Application as a whole  
![App](https://github.com/benbasuni1/bento-coding-challenge/blob/master/planning/app.png)

2. Cat Card Sample  
![Cat Card](https://github.com/benbasuni1/bento-coding-challenge/blob/master/planning/card.png)

3. App Components
![Components](https://github.com/benbasuni1/bento-coding-challenge/blob/master/planning/components.png)

4. API Calls
![APICalls](https://github.com/benbasuni1/bento-coding-challenge/blob/master/planning/API-calls.png)

5. Data Schema
![Data Schema](https://github.com/benbasuni1/bento-coding-challenge/blob/master/planning/data-schema.png)

##### Functionality of Page:
1. Allow users to **view only favorited images**
![viewFavoriteImages](https://github.com/benbasuni1/bento-coding-challenge/blob/master/planning/01-functionality-view-favorited.png)

2. Allow users to **view 1 photo and fact at a time**
![viewOnePhoto](https://github.com/benbasuni1/bento-coding-challenge/blob/master/planning/02-functionality-view1photo.png)

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
        * Create parser function for cat Description  
        * Create parser function for cat Picture  
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
  3. [x] Make navbar stuck on top
  4. [ ] Upload better fonts
  5. [ ] Modal brush-up, consistent size

---
##### Phase 4 (ADVANCED FULL STACK APP):
  1. [ ] Utilize Redux for state management
  2. [ ] Introduce a database (MongoDB)
  3. [ ] Implement Caching (LocalStorage so that we won't have to generate axios calls every refresh)
  4. [ ] Implement a search function
  5. [ ] What happens when data gets too large?
  6. [ ] Deploy onto Docker Container
