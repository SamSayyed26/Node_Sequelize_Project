const { Books, Publishers, Authors, Genres } = require("../models");
const Sequelize = require("sequelize");

async function getPublishers(Publisher) {
  const publishers = await Books.findAll({
    attributes: [
      [Sequelize.col("Publisher_ID.id"), "Publisher_ID"],
      "Publisher",
      [Sequelize.fn("COUNT", Sequelize.col("Publisher")), "PublisherCount"],
    ],
    include: [
      {
        model: Publishers,
        as: "Publisher_ID",
        required: true,
        where: {
          Name: Publisher,
        },
        attributes: [],
      },
    ],
    group: ["Publisher_ID.id", "Publisher"],
    having: Sequelize.where(
      Sequelize.fn("COUNT", Sequelize.col("Publisher")),
      ">",
      1
    ),
    order: [["Publisher", "DESC"]],
  });
  return publishers;
}
async function getAuthors(Author) {
  const authors = await Books.findAll({
    attributes: [
      [Sequelize.col("Author_ID.id"), "Author_ID"],
      "Author",
      [Sequelize.fn("COUNT", Sequelize.col("Author")), "AuthorCount"],
    ],
    include: [
      {
        model: Authors,
        as: "Author_ID",
        required: true,
        where: {
          Name: Author,
        },
        attributes: [],
      },
    ],
    group: ["Author_ID.id", "Author"],
    having: Sequelize.where(
      Sequelize.fn("COUNT", Sequelize.col("Author")),
      ">",
      1
    ),
    order: [["Author", "DESC"]],
  });
  return authors;
}
async function getGenres(Genre) {
  const genres = await Books.findAll({
    attributes: [
      [Sequelize.col("Genre_ID.id"), "Genre_ID"],
      "Genre",
      [Sequelize.fn("COUNT", Sequelize.col("Genre")), "GenreCount"],
    ],
    include: [
      {
        model: Genres,
        as: "Genre_ID",
        required: true,
        where: {
          Name: Genre,
        },
        attributes: [],
      },
    ],
    group: ["Genre_ID.id", "Genre"],
    having: Sequelize.where(
      Sequelize.fn("COUNT", Sequelize.col("Genre")),
      ">",
      1
    ),
    order: [["Genre", "DESC"]],
  });
  return genres;
}

const publisherCount = async (req, res) => {
  let publishersToQuery = req.body;

  if (!Array.isArray(publishersToQuery)) {
    publishersToQuery = [publishersToQuery];
  }

  try {
    const results = await Promise.all(
      publishersToQuery.map((element) => getPublishers(element.Publisher))
    );

    const allPublishers = results.flat();

    res.send({ message: allPublishers });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
};

const authorCount = async (req, res) => {
  let authorsToQuery = req.body;

  if (!Array.isArray(authorsToQuery)) {
    authorsToQuery = [authorsToQuery];
  }

  try {
    const results = await Promise.all(
      authorsToQuery.map((element) => getAuthors(element.Author))
    );

    const allAuthors = results.flat();

    res.send({ message: allAuthors });
  } catch (error) {
    res.status(500).json({ error: `An error occurred. ${error}` });
  }
};

const genreCount = async (req, res) => {
  let genresToQuery = req.body;

  if (!Array.isArray(genresToQuery)) {
    genresToQuery = [genresToQuery];
  }

  try {
    const results = await Promise.all(
      genresToQuery.map((element) => getGenres(element.Genre))
    );

    const allGenres = results.flat();

    res.send({ message: allGenres });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
};

module.exports = {
  publisherCount,
  authorCount,
  genreCount,
};
