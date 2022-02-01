# Quizzical

https://quizzical-game.herokuapp.com

<h2>Quizzical is a full-stack web app</h2>
<h3>Quizzical is an online game built on the API provided by Open Trivia DataBase</h3>

![alt text](src/Media/app_preview.png)

<h2>Motivation</h2>
I started to develop Quizzical as the solo final project of the React course provided by Scrimba https://scrimba.com/ and taught by Bob Ziroll. 
The only requirements were 1. to use React to create a frontend app that 2. fetched the questions/answers from the Open Trivia DataBase https://opentdb.com/api_config.phpabout. However, I saw good rooms to improve the app and decided 1. to allow users to choose different categories of questions, 2. to serve the app with the backend. Using a server was a must to allow players to monitor their scores and incentivize them to improve their scores playing more games.

<h2>Technologies</h2>
<h3>Frontend</h3>
For the frontend, the application relies mostly on CSS3 and JSX due to the use of the REACT framework. This application has been the first one that I developped using React. 
On top of CSS3, I relied on Tachyons https://tachyons.io libraries for the SignIn and Register form; also on Sass to create tooltips and animate them.

<h3>Backend</h3>
https://github.com/SteRap/Quizzical-backend/

For the backend, I use NODE.js powered with EXPRESS.js. In addiction, I relied on few npm extensions: 1. BodyParser https://www.npmjs.com/package/body-parser as the middleware to enable the communication and data exchange between the frontend and the backend; 2. KNEX.js https://knexjs.org to powered Node.js and create better queries; 3. BCRYPT https://www.npmjs.com/package/bcrypt to encrypt users'passwords and guarentee security; 4. CORS https://www.npmjs.com/package/cors the package for providing the Express middleware that can be used to enable CORS with various options.
To test the server's requests I relied on Postman https://www.postman.com.

<h3>Database</h3> 
To mantain the data for users'profile and for their games and scores, I use the relational database PostegreSQL. To work better with it I relied on the database tool DBeaver https://dbeaver.io. On the matter, I structured the database by creating two tables: 1. Login 2. Users. They communicate between them through the common value (EMAIL).

<h3>Hosting</h3>
Frontend, Backend and Database are all of them hosted by HEROKU https://www.heroku.com/home

<h2>Challenges</h2>
FRONTEND: Being my first solo project using React, the main challenges have been about 1. the architecture of the app; 2. dealing with States and components that could affect parents' and siblings' States (NB I didn't use Redux); 3. tailoring the API response to have clean data (e.g. have the answers that could be displayed randomly --> right answers NOT always on the 4th position); 4. rendering components at my needs (--> learning React.useEffecthas been a must). 
BACKEND: On the backend side, the main difficulties have been 1. creating working queries 2. allow the DB tables to relate between them; 3. use req.body to transfer users'inputs to the backend. 
DATABASE: Luckly it was easier than expected, but still it requires some efforts to move myself around with a new language and the use of the software DBeaver.

<h2>Learnings</h2>

Developing and working on this project has been extremely fun. The knowledge and skills learnt and developed are such tremendous that will be difficult to report all of them here. Still, at the end of the project I feel much more confortable developping React app with functional components, dealing with React States, using React Hooks, performing API fetches and creating a backend to serve a frontend app.

<h2>Credits</h2>

Extremely felt gratitude is due to Bob Ziroll https://github.com/bobziroll that taught me lot of skills to work with React; and to Andrei Neagoie who taught me, through a 37-long-hours course https://www.udemy.com/course/the-complete-web-developer-zero-to-mastery/learn/lecture/19845426#overview, countless knowledge including the ones to create the backend and Database of Quizzical.

<h2>Contributions</h2>

If you are interested to contribute to this project, a couple of ideas are: 1. <strike> create frontend validations for Register and Sign In forms (so far validation is only on the server side) </strike> <strong>Done! &#10003</strong>; 2. Add feature to allow users to change the difficult level for the questions (so far, I used a template literals on the API url to change the questions' category); 3. Make the navbar collapsable for mobile devices so that the feature to change questions' category is more visible. Thank you.
