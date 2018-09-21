// Dependencies ---------------------------------------
const express = require("express");
const cheerio = require("cheerio");
const request = require("request");
const mongoose = require("mongoose");

// Require in models ----------------------------------
const Course = require("../models/Course");

// Web Scrapers ---------------------------------------
async function searchByTopic(topic) {
    // Sending the request to the URL to retrieve data
    await request(`https://teamtreehouse.com/library/topic:${topic}`, (err, response, html) => {
      if(!err && response.statusCode == 200) {
        // Parsing the data into html
        const $ = cheerio.load(html);
        // Looping through each element
        $('.card-box').each((i, element) => {
          // Initialize results object
          let results = {};
          // Add key/value pairs to current iteration of object
          results.link = "https://www.teamtreehouse.com" + $(element).attr("href");
          results.title = $(element).children('h3').text();
          results.description = $(element).children('.card-description').text();
          results.topic = `${topic}`;
          // Persist that object into the database
          Course.create(results)
          .then((dbResults) => {
            // View added object in console
            // console.log(dbResults);
          })
          .catch((err) => {
            // Catch any error in console
            console.log(err);
          });
        });
      }
    });
    console.log('scrape complete');
}

async function searchAll() {
    await request('https://teamtreehouse.com/library/type:course', (err, res, html) => {
     if(!err && res.statusCode == 200) {
       const $ = cheerio.load(html);
       $('.card-box').each((i, element) => {
         // Initialize results object
         let results = {};
         // Add key/value pairs to current iteration of object
         results.link = "https://www.teamtreehouse.com" + $(element).attr("href");
         results.title = $(element).children('h3').text();
         results.description = $(element).children('.card-description').text();
         // Persist that object into the database
         Course.create(results)
         .then((dbResults) => {
           // View added object in console
           // console.log(dbResults);
         })
         .catch((err) => {
           // Catch any error and send to client
           console.log(err);
         });
       });
     }
   });
   console.log('scrape complete');
}

// Router ---------------------------------------------
const router = express.Router();

// Routes ---------------------------------------------

// GET "/" - Landing page with search bar
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/search', (req, res) => {
  res.render('search');
});

// GET "/search-results" - Populates all available courses in client
router.get('/search-results', (req, res) => {
  Course.find({})
  .then((dbCourses) => {
    return res.json(dbCourses);
  })
  .catch((err) => {
    return res.json(err);
  });
});

// GET "/search-results/:topic" - Populates all of the courses from db by topic for client
router.get('/search-results/:topic', (req, res) => {
  let { topic } = req.params;
  console.log(topic);
  Course.find({
      topic: topic
    })
  .then((dbResults) => {
    console.log(`from search-results/:${topic} route`);
    return res.json(dbResults);
  })
  .catch((err) => {
    return res.json(err);
  });
});

// GET "/search-all-courses" - Scrapes all available course data into db
// then redirects to search-results route
router.get('/search-all-courses', (req, res) => {
  searchAll()
    .then(res.redirect(`/search-results`))
    .catch(err => console.log(err));
});

// POST "/search-by-topic" - Scrapes data from site by topic
// then redirects to the "search-results/:topic route"
router.post('/search-by-topic', (req, res) => {
  // Grabbing topic from the req.body
  let { topic } = req.body;
  // Calling searchByTopic func and waiting for results
  searchByTopic(topic)
    .then(res.redirect(`/search-results/${topic}`))
    .catch(err => console.log(err));
});

module.exports = router;
