"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Tokens",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.literal("gen_random_uuid()"),
          allowNull: false,
          primaryKey: true,
        },
        userId: {
          type: Sequelize.UUID,
          references: {
            model: "Users",
            key: "id",
          },
        },
        token: {
          type: Sequelize.STRING,
        },
      },
      {
        timestamps: false,
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tokens");
  },
};
