'use strict'
const userModel = require("../models/userModel")
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

const user_post = async (req, res) => {
  console.log("Add user data", req.body);
  const user = req.body;
  const id = await insertUser(user);
  res.send(id);
}

module.exports = {
  user_get,
  user_post,
  user_list_get
}