"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return new Promise(async (resolve, reject) => {
      const fs = require("fs");
      const csv = require("csv-parser");
      const { Publishers, Genres } = require("../models");

      const csvFilePath = "../../publishers.csv";

      let totalRecords = 0;
      let recordsProcessed = 0;

      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on("data", async (row) => {
          try {
            totalRecords++;

            const genre = await Genres.findOne({
              where: { Name: row.genre_speciality },
            });

            // console.log("---------------");
            // console.log("Genre Data Returing:", genre);
            // console.log("---------------");

            if (genre) {
              const publishersData = {
                Name: row.name,
                Genre_Speciality: genre.id,
                Founded_Date: row.founded_date,
                City: row.city,
                Country: row.country,
              };

              // console.log("PUBLISHERS DATA CONSOLING ", publishersData);

              await Publishers.create(publishersData, { returning: [] });
            } else {
              console.log(
                `Genre '${row.genre_speciality}' not found in Genre table.`
              );
            }

            recordsProcessed++;

            if (recordsProcessed === totalRecords) {
              console.log(
                `Total Records are: ${totalRecords} and inserted in table: ${recordsProcessed}`
              );
              console.log("CSV parsing completed.");
              console.log("Publishers data imported successfully.");
              resolve();
            }
          } catch (error) {
            console.error("Error inserting Publishers:", error);
            reject(error);
          }
        });

      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on("end", () => {
          resolve();
        });

      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on("error", (error) => {
          console.error("Error reading CSV file:", error);
          reject(error);
        });
    });
  },

  down: async (queryInterface, Sequelize) => {
    return new Promise(async (resolve, reject) => {
      const { Publishers } = require("../models");

      try {
        await Publishers.destroy({ where: {} });

        console.log("Removed all records from the Publishers table.");
        resolve();
      } catch (error) {
        console.error("Error deleting Publishers records:", error);
        reject(error);
      }
    });
  },
};
