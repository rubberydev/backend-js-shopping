/**
 * Auth Local configuration
 */

const express = require('express');
const passport = require('passport');

const { signToken } = require('../auth.service');

const router = express.Router();

router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        const error = err || info;
        if (error) {
            return res.status(401).json(error);
        }
        if (!user) {
            return res.status(404).json({ message: 'Something went wrong, please try again.' });
        }

        const token = signToken(user._id, user.role);
        return res.json({ token });
    })(req, res, next);
});

module.exports = router;