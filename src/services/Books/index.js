const { Books, Publishers, Genres, Authors } = require("../../models");
const { Sequelize, Op } = require("sequelize");

async function readBooksLogic(page, res) {
  try {
    const itemsPerPage = 50;

    const offset = (page - 1) * itemsPerPage;

    if (page >= 1) {
      const findBooks = await Books.findAll({
        offset,
        limit: itemsPerPage,
      });

      if (findBooks.length > 0) {
        res.json(findBooks);
      } else {
        res.send({ message: "No books found on this page." });
      }
    } else {
      res.send({ message: "Invalid page number" });
    }
  } catch (err) {
    console.log(err);
  }
}

async function addBookLogic(values, res) {
  const findISBN = await Books.findOne({
    where: {
      ISBN: values.ISBN,
    },
  });
  if (findISBN) {
    res.send({ message: `Book with ${findISBN.ISBN} is already present` });
  } else {
    const bookData = {
      id: Books.id,
      Title: values.Title,
      Author: values.Author,
      Publisher: values.Publisher,
      Genre: values.Genre,
      Publication_Year: values.Publication_Year,
      ISBN: values.ISBN,
    };

    await Books.create(bookData, { returning: [] });
    res.send({ message: "Book Inserted" });
  }
}

async function editBookLogic(values, res) {
  try {
    const findISBN = await Books.findOne({
      where: { ISBN: values.ISBN },
    });
    if (!findISBN) {
      res.send({ message: `Book Not Found` });
    }

    const bookData = {
      id: Books.id,
      Title: values.Title,
      Author: values.Author,
      Publisher: values.Publisher,
      Genre: values.Genre,
      Publication_Year: values.Publication_Year,
      ISBN: values.ISBN,
    };

    await Books.update(bookData, {
      where: { ISBN: values.ISBN },
    });
    res.send({ message: "Book Updated" });
  } catch (err) {
    console.log(err);
  }
}

async function deleteBookLogic(ID, res) {
  try {
    const findBook = await Books.findOne({
      where: { id: ID },
    });
    if (!findBook) {
      res.send({ message: `Book with ID = ${ID} doesnot exist` });
    }
    await findBook.destroy();
    res.send({ message: "Book deleted" });
  } catch (err) {
    console.log(err);
  }
}

async function booksOfAuthorLogic(authorID, res) {
  try {
    const books = await Books.findAll({
      attributes: ["Title"],
      include: [
        {
          model: Authors,
          as: "Author_ID",
          where: {
            id: authorID,
          },
          attributes: ["Name"],
        },
      ],
    });

    if (!books || books.length === 0) {
      res.send({ message: `No Books found for Author ${authorID}` });
    } else {
      res.send({ message: books });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch books by author" });
  }
}

async function booksOfPublisherLogic(publisherID, res) {
  try {
    const books = await Books.findAll({
      attributes: ["Title"],
      include: [
        {
          model: Publishers,
          as: "Publisher_ID",
          where: {
            id: publisherID,
          },
          attributes: ["Name"],
        },
      ],
    });

    if (!books || books.length === 0) {
      res.send({ message: `No Books find for Publisher ${publisherID}` });
    } else {
      res.send({ message: books });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch books by Publisher" });
  }
}

async function booksOfGenreLogic(genreID, res) {
  try {
    const books = await Books.findAll({
      attributes: ["Title"],
      include: [
        {
          model: Genres,
          as: "Genre_ID",
          where: {
            id: genreID,
          },
          attributes: ["Name"],
        },
      ],
    });

    if (!books || books.length === 0) {
      res.send({ message: `No Books find for Genre ${genreID}` });
    }
    res.send({ message: books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch books by Genre" });
  }
}

async function getPublishersLogic(Publisher) {
  try {
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
            id: Publisher,
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
      order: [["Publisher", "ASC"]],
    });
    return publishers;
  } catch (err) {
    console.log(err);
  }
}

async function getAuthorsLogic(Author) {
  try {
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
            id: Author,
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
      order: [["Author", "ASC"]],
    });
    return authors;
  } catch (err) {
    console.log(err);
  }
}

async function getGenresLogic(Genre) {
  try {
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
            id: Genre,
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
      order: [["Genre", "ASC"]],
    });
    return genres;
  } catch (err) {
    console.log(err);
  }
}

async function searchBooksLogic(limit, offset, searchText, res) {
  try {
    const books = await Books.findAll({
      where: {
        [Op.or]: [{ Title: { [Op.iLike]: `%${searchText}%` } }],
      },
      limit: limit,
      offset: offset,
    });

    if (books.length === 0) {
      return res.send({ message: "No Books found matching the search text." });
    }

    res.send(books);
  } catch (err) {
    console.log(err);
  }
}

async function getBooksAfterYearLogic(year, itemsPerPage, offset, res) {
  try {
    const { count, rows } = await Books.findAndCountAll({
      where: {
        Publication_Year: {
          [Op.gte]: year,
        },
      },
      limit: itemsPerPage,
      offset: offset,
    });
    res.send({
      Total_Books: count,
      message: rows,
    });
  } catch (err) {
    console.log(err);
  }
}

async function getBooksBeforeYearLogic(year, itemsPerPage, offset, res) {
  try {
    const books = await Books.findAll({
      where: {
        Publication_Year: {
          [Op.lte]: year,
        },
      },
      limit: itemsPerPage,
      offset: offset,
    });
    if (books) {
      const totalBooks = await Books.count({
        where: {
          Publication_Year: {
            [Op.lte]: year,
          },
        },
      });

      res.send({
        Books_On_This_Page: books.length,
        Total_Books: totalBooks,
        message: books,
      });
    } else {
      res.send({ message: "No books to show on this page" });
    }
  } catch (err) {
    console.log(err);
  }
}

async function publisherAndGenreLogic(publishers) {
  try {
    const results = await Promise.all(
      publishers.map(async (publisherObj) => {
        const { Publisher } = publisherObj;
        const booksCount = await Books.count({
          where: Sequelize.literal(
            '("Books"."Genre" = "Publisher_ID"."Genre_Speciality")'
          ),
          include: [
            {
              model: Publishers,
              as: "Publisher_ID",
              required: true,
              where: {
                id: Publisher,
              },
              attributes: [],
            },
          ],
          raw: true,
        });

        return {
          Publisher: Publisher,
          BookCount: booksCount,
        };
      })
    );

    console.log("Publishers and Book Counts: ", results);
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  readBooksLogic,
  addBookLogic,
  editBookLogic,
  deleteBookLogic,
  booksOfAuthorLogic,
  booksOfPublisherLogic,
  booksOfGenreLogic,
  getPublishersLogic,
  getAuthorsLogic,
  getGenresLogic,
  searchBooksLogic,
  getBooksAfterYearLogic,
  getBooksBeforeYearLogic,
  publisherAndGenreLogic,
};
