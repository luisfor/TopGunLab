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
            message: "User Registrado con exito",
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

//metodo de login
exports.login = (req, res) => {
  //recoger los parametros
  let params = req.body;

  //varialbes de uso general
  let validate_password, validate_email;

  //validar los datos recogidos
  try {
    validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
    validate_password = !validator.isEmpty(params.password);
  } catch (error) {
    return res.status(400).send({
      message: "faltan datos por enviar",
    });
  }

  //validar si todos los datos son true
  if (validate_password && validate_email) {
    User.count({
      where: { validate_email: params.email },
    }).then((count) => {
      if (count != 0) {
        //buscar la contraseña guarda en la bd
        User.findAll({
          where: { email: params.email },
        })
          .then((data) => {
            //comprobar o comparar si la contraseña coincide
            bcrypt.compare(
              params.password,
              data[0].password,
              (err, check) => {
                if (check) {
                  // generar el token para inicio de sesion
                  if (params.gettoken) {
                    //devolver el token
                    res.send({ token: jwt.createToken(data) });
                  } else {
                    //limpiar objeto antes de devolver quitar el campo contraseña para que no se devuelva al usuario
                    data[0].password = undefined;

                    //devolver los datos
                    res.send({ status: "success", user: data });
                  }
                } else {
                  res.status(500).send({
                    message: "el password no coincide",
                  });
                }
              }
            );
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Se Produjo un error mientra buscaba el email del usuario",
            });
          });
      } else {
        return res.status(500).send({
          message: "usuario no registrado",
        });
      }
    });
  } else {
    return res.status(400).send({
      message: "faltan datos por enviar o un dato no es valido",
    });
  }
};

//metodo para actualizar un user solo si esta authenticado
exports.update = (req, res) => {
  let params = req.body;
  const id = req.user.iduser;

  //eliminar propiedades innecesarias si son agregadas sin permisos
  delete params.password;
  delete params.status;

  //datos a guardar
  const user = {
    username: params.username,
    lastname: params.lastname,
    email: params.email,
    updatedAt: moment().format("YYYY-MM-DD"),
  };

  //validar los datos recogidos
  try {
    validate_username = !validator.isEmpty(params.username);
    validate_lastname = !validator.isEmpty(params.lastname);
    validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
  } catch (error) {
    return res.status(400).send({
      message: "faltan datos por enviar",
    });
  }
  //validar si todos los datos son true
  if (
    validate_username &&
    validate_lastname &&
    validate_email
  ) {
    User.update(user, {
      where: { iduser: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "El user fue actualizado con éxito.",
          });
        } else {
          res.send({
            message: `No se puede actualizar El user con id = ${id}. ¡Tal vez no se encontró el user o los datos enviado estan vacío!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: `Error al actualizar el user con el id= ${id}, erro es ${err}`,
        });
      });
  }
};


//listar todos los users
exports.findAll = (req, res) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  User.findAndCountAll({
    limit,
    offset,
    attributes: {
      exclude: ['password']
    },
    include: [
      {
        model: status,
        as: "status",
      },
    ],
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Se Produjo un error mientra buscaba los users",
      });
    });
};