'use strict'

const { getUser } = require('../models/userModel');
const { users } = require('../models/userModel');


const user_get = (req, res) => {
  const user = getUser(req.params.userId);
  res.json({user});
}

module.exports = {
  user_get,

}