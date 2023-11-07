const { Publishers } = require("../models");
const { Op } = require("sequelize");

const searchPublishers = async (req, res) => {
  try {
    const limit = 50;
    const page = req.params.page || 1;
    const offset = (page - 1) * limit;
    const searchText = req.params.searchText;
    console.log("search Text: ", searchText);

    if (!searchText) {
      return res.send({ message: "Search text is required." });
    }

    const publishers = await Publishers.findAll({
      where: {
        [Op.or]: [{ Title: { [Op.iLike]: `%${searchText}%` } }],
      },
      limit: limit,
      offset: offset,
    });

    if (publishers.length === 0) {
      return res.send({
        message: "No Publishers found matching the search text.",
      });
    }

    res.send(publishers);
  } catch (error) {
    console.error(error);
    res.send({ error: "Failed to fetch Publishers." });
  }
};

module.exports = { searchPublishers };
