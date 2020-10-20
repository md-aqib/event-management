'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class eventsuser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      eventsuser.belongsTo(models.Register, {foreignKey: 'UserId'})
      eventsuser.belongsTo(models.Event, {foreignKey: 'EventId'})
    }
  };
  eventsuser.init({
    UserId: DataTypes.INTEGER,
    WorkingDayId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'eventsuser',
  });
  return eventsuser;
};