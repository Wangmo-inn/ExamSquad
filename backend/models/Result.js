const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  examId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  examname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
