'use strict';
const { DataTypes } = require ('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Authors', {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      Name: {
        type: Sequelize.STRING
      },
      Birth_Date: {
        type: Sequelize.DATE
      },
      Country: {
        type: Sequelize.STRING
      },
      Biography: {
        type: Sequelize.STRING
      }
    },{
      timestamps:false
    }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Authors');
  }
};