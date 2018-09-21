// Dependencies ------------------------------------
const mongoose = require("mongoose");

// Create a Schema ---------------------------------
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  link: {
    type: String
  },
  topic: {
    type: String
  }
});


const Course = mongoose.model("Course", CourseSchema);

// Export the Course
module.exports = Course;
