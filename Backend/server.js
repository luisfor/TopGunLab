const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

//Cors
// Config heads and cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

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


// Port run Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server run port: ${PORT}`);
})