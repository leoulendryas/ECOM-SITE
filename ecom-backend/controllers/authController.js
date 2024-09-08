const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const { generateToken } = require('../utils/tokenUtil');

const User = db.User;

exports.register = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password, phone_number } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const user = await User.create({ first_name, last_name, email, password, phone_number });

        const token = generateToken(user.id);
        res.status(201).json({ token, user: { id: user.id, email: user.email } });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user || !(await user.validatePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user.id);
        res.status(200).json({ token, user: { id: user.id, email: user.email } });
    } catch (err) {
        next(err);
    }
};
