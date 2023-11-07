'use strict';
const {
  Model, UUID, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publishers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Publishers.init({
    Name: DataTypes.STRING,
    Genre_Speciality: DataTypes.UUID,
    Founded_Date: DataTypes.DATE,
    City: DataTypes.STRING,
    Country: DataTypes.STRING,
    // GenreId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Publishers',
    tableName: 'Publishers',
    timestamps: false,
  });
  return Publishers;
};