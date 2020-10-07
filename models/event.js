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
  Event.init(
    {
      event_id: {
        type: DataTypes.UUID,
        defaultValue: Model.UUIDV4, // Or Sequelize.UUIDV1
      },
      eventName: DataTypes.STRING,
      eventDetails: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      invited: DataTypes.ARRAY(DataTypes.STRING),
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
