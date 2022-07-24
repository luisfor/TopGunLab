const express = require('express');
const app = express();

const port = 4000;

app.get('/', (req, res) => {
    res.send(`Hola mundo top gun labs`);
})

app.listen(port, () => {
    console.log(`Servidor On port ${port}`);
})