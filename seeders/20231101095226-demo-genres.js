'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return new Promise(async (resolve, reject) => {
      const fs = require('fs');
      const csv = require('csv-parser');
      const { Genres } = require('../models');

      const csvFilePath = '../../genres.csv';

      let totalRecords = 0;
      let recordsProcessed = 0;

      fs.createReadStream(csvFilePath).pipe(csv())
        .on('data', async (row) => {
          try {
            totalRecords++;
            const genresData = {
              Name: row.name
            };

            await Genres.create(genresData);

            recordsProcessed++;

            if (recordsProcessed === totalRecords) {
              console.log(`Total Records are: ${totalRecords} and inserted in table: ${recordsProcessed}`);
              console.log('CSV parsing completed.');
              console.log('Genres data imported successfully.');
              resolve();
            }
          } catch (error) {
            console.error('Error inserting Genres:', error);
            reject(error);
          }
        });

      fs.createReadStream(csvFilePath).pipe(csv()).on('end', () => {
        resolve();
      });

      fs.createReadStream(csvFilePath).pipe(csv()).on('error', (error) => {
        console.error('Error reading CSV file:', error);
        reject(error);
      });
    });
  },

  down: async (queryInterface, Sequelize) => {
    return new Promise(async (resolve, reject) => {
      const { Genres } = require('../models');

      try {
        await Genres.destroy({ where: {} });

        console.log('Removed all records from the Genres table.');
        resolve();
      } catch (error) {
        console.error('Error deleting Genres records:', error);
        reject(error);
      }
    });
  }
};