const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = Router();

router.post('/register', [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password must be longer than 5 characters').isLength({ min: 5})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(406).json({ message: 'Email must be a valid and password must be a greater than 5 characters'});
        }

        const { email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Password mismatch' })
        }

        const candidate = await User.findOne({ email });

        if (candidate) {
            return res.status(400).json({ message: 'Such user already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });

        await user.save();

        res.status(201).json({ message: 'User was created' });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error due registration' });
    }
});


router.post('/login', [
        check('email', 'Type a correct email').isEmail(),
        check('password', 'Type a password').exists()
    ],
    async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(406).json({ message: 'Incorrect data during login' });
        }

        const { email, password, keepLogged } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User is not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        let token;
        if (keepLogged) {
            token = jwt.sign(
                { userId: user.id },
                'secret',
                { expiresIn: '720h' }
            );
        } else {
            token = jwt.sign(
                { userId: user.id },
                'secret',
                { expiresIn: '1h' }
            );
        }

        res.json({ token, userId: user.id });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error due login' });
    }
});

module.exports = router;