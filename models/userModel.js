'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const mysql = require('mysql2');

const getUser = async (userId) => {
  try {
    const [rows] = await promisePool.execute(
        "SELECT * FROM wop_user WHERE user_id = ?", [userId]);
    console.log("get by result?", rows);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
  }
}

const getAllUsers = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query('SELECT * FROM wop_user');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};




module.exports = {
  getUser,
  getAllUsers
};
