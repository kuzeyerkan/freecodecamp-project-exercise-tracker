const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  UserId: {},
  date: {},
  duration: {
    type: Number,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
