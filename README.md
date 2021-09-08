## OVERVIEW

  This is a web application developed using the MERN stack. The site uses the [Movie API](https://github.com/thesneath/movie_api) I built to access a database of movies. It gets information on the film, director, and genre. Users are able to create an account, add movies to their list of favorites, and update or delete their profile. 

## APPROACH

  Using Node.js and Express, I built a REST API that interacts with a database. The database, created using MongoDB can be accessed using common HTTP requests and JWT authorization. AlexMDB is an app built using React and Redux that uses this API to access and visualize information stored in the created database. 

## CHALLENGES

  Learning to use React to build this app was far and above the most difficult task I have completed in my programming journey. Prior to this project, having only experienced vanilla JavaScript and Node.js, React required an overhaul in the way I think about coding and web development as a whole. I spent many an hour poring over documentation, watching video lessons and messaging back and forth with my CareerFoundry Tutor. Fortunately, I was able to learn enough to be dangerous and built an app I am proud of (and will continue to tinker with and improve for ages). 

## DEPENDENCIES

```
"dependencies": {
    "axios": "^0.21.1",
    "moment": "^2.29.1",
    "prop-types": "^15.7.2",
    "react": "^17.0.2",
    "react-bootstrap": "^1.6.0",
    "react-dom": "^17.0.2",
    "react-redux": "^7.2.4",
    "react-router-dom": "^5.2.0",
    "redux": "^4.1.0",
    "redux-devtools-extension": "^2.13.9"
  },
  "devDependencies": {
    "@parcel/transformer-sass": "^2.0.0-beta.2",
    "gh-pages": "^3.2.3",
    "parcel-bundler": "^1.12.5",
    "sass": "^1.39.0"
  }
  ```

---

##  PROJECT INFO

[See the app in action.](https://thesneath-myflix.netlify.app/)

To run this app yourself, install all dependencies with `npm install`. With `npm run build`, a build of the app will run at http://localhost:1234.  

This is a student project from the [CareerFoundry](careerfoundry.com) Full Stack Web Development Immersion Course.


Developed by:

  Alex Sneath - https://github.com/thesneath