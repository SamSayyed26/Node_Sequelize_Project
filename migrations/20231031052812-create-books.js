"use strict";
const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Books",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.literal("gen_random_uuid()"),
          primaryKey: true,
        },
        Title: {
          type: Sequelize.STRING,
        },
        Author: {
          type: Sequelize.UUID,
          references: {
            model: "Authors",
            key: "id",
          },
        },
        Publisher: {
          type: Sequelize.UUID,
          references: {
            model: "Publishers",
            key: "id",
          },
        },
        Genre: {
          type: Sequelize.UUID,
          references: {
            model: "Genres",
            key: "id",
          },
        },
        Publication_Year: {
          type: Sequelize.STRING,
        },
        ISBN: {
          type: Sequelize.STRING,
        },
      },
      {
        timestamps: false,
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Books");
  },
};
