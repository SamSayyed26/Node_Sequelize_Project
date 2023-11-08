"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Books.belongsTo(models.Authors, {
        foreignKey: "Author",
        as: "Author_ID",
        onDelete: "CASCADE",
      });
      Books.belongsTo(models.Publishers, {
        foreignKey: "Publisher",
        as: "Publisher_ID",
        onDelete: "CASCADE",
      });
      Books.belongsTo(models.Genres, {
        foreignKey: "Genre",
        as: "Genre_ID",
        onDelete: "CASCADE",
      });
    }
  }
  Books.init(
    {
      Title: DataTypes.STRING,
      Author: DataTypes.UUID,
      Publisher: DataTypes.UUID,
      Genre: DataTypes.UUID,
      Publication_Year: DataTypes.STRING,
      ISBN: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Books",
      tableName: "Books",
      timestamps: false,
    }
  );
  return Books;
};
