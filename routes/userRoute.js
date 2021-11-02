'use strict'

const express = require('express');
const { user_list_get } = require('../controllers/userController');
const { user_post } = require('../controllers/userController');
const { user_get } = require('../controllers/userController');
const router = express.Router();

router.get('/', user_list_get);

router.get('/:userId', user_get);

router.post('/', user_post);

module.exports = router;


