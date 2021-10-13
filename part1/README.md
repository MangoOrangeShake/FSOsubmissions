## Note

All applications are in their final forms based on their respective last exercises.

For the list of exercises, kindly refer to https://fullstackopen.com/en/part1

## A brief description of each application and some personal notes: 

### anecdotes (1.12 - 1.14)

* Topics: React, State Hooks, Buttons, and Event Handlers
* The application must display two separate anecdotes. The first is a random anecdote taken from an array of strings. And the second is the 'Most Voted Anecdote'.
* User input comes from two buttons. One is a button that changes the displayed random anecdote. The other is an "upvoter" that increases the votes of the random anecdote on display. 
* If the previous 'Most Voted Anecdote' has been surpassed by another anecdote in terms of number of votes, then the latter will be the new 'Most Voted Anecdote'.
* This exercise is reminiscent of Reddit forums and Youtube comment sections, since there are features in these sites that highlight the comments with the most 'Likes' or 'Upvotes'.

***

### courseinfo (1.1 - 1.5)

* Topics: Object-Oriented Programming (OOP), React, Refactoring Components, Props, JSX
* This task requires one to display all the information of an object literal in a given format.
* Since this is the first proper exercise of the course, JavaScript fundamentals were tackled when creating this application. 
* These fundamentals involved object literals, where you could have objects within arrays within an object literal. Knowing how to access object properties and using arrays were key in displaying all of the given data.
* Refactoring components and passing props showed me how to compartmentalize an application and set it up so that each of its features are easily reusable. 

***

### unicafe (1.6 - 1.11)

* Topics: More JSX (diving deeper into HTML elements), State Hooks, Buttons, and Event Handlers
* This application is a simulation of getting user feedback. This is most common on e-commerce shops and any website that provides a service. Normally, the feedback data will not be displayed very explicitly in the frontend. However, this exercise simply shows the capability of React Hooks and a dynamic updating frontend.
* With 3 buttons labeled 'good', 'neutral', and 'bad', the application uses a counter that tracks the number of presses for each button. Scores are attributed to each button press (1 for 'good', 0 for 'neutral', and -1 for 'bad'). The statistics are then displayed via an HTML `<table>` element
* My grasp of JavaScript was getting better as I tried using more of its functionality. I started using spread syntax for object literals and arrays, as well as some basic methods for configuring how numbers are displayed (number of decimal points, etc.)
