'use strict';


const {validationResult} = require('express-validator');
const insertUser = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const {httpError} = require("../utils/errors");
const bcrypt = require('bcryptjs');


const login = (req, res, next) => {
    // TODO: add passport authenticate
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('local params', err, user, info);
        if (err || !user) {
            next(httpError('username / password incorrect', 400));
            return;
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                next(httpError('login error', 400));
                return;
            }
            const token = jwt.sign(user, 'asdasdasdasfdgsdfgSDRGSDFG');
            return res.json({ user, token });
        });
    })(req, res, next);
};

const user_post = async (req, res, next) => {
    req.body.passwd = bcrypt.hashSync(req.body.passwd, 12);
    const user = [req.body.name, req.body.email, req.body.passwd];
    const add = await insertUser(user);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error("user_post validation", errors.array());
        const err = httpError("data not valid", 400);
        next(err);
        return;
    }
    res.json(add);
}

module.exports = {
    login,
    user_post
};