'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Authors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Authors.init({
    Name: DataTypes.STRING,
    Birth_Date: DataTypes.DATE,
    Country: DataTypes.STRING,
    Biography: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Authors',
    timestamps:false
  }
  );
  return Authors;
};