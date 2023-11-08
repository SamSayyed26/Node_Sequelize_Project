const { Authors } = require("../../models");
const { Op } = require("sequelize");

async function readAuthorsLogic(page, res) {
  try {
    const itemsPerPage = 50;

    const offset = (page - 1) * itemsPerPage;

    if (page >= 1) {
      const findAuthors = await Authors.findAll({
        offset,
        limit: itemsPerPage,
      });

      if (findAuthors.length > 0) {
        res.json(findAuthors);
      } else {
        res.send({ message: "No Authors found on this page." });
      }
    } else {
      res.send({ message: "Invalid page number" });
    }
  } catch (err) {
    console.log(err);
  }
}

async function addAuthorLogic(values, res) {
  try {
    const authorData = {
      id: Authors.id,
      Name: values.Name,
      Birth_Date: values.Birth_Date,
      Country: values.Country,
      Biography: values.Biography,
    };

    await Authors.create(authorData, { returning: [] });
    res.send({ message: "Author Inserted" });
  } catch (err) {
    console.log(err);
  }
}

async function editAuthorLogic(values, res) {
  try {
    const findID = await Authors.findOne({
      where: { id: values.id },
    });
    if (!findID) {
      res.send({ message: `Author Not Found` });
    }

    const authorData = {
      Name: values.Name,
      Birth_Date: values.Birth_Date,
      Country: values.Country,
      Biography: values.Biography,
    };

    await Authors.update(authorData, {
      where: { id: values.id },
    });
    res.send({ message: "Author Updated" });
  } catch (err) {
    console.log(err);
  }
}

async function deleteAuthorLogic(ID, res) {
  try {
    const findAuthor = await Authors.findOne({
      where: { id: ID },
    });
    if (!findAuthor) {
      res.send({ message: `Author with ID = ${ID} doesnot exist` });
    }
    await findAuthor.destroy();
    res.send({ message: "Author deleted" });
  } catch (err) {
    console.log(err);
  }
}

async function searchAuthorsLogic(limit, offset, searchText, res) {
  try {
    const authors = await Authors.findAll({
      where: {
        [Op.or]: [{ Name: { [Op.iLike]: `%${searchText}%` } }],
      },
      limit: limit,
      offset: offset,
    });

    if (authors.length === 0) {
      return res.send({
        message: "No authors found matching the search text.",
      });
    }

    res.send(authors);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  readAuthorsLogic,
  addAuthorLogic,
  editAuthorLogic,
  deleteAuthorLogic,
  searchAuthorsLogic,
};
