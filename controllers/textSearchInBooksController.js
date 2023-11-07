const { Books } = require("../models");
const { Op } = require("sequelize");

const searchBooks = async (req, res) => {
  try {
    const limit = 50;
    const page = req.params.page || 1;
    const offset = (page - 1) * limit;
    const searchText = req.params.searchText;
    console.log("search Text: ", searchText);

    if (!searchText) {
      return res.send({ message: "Search text is required." });
    }

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
  } catch (error) {
    console.error(error);
    res.send({ error: "Failed to fetch books." });
  }
};

module.exports = { searchBooks };
