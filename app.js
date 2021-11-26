'use strict';
const cors = require('cors')
const express = require('express');
const app = express();

app.use(cors());
require('dotenv').config()
const catRoute = require("./routes/catRoute.js");
const userRoute = require("./routes/userRoute.js");
const passport = require("./utils/pass.js");
const bcrypt = require('bcryptjs');
const authRoute = require("./routes/authRoute.js");
const {httpError} = require("./utils/errors");
const port = 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
    require('./utils/production')(app, port);
} else {
require('./utils/localhost')(app, 8000, 3000);
}


app.use(passport.initialize());

app.use(express.static('uploads'));
app.use('/thumbnails', express.static('thumbnails'));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded

app.use("/cat", passport.authenticate("jwt", {session: false}), catRoute);
app.use("/user", passport.authenticate("jwt", {session: false}), userRoute);
app.use('/auth', authRoute);

app.get('/',async (req, res) => {
    if (req.secure) {
        res.send(await bcrypt.hash('1234', 10));
    } else {
        res.send('not secured?');
    }
});



app.use((req, res, next) => {
    const err = httpError("Not Found", 404);
    next(err);
});

//Error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({message: err.message || "internal error"});
});


//app.listen(port, () => console.log(`Example app listening on port localhost:${port}/cat!`));
