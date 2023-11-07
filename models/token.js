"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method a
     * utomatically.
     */
    static associate(models) {}
  }
  Token.init(
    {
      userId: DataTypes.UUID,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Token",
      timestamps: false,
    }
  );
  return Token;
};
