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
    const [rows] = await promisePool.query('SELECT * FROM wop_user');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};


const insertUser = async (user) => {
  try {
    const [rows] = await promisePool.execute('INSERT INTO wop_user (name, email, password) VALUES (?,?,?)',
        user);
    console.log("Model insert user", rows);
    return rows
  } catch (e) {
    console.error("Model insert user", e.message);
  }
};




module.exports = {
  getUser,
  getAllUsers,
  insertUser
};
