'use strict'


const { body, validationResult } = require('express-validator');

const userModel = require("../models/userModel")
const {httpError} = require("../utils/errors");
const {insertUser} = require('../models/userModel');
const { getUser } = require('../models/userModel');
const { users } = require('../models/userModel');


const user_get = async (req, res) => {
  const user = await getUser(req.params.userId);
  res.json({user});
}

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
}

const user_post = async (req, res, next) => {
  const user = [req.body.name, req.body.email, req.body.passwd];
  const add = await insertUser(user);
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    console.error("user_post validation", errors.array());
    const err = httpError("data not valid", 400);
    next(err);
    return;
  }
  res.json(add);
}

module.exports = {
  user_get,
  user_post,
  user_list_get
}