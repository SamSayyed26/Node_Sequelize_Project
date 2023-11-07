const { Books } = require("../models");

const protected = (req, res) => {
  res.send({ message: "You have access to this protected route." });
};

const protectedBooks = async (req, res) => {
  const { page } = req.params;
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
};

module.exports = {
  protected,
  protectedBooks,
};
