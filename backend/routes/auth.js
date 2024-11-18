const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


const User = require('../models/User');
const Admin = require('../models/Admin');


router.post('/register/user', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingStudent = await User.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({ message: 'Email already registered' });
    }
   
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'user registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/register/admin', async (req, res) => {
  try {
    const { adminname, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ adminname, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/login/user', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/login/admin', async (req, res) => {
  try {
    const { email, password } = req.body;


    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;