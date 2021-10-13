## Note

All applications are in their final forms based on their respective last exercises.

For the list of exercises, kindly refer to https://fullstackopen.com/en/part2.

## A brief description of each application and some personal notes:

### countrydata (2.12 - 2.14)

* Topics: State and Effect Hooks, Promises and `Promises.prototype.then()`, Using API services, Forms, Array methods
* Libraries: `axios` (https://github.com/axios/axios)
* API services: [Country data](https://restcountries.com/); [Weather data](https://weatherstack.com/) (API key needed)
* Goal: Using the REST APIs, create a data query tool that searches through a database of country data (249 countries). The selected country's weather data must then be displayed in the application.
* This was a culmination of all recent exercises since one had to combine HTML requests, promises, API usage, React Hooks, and logic statements, in order to display the 'search results' properly.
* One important thing I've learned that can be applied to **application security** is the usage of environment variables in order to omit sensitive information from the source code. The API key used in this exercise is my own. It also only has limited uses. And so, it is crucial not to hardcode this information for anyone (who can open up a console) to see within the source code. 
* Another important thing is an understanding of the JavaScript event loop. When the runtime server runs code that deals with Web APIs (such as the ones we used), it pushes these tasks to happen after everything else in the current stack queue has been run. This leads to a deeper view on when exactly our application updates. The event loop also allows the application to work, even when there is latency between accessing the API services and receiving HTML responses from these APIs.
* Lastly, this exercise really forced me to understand that when dealing with logic forks (such as when using `if` statements), arranging the `if` statements depending on their conditions is important. This is further reinforced by the power of refactoring components in React. Combining these two can make the logic and flow of your application both bug-free and easy to follow.

***

### courseinfo (2.1 - 2.5)

* Topics: OOP, Array methods, Module syntax and separation
* Goal: Improving upon part 1's courseinfo exercises, we transform our list into something similar to JSON objects (an array of object literals). We then display the data recursively, meaning the code must still work even if we add extra elements (with the same format) to the array.
* In this exercise, I instinctively thought to use `for` loops to access information from the arrays and the arrays within the object literals within the array list. But then I discovered array methods. 
* With the use of `.map()` and `.reduce()`, the task of iterating upon arrays can be done in little code. The challenging thing about learning these is the fact that I was new to callback functions. But the logic eventually stuck to me after trying out these methods. 
* Finally, separating modules has taught me to write cleaner looking code and really drives the philosophy of React from the course's day 1 in that the framework aims to have you write as much reusable and accessible code as possible. 

*** 

### phonebook (2.6 - 2.11, 2.15 - 2.20)

* Topics: REST APIs, Backend Server, Promises and Errors, HTML Requests, CSS and Styles
* Libraries: `axios`; `json-server` (https://github.com/typicode/json-server)
* Goal: Create an application that allows a user to store a list of people and their respective phone numbers. This data will be saved in a separate local backend server. The user must also be able to add, delete, and update the numbers as they please. You must include a search function and an error handling function for when a user might delete a non-existing person or add a person that is already in the phonebook. 
* This exercise expanded my views on applications given that I did not know beforehand that you can configure your own REST API servers similar to the API services that I used in **countrydata**. The experience is a bit dumbed down due to using a dedicated REST API library `json-server`. But learning the communication between the frontend and the backend was nonetheless helpful.
* Again, the fact that we can refactor components and separate them into modules lends to the code's readibility. It makes sense when an application becomes complicated enough that someone who is reading the code for the first time should not have too trouble with going through the code. Comments and documentation is vital.
