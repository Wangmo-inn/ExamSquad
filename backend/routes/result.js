const express = require('express');
const router = express.Router();

const Result = require('../models/Result');

router.get('/', async (req, res) => {
  try {
    const results = await Result.find();
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/results/:id', async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/user/:userId', async (req, res) => {
  try {
    const results = await Result.find({ userId: req.params.userId });
    if (!results) {
      return res.status(200).json(null);
    }
    res.status(200).json(results);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/exam/:examId', async (req, res) => {
  try {
    const results = await Result.find({ examId: req.params.examId });
    if (!results) {
      return res.status(200).json(null);
    }
    res.status(200).json(results);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/newresult', async (req, res) => {
  try {
    const {  examId,userId , examname, username , score } = req.body;

    const newResult = new Result({  examId,userId , examname, username , score });
    await newResult.save();

    res.status(201).json({ message: 'Result created successfully', result: newResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update result by ID
router.put('/update/:id', async (req, res) => {
  try {
    const { userId, examId, score, examName, username } = req.body;

    const result = await Result.findByIdAndUpdate(req.params.id, { userId, examId, score, examName, username }, { new: true });
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    res.status(200).json({ message: 'Result updated successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const result = await Result.findByIdAndRemove(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.status(200).json({ message: 'Result deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;