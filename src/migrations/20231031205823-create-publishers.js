'use strict';
const { DataTypes } = require ('sequelize');
const Genres = require("../models/genre");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Publishers', {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },
      Name: {
        type: Sequelize.STRING
      },
      Genre_Speciality: {
        type: Sequelize.UUID,
        references:{
          model: "Genres",
          key: "id"
        }
      },
      Founded_Date: {
        type: Sequelize.DATE
      },
      City: {
        type: Sequelize.STRING
      },
      Country: {
        type: Sequelize.STRING
      },
    },{
      timestamps:false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Publishers');
  }
};