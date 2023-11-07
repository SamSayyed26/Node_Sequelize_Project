const { Books, Publishers, Authors, Genres } = require("../models");
const Sequelize = require("sequelize");

const booksOfAuthor = async (req, res) => {
  let authorName = req.query.authorName;

  if (!authorName) {
    return res.send({
      error: "Author name is required",
    });
  }

  const books = await Books.findAll({
    attributes: ["Title"],
    include: [
      {
        model: Authors,
        as: "Author_ID",
        where: {
          Name: authorName,
        },
        attributes: ["Name"],
      },
    ],
  });

  if (!books || books.length === 0) {
    res.send({ message: `No Books find for Author ${authorName}` });
  }
  res.send({ message: books });
};

const BooksOfPublisher = async (req, res) => {
  let publisherName = req.query.publisherName;

  if (!publisherName) {
    return res.send({
      error: "Publisher name is required",
    });
  }

  const books = await Books.findAll({
    attributes: ["Title"],
    include: [
      {
        model: Publishers,
        as: "Publisher_ID",
        where: {
          Name: publisherName,
        },
        attributes: ["Name"],
      },
    ],
  });

  if (!books || books.length === 0) {
    res.send({ message: `No Books find for Publisher ${publisherName}` });
  }
  res.send({ message: books });
};

const booksOfGenre = async (req, res) => {
  let genreName = req.query.genreName;

  if (!genreName) {
    return res.send({
      error: "Genre name is required",
    });
  }

  const books = await Books.findAll({
    attributes: ["Title"],
    include: [
      {
        model: Genres,
        as: "Genre_ID",
        where: {
          Name: genreName,
        },
        attributes: ["Name"],
      },
    ],
  });

  if (!books || books.length === 0) {
    res.send({ message: `No Books find for Genre ${genreName}` });
  }
  res.send({ message: books });
};

module.exports = {
  booksOfAuthor,
  BooksOfPublisher,
  booksOfGenre,
};
