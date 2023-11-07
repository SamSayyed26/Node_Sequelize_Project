const { Books } = require("../models");
const { Sequelize, Op } = require("sequelize");

const getBooksAfterYear = async (req, res) => {
  const { year } = req.params;
  const { pageNo } = req.params;

  const itemsPerPage = 50;
  const offset = (pageNo - 1) * itemsPerPage;

  const books = await Books.findAll({
    where: {
      Publication_Year: {
        [Op.gte]: year,
      },
    },
    limit: itemsPerPage,
    offset: offset,
  });
  if (books) {
    const totalBooks = await Books.count({
      where: {
        Publication_Year: {
          [Op.gte]: year,
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
};

const getBooksBeforeYear = async (req, res) => {
  const { year } = req.params;
  const { pageNo } = req.params;

  const itemsPerPage = 50;
  const offset = (pageNo - 1) * itemsPerPage;

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
};

module.exports = {
  getBooksAfterYear,
  getBooksBeforeYear,
};
