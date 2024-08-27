const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./user.model');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, password: hashedPassword });
    try {
        await user.save();
        res.json({ Message: 'Registration Successful', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await User.get({ name });
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                res.json({ message: 'Login successful' });
            } else {
                res.status(400).json({ message: 'Invalid password' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
