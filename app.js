'use strict';
const express = require('express');
require('dotenv').config()
const catRoute = require("./routes/catRoute.js");
const userRoute = require("./routes/userRoute.js");
const app = express();
const cors = require('cors')
const port = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use(cors())
app.use("/cat", catRoute);
app.use("/user", userRoute);


app.listen(port, () => console.log(`Example app listening on port localhost:${port}/cat!`));
