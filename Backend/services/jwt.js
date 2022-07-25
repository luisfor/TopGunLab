'use strict'

let jwt = require('jwt-simple');
let moment = require('moment');

exports.createToken = function(user) {
  let payload = {
      iduser: user[0].iduser,
      username: user[0].username,
      lastname: user[0].lastname,
      iat: moment().unix(),
      exp: moment().add(30, 'days').unix()
  };

  //console.log(payload);

  return jwt.encode(payload, 'Team-International-2022');
};