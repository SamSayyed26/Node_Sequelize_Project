("use strict");
const fs = require("fs");
const csv = require("csv-parser");
const { Publishers, Genres, Authors } = require("../models");

async function chunkProcessing(chunckDataArray, queryInterface) {
  // console.log("Whole chunk", chunckDataArray);
  const recordData = [];
  const authorNames = [];
  const publisherNames = [];
  const genreNames = [];

  for (const row of chunckDataArray) {
    if (!authorNames.includes(row.Author)) {
      authorNames.push(row.Author);
    }
    if (!publisherNames.includes(row.Publisher)) {
      publisherNames.push(row.Publisher);
    }
    if (!genreNames.includes(row.Genre)) {
      genreNames.push(row.Genre);
    }
  }

  try {
    const [authorsData, publishersData, genresData] = await Promise.all([
      Authors.findAll({
        where: { Name: authorNames },
        attributes: ["id", "Name"],
      }),

      Publishers.findAll({
        where: { Name: publisherNames },
        attributes: ["id", "Name"],
      }),

      Genres.findAll({
        where: { Name: genreNames },
        attributes: ["id", "Name"],
      }),
    ]);

    // console.log("Authors Data: ", authorsData);
    // console.log("Pubishers Data: ", publishersData);
    // console.log("Genres Data: ", genresData);

    chunckDataArray.forEach((element) => {
      const matchedAuthor = authorsData.find(
        (data) => data.Name === element.Author
      );
      if (matchedAuthor) {
        element.Author = matchedAuthor.id;
      } else {
        console.log("Author not found for:", element.Author);
      }

      const matchedPublisher = publishersData.find(
        (data) => data.Name === element.Publisher
      );
      if (matchedPublisher) {
        element.Publisher = matchedPublisher.id;
      } else {
        console.log("Publisher not found for:", element.Publisher);
      }

      const matchedGenre = genresData.find(
        (data) => data.Name === element.Genre
      );
      if (matchedGenre) {
        element.Genre = matchedGenre.id;
      } else {
        console.log("Genre not found for:", element.Genre);
      }

      const book = {
        Title: element.Title,
        Author: element.Author,
        Publisher: element.Publisher,
        Genre: element.Genre,
        Publication_Year: element.Publication_Year,
        ISBN: element.ISBN,
      };

      recordData.push(book);
    });

    await queryInterface.bulkInsert("Books", recordData);
    recordData.length = 0;
    console.log("One chunk Inserted");
  } catch (err) {
    console.error("Error processing chunk: ", err);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return new Promise(async (resolve, reject) => {
      const csvFileBooks = "../../books.csv";
      const chunckDataArray = [];
      const highWaterMark = 64 * 1024;
      let bytesRead = 0;

      const stream = fs
        .createReadStream(csvFileBooks, { highWaterMark: highWaterMark })
        .pipe(csv())
        .on("data", async (row) => {
          const rowBytes = Buffer.from(JSON.stringify(row)).length;
          bytesRead += rowBytes;
          chunckDataArray.push(row);

          if (bytesRead >= highWaterMark) {
            // console.log("High watermark reached");
            stream.pause();
            await chunkProcessing(chunckDataArray, queryInterface);
            chunckDataArray.length = 0;
            bytesRead = 0;
            stream.resume();
          }
        })
        .on("end", async () => {
          console.log("Insertion Complete");
          resolve();
        })
        .on("error", (error) => {
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
