/**
 * @namespace User
 * @description este modulo se encarga de gestionar el crud y funcionalidad del modelo de User
 */
/**
 * @namespace requires
 * @param {db} models instacia todos los modelos agregados en la carpeta models
 * @param {pool} pool instacia de la configuracion de la base de datos
 * @param {moment} moment instancia de libreria para gestion de fecha y hora
 * @param {validator} validator instacia de la libreria de validacion de parametros recibidos por request
 */

/**
 * @type {database}
 */
const db = require("../models");

const { pool } = require("../config/db.config");
const moment = require("moment");
const validator = require("validator");

/**
 * @namespace instancias
 */
const User = db.user;
const Status = db.status;
const Op = db.Sequelize.Op;

/**
 * @namespace funcionalidad
 */
//funciones de paginacion
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

/**
 * @function
 */
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: area } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, data, totalPages, currentPage };
};

//guardar un nuevo user
exports.save = (req, res) => {
  //recojer los parametros del post
  let params = req.body;
  let validate_username, validate_lastname, validate_password, validate_status, validate_role, validate_email;

  //validar los datos recibido
  try {
    validate_username = !validator.isEmpty(params.username);
    validate_lastname = !validator.isEmpty(params.lastname);
    validate_password = !validator.isEmpty(params.password);
    validate_status = !validator.isEmpty(params.status);
    validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
  } catch (err) {
    return res.status(400).send({
      message: "Faltan datos por enviar",
    });
  }

  User.count({
    where: { email: params.email },
  }).then((count) => {
    if (count != 0) {
      return res.status(200).send({
        message: "Este email se encuentra registrado use otro email",
      });
    } else {
      //crear el user
      const user = {
        username: params.username,
        lastname: params.lastname,
        email: params.email,
        createdAt: moment().format("YYYY-MM-DD"),
        updatedAt: moment().format("YYYY-MM-DD"),
        fkuserstatus: params.status,
        //fkuserrole: params.role
      };
      User.create(user)
        .then((data) => {
          res.status(200).send({
            message: "",
            data,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Se produjo un error al guardar el user.",
          });
        });
    }
  });
};

