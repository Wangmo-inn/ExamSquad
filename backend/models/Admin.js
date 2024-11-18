const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  adminname: {
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
      }
    }
  ]
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
