const { Books, Publishers, Genres, Authors } = require("../models");

const addBook = async (req, res) => {
  if (!req.body.Title || !req.body.Author || !req.body.Publisher || !req.body.Genre || !req.body.Publication_Year || !req.body.ISBN) {
    res.send({ message: "Fields cannot be empty" });
  } else {
    const findISBN = await Books.findOne({
      where: { ISBN: req.body.ISBN },
    });
    if (findISBN) {
      res.send({ message: `Book with ${findISBN.ISBN} is already present` });
    } else {
      const findAuthor = await Authors.findOne({
        where: { Name: req.body.Author },
        attributes: ["id"],
      });
      if (findAuthor) {
        req.body.Author = findAuthor.id;
      }
      const findPublisher = await Publishers.findOne({
        where: { Name: req.body.Publisher },
        attributes: ["id"],
      });
      if (findPublisher) {
        req.body.Publisher = findPublisher.id;
      }
      const findGenre = await Genres.findOne({
        where: { Name: req.body.Genre },
        attributes: ["id"],
      });
      if (findGenre) {
        req.body.Genre = findGenre.id;
      }

      const bookData = {
        id: Books.id,
        Title: req.body.Title,
        Author: req.body.Author,
        Publisher: req.body.Publisher,
        Genre: req.body.Genre,
        Publication_Year: req.body.Publication_Year,
        ISBN: req.body.ISBN,
      };

      await Books.create(bookData, { returning: [] });
      res.send({ message: "Book Inserted" });
    }
  }
};

module.exports = {
  addBook,
};
