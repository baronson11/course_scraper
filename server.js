// Dependencies -------------------------------------------
const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Web Scraping Tools -------------------------------------
const cheerio = require('cheerio');
const request = require('request');

// PORT & Express -----------------------------------------
const app = express();
const PORT = process.env.PORT || 8080;

// Static content -----------------------------------------
app.use('/static', express.static('public/assets'));

// Parsers/Middleware -------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setting up Mongoose ------------------------------------
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/CourseFinder";

// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Setting up Handlebars ----------------------------------
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Main Router --------------------------------------------
const routes = require("./controller/controller.js");

app.use(routes);

// Listening ----------------------------------------------
app.listen(PORT, () => {
  console.log(`server running on localhost:${PORT}`);
});
