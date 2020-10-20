"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Register extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Register.belongsToMany(models.Event, { through: 'eventsuser', foreignKey: 'EventId', as: 'Events' })
    }
  }
  Register.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
        unique: {
          args: true,
          msg: "Email address already in use!",
        },
      },
      password: DataTypes.STRING,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Register",
    }
  );
  return Register;
};
