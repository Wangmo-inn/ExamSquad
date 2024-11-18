const express = require('express');
const router = express.Router();

const Admin = require('../models/Admin');

router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/newadmin', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const admin = new Admin({ username, email, password });

    await admin.save();

    res.status(201).json({ message: 'Admin created successfully', admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update an existing admin
router.put('/update/:id', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const admin = await Admin.findByIdAndUpdate(req.params.id, { username, email, password }, { new: true });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin updated successfully', admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete an admin
router.delete('/delete/:id', async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
