module.exports = (sequelize, Sequelize) => {
  
  const user = sequelize.define('user', {
    iduser: {
      allowNull: false,
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    lastname: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    role: {
      allowNull: false,
      type: Sequelize.STRING(10)
    },
    createdAt: {
      type: Sequelize.DATEONLY
    },
    updatedAt: {
      type: Sequelize.DATEONLY
    },
  }, {
    //evita que sequelize coloque el nombre en plural
    freezeTableName: true,

    //evita crear tabla createdAt y updateAt
    timestamps: false,
    createdAt: false

  });

  //remueve el atributo id que agrega sequelize
  user.removeAttribute('id');

  return user;
};