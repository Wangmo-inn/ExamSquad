const express = require('express');
const router = express.Router();

const Admin = require('../models/Admin');
const Questionpaper = require('../models/Questionpaper');

router.get('/all', async (req, res) => {
  try {
    const exams = await Questionpaper.find();
    res.status(200).json(exams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const exam = await Questionpaper.findById(req.params.id);
    if (!exam) {
      return res.status(200).json(null);
    }
    res.status(200).json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/admin/:adminId', async (req, res) => {
  try {
    const exams = await Questionpaper.find({ adminId: req.params.adminId });
    res.status(200).json(exams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/newexam', async (req, res) => {
  try {
    const { adminId, name, duration, noofquestions , questions } = req.body;

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const exam = new Questionpaper({  adminId: adminId , name, duration, noofquestions , questions });

    await exam.save();

    res.status(201).json({ message: 'Exam created successfully', exam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.put('/update/:id', async (req, res) => {
  try {
    const { name, duration, noofquestions, questions } = req.body;

    const exam = await Questionpaper.findByIdAndUpdate(req.params.id, { name, duration, noofquestions, questions }, { new: true });

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    res.status(200).json({ message: 'Exam updated successfully', exam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.delete('/delete/:id', async (req, res) => {
  try {
    const exam = await Questionpaper.findByIdAndDelete(req.params.id);

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    res.status(200).json({ message: 'Exam deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
