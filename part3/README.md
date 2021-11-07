## Note

All applications are in their final forms based on their respective last exercises.

For the list of exercises, kindly refer to https://fullstackopen.com/en/part3.

## Some notes and descriptions

### phonebook backend & database (3.1 - 3.22)

* This chapter could be separated into two parts: configuring the **backend**, then linking this backend into a **database** (MongoDB is used for this course).
* Topics (Backend): NodeJS, Express, REST APIs, HTTP Requests, Middleware, Deployment and Heroku
* Topics (Database): MongoDB (Mongo Atlas), Mongoose library, Schemas, Error Handling
* Goal: As stated in the first bullet point, we create a dedicated backend with our own HTTP route handlers for the phonebook frontend that we built in part 2. We then utilize a NoSQL database called MongoDB to store the data in our application.
* For the backend, it's as if we are recreating some of the functionality of the *json-server* npm package that we relied on in part 2. This puts into perspective what really goes into designing a backend.
* The most challenging part of these exercises is the communication that goes on within the frontend and the backend, and within the backend and the database. We are simply passing JSON objects/elements typed in by the user, into the route handlers of the backend, then into a BSON object/element (which is compatible with the MongoDB database).
* Lastly, we also learn about application deployment. This then implies that we have been working on a production build, which needs to be finalized into a functional application that can be deployed to the internet. I learned that it is another intricate process not to be overlooked. There is also the nuance of adding a frontend production build to the backend so that the Heroku application can display the UI of the app.

## The link to the deployed Heroku App for the phonebook is:

radiant-plateau-76557.herokuapp.com/
