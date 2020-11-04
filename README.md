## NoMore 2020 Vue / JS developer code test

## Solution

### Assumptions

- The app will grow to include history of read items
- The app will eventually make use of an external api to fetch random links
- Users would like to remove/cancel a generated site

### Noted Problems
- Unrepresentative variable names
- Badly linted code/styled code
- Non modularization
- Alarming as opposed to encouraging UI on primary actions
- Uncaught edges
- Method repetition

### Solution
- Componetized code
- Use event listeners to communicate with parent
- Rename methods and variables to representative names
- Add delete feature, history feature, style updates

### More time?
- Persist data in firebase/ session local storage
- Implement vue router for completed items
- Use external API like newsapi to fetch data
- Host the app
- A chrome extension to save links to the reader

### Introduction
The test centers around a small simple Vue application. The app is very simple and in many ways poorly written (we wrote it in 60 min with this aim in mind). 
Think of this as a PR from a junior intern who just started using Vue :) 
Now your job is to show the intern how it should have been done by improving the code - both in terms of code quality and experience for the user.

### About the app
The application is a very simple tool - a form of mixture between a "news generator" and a "to-do list" app. The functionality is very limited:
- The app has to database or persistence layer (no backend)
- It allows the user to randomly generate a news source for the user to read (and adding it to a "to read" list)
- It gives the ability to go to the given site via the "to read list"
- The ability to mark a news source as "read" from the "to read list"

### How the app is written
The app is written in plain Vue.js 2.0+ and Tailwind (CDN) and can be "run" by simply running: 

`npm run serve`

Please ntoe: The code is not well written and have a lot of improvement potential. Furthermore, the code is not implementing TypeScript or vue-decorators.

## Your task
### What you need to do:
- rewrite the application with the same basic functionality
- use TypeScript
- use Vue-decorators instead of basic JS approach https://www.npmjs.com/package/vue-property-decorator
- apply "clean code" principles as you would on a proper project (google "uncle bob - clean code" in case you want our take on what we mean by clean code - e.g. https://www.youtube.com/watch?v=7EmboKQH8lM)
- improve the existing functionality in order to handle common egde cases 
- improve the different methods as you see fit
- make further adjustments assuming the code had to go into production and that this is part of a larger vue application that might re-use some of this code elsewhere
- make selective improvements to the design and UX
- if you have time: add extra functionality that you think improve the UX

### How to proceed with the test
- fork the code into your own Github repository
- commit changes similar to how you would do on normal team
- write a README.md file that presents your solutions including potential assumptions, documentation. The README must also include a list of "what you would do if you had more time"
- once "ready to share" provide access to the repository to klaus1993@live.com and write a short email to klaus.andrade@nomorehours.com
