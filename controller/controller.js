// Dependencies ---------------------------------------
const express = require("express");
const cheerio = require("cheerio");
const request = require("request");

// Require in models ----------------------------------
const db = require("../models/Course.js");

// Router ---------------------------------------------
const router = express.Router();

// Web Scrapers ---------------------------------------
function allCourses() {
  request('https://teamtreehouse.com/library/type:course', (err, res, html) => {
    if(!err && res.statusCode == 200) {
      const $ = cheerio.load(html);

      let results = [];

      $('.card-box').each((i, element) => {

        let link = "https://www.teamtreehouse.com" + $(element).attr("href");
        let title = $(element).children('h3').text();
        let description = $(element).children('.card-description').text();

          results.push({
            title: title,
            description: description,
            link: link
          });

      });

      console.log(results);
    }
  });
}

function searchByTopic(topic) {
  request(`https://teamtreehouse.com/library/topic:${topic}`, (err, res, html) => {
    if(!err && res.statusCode == 200) {
      const $ = cheerio.load(html);

      let results = [];

      $('.card-box').each((i, element) => {

        let link = "https://www.teamtreehouse.com" + $(element).attr("href");
        let title = $(element).children('h3').text();
        let description = $(element).children('.card-description').text();

          results.push({
            title: title,
            description: description,
            link: link
          });

      });

      console.log(results);
    }
  });
};


// Routes ---------------------------------------------
router.get('/', (req, res) => {


  res.render('index');
});

router.get('/search', (req, res) => {


  res.render('search');
});

module.exports = router;
