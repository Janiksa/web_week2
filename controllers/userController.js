'use strict'
const userModel = require("../models/userModel")
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

const user_post = (req, res) => {
  console.log("Add user data", req.body);
  res.send("From this endpoint you can add users");
}

module.exports = {
  user_get,
  user_post,
  user_list_get
}