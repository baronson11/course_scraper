// Dependencies ------------------------------------
const mongoose = require("mongoose");

// Create a Schema ---------------------------------
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});


const Course = mongoose.model("Course", CourseSchema);

// Export the Course
module.exports = Course;
