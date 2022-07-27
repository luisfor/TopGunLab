"use strict";
const jwt = require("jwt-simple");
const moment = require("moment");
const secret = "Top-Gun-Labs-2022-token-generador";

let payload;

exports.authenticated = function (req, res, next) {
  //comprobar si llega la autorizacion
  if (!req.headers.authorization) {
    return res.status(403).send({
      message: "La peticion no tiene la cabecera de authorizacion",
    });
  }

  //limpiar el token si viene con comillas
  let token = req.headers.authorization.replace(/['"]+/g, "");

  try {
    //decodificar el token
    payload = jwt.decode(token, secret);
    //comprobar si el token ha expirado
    if (payload.exp <= moment().unix()) {
      return res.status(403).send({
        message: "El token ha expirado",
      });
    }
  } catch (err) {
    return res.status(404).send({
      message: "El token no es valido",
    });
  }

  //Adjuntar el user
  req.user = payload;

  //continuar con el proceso en el controller
  next();
};
