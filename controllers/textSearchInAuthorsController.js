const { Authors } = require("../models");
const { Op } = require("sequelize");

const searchAuthors = async (req, res) => {
  try {
    const limit = 50;
    const page = req.params.page || 1;
    const offset = (page - 1) * limit;
    const searchText = req.params.searchText;
    console.log("search Text: ", searchText);

    if (!searchText) {
      return res.send({ message: "Search text is required." });
    }

    const authors = await Authors.findAll({
      where: {
        [Op.or]: [{ Title: { [Op.iLike]: `%${searchText}%` } }],
      },
      limit: limit,
      offset: offset,
    });

    if (authors.length === 0) {
      return res.send({ message: "No authors found matching the search text." });
    }

    res.send(authors);
  } catch (error) {
    console.error(error);
    res.send({ error: "Failed to fetch authors." });
  }
};

module.exports = { searchAuthors };
