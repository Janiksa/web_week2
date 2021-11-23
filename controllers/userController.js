'use strict'

const {httpError} = require("../utils/errors");
const {insertUser} = require('../models/userModel');
const {getUser} = require('../models/userModel');
const {users} = require('../models/userModel');
const pool = require('../database/db');
const {getAllUsers} = require("../models/userModel");
const promisePool = pool.promise();
const {body, validationResult} = require('express-validator');



const user_get = async (req, res) => {
    const user = await getUser(req.params.userId);
    res.json({user});
}

const user_list_get = async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
}

const user_post = async (req, res, next) => {
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

const update_user = async (req, res, next) => {

    const valResult = validationResult(req);
    if (!valResult.isEmpty()) {
        console.log('error updating user');
        const error = httpError('invalid data', 400);
        next(error);
        return;
    }
    res.json(await update_user(req.body, req.user, req.params.id));
}

const delete_user = async (req, res, next) => {
    const valResult = validationResult(req);
    if (!valResult.isEmpty()) {
        console.log('error deleting user');
        const error = httpError('invalid data', 400);
        next(error);
        return;
    }
    await delete_user(req.body, req.user, req.params.id);
}

const checkToken = (req, res, next) => {
    if (!req.user) {
        next(new Error('token not valid'));
    } else {
        res.json({ user: req.user });
    }
};




module.exports = {
    user_get,
    user_post,
    user_list_get,
    delete_user,
    update_user,
    checkToken
}