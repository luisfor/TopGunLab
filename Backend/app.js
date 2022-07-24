const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const helmet = require('helmet')

//Cors
// Config heads and cors
app.use(
  cors({
    origin: 'http://localhost:4000'
  })
);
app.use(helmet());

//middleware
// convert what comes from requests to js
app.use(bodyParser.urlencoded({ extended: false }));
// convert request to json
app.use(bodyParser.json());


// Routes simple
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Images Gallery Apis" });
});

//Routes Apis
require("./routes/user")(app);


module.exports = app;