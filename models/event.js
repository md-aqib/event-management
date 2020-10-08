"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.associate = function (models) {
    Event.hasMany(models.Register);
  };
  Event.init(
    {
      // event_id: {
      //   type: DataTypes.INTEGER,
      //   primaryKey: true,
      //   autoIncrement: true,
      // },
      eventName: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Event already created!",
        },
      },
      eventDetails: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      invited: DataTypes.ARRAY({
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: {
          args: true,
          msg: "Email address already invited!",
        },
      }),
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
