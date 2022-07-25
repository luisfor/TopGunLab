module.exports = (sequelize, Sequelize) => {
    const status = sequelize.define('status', {
      idstatus: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      status: {
        type: Sequelize.STRING(100)
      },
      color_button: {
        type: Sequelize.STRING(100)
      },
      createdAt: {
        type: Sequelize.DATEONLY,
      },
      updatedAt: {
        type: Sequelize.DATEONLY,
      },
    }, {
      //evita que sequelize coloque el nombre en plural ejemplo estados ( la letra s al final )
      freezeTableName: true,
  
      //evita crear tabla createdAt y updateAt
      timestamps: false,
      createdAt: false
  
    });
  
    //remueve el atributo id que agrega sequelize
    status.removeAttribute('id');
  
    return status;
  };