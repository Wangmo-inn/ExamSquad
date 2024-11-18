const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  exams: [
    {
      examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true
      },
      score: {
        type: Number,
        default: 0
      }
    }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
