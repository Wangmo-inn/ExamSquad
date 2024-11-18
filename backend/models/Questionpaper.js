const mongoose = require('mongoose');

const questionpaperSchema = new mongoose.Schema({
    
    adminId: {
        type: String,
        required: true
  },
    name: {
    type: String,
    required: true
  },
    duration: {
    type: Number,
    required: true
  },

  noofquestions: {
    type: Number,
    required: true
  },

  questions: [
    {
      question: {
        type: String,
        required: true
      },
      options: [
        {
          type: String,
          required: true
        }
      ],
      answer: {
        type: Number,
        required: true
      }
    }
  ]
});

const Questionpaper = mongoose.model('Questionpaper', questionpaperSchema);
module.exports = Questionpaper;
