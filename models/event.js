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
      Event.belongsToMany(models.Register, {through: 'eventsuser', foreignKey: 'UserId', as: 'invitees'})
      Event.belongsTo(models.Register, { targetKey: 'email', foreignKey: 'createdBy' });
    }
  }
  Event.init(
    {
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
