const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models/");

const app = express();

//Cors
// Configurar cabeceras y cors
app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use((req, res, next) => {
  next();
});

//middleware
// convierte lo que llegue de las peticiones a js
app.use(bodyParser.urlencoded({ extended: false }));
// convertir peticion a json
app.use(bodyParser.json());

//sincronizando los modelos en la base de datos
db.conexion.sync();

// simple ruta
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a Gallery Apis" });
});

//rutas
//require("./routes/user")(app);

// puerto del servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor activado en el puerto: ${PORT}.`);
});