const express = require('express');
const app = express();
const cors = require("cors");



//Cors
// Config heads and cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

// Port run Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server run port: ${PORT}`);
})