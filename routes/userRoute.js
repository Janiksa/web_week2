'use strict'

const {body, validationResult} = require('express-validator');

const express = require('express');
const {user_list_get} = require('../controllers/userController');
const {user_post} = require('../controllers/userController');
const {user_get} = require('../controllers/userController');
const router = express.Router();
const multer = require('multer');

router.route('/')
    .get(user_list_get)
    .post(
        body("name").isLength({min: 8}),
        body("email").isEmail(),
        body("passwd").matches("(?=.*[A-Z]).{8,}"),
        user_post);

router.route('/:id')
    .get(user_get);
module.exports = router;


