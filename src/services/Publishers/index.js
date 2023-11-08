const { Publishers } = require("../../models");
const { Op } = require("sequelize");

async function readPublisherLogic(page, res) {
  try {
    const itemsPerPage = 50;

    const offset = (page - 1) * itemsPerPage;

    if (page >= 1) {
      const findPublishers = await Publishers.findAll({
        offset,
        limit: itemsPerPage,
        attributes: [
          "Name",
          "Genre_Speciality",
          "Founded_Date",
          "City",
          "Country",
        ],
      });

      if (findPublishers.length > 0) {
        res.json(findPublishers);
      } else {
        res.send({ message: "No Publishers found on this page." });
      }
    } else {
      res.send({ message: "Invalid page number" });
    }
  } catch (err) {
    console.log(err);
  }
}

async function addPublisherLogic(values, res) {
  try {
    const publisherData = {
      id: Publishers.id,
      Name: values.Name,
      Genre_Speciality: values.Genre_Speciality,
      Founded_Date: values.Founded_Date,
      City: values.City,
      Country: values.Country,
    };

    await Publishers.create(publisherData, { returning: [] });
    res.send({ message: "Publisher Inserted" });
  } catch (err) {
    console.log(err);
  }
}

async function editPublisherLogic(values, res) {
  try {
    const findID = await Publishers.findOne({
      where: { id: values.id },
      attributes: ["id"],
    });
    if (!findID) {
      res.send({ message: `Publisher Not Found` });
    }

    const publisherData = {
      Name: values.Name,
      Genre_Speciality: values.Genre_Speciality,
      Founded_Date: values.Founded_Date,
      City: values.City,
      Country: values.Country,
    };

    await Publishers.update(publisherData, {
      where: { id: values.id },
    });
    res.send({ message: "Publisher Updated" });
  } catch (err) {
    console.log(err);
  }
}

async function deletePublisherLogic(ID, res) {
  try {
    const findPublisher = await Publishers.findOne({
      where: { id: ID },
      attributes: ["id"],
    });
    if (!findPublisher) {
      res.send({ message: `Publisher with ID = ${ID} doesnot exist` });
    }
    await findPublisher.destroy();
    res.send({ message: "Publisher deleted" });
  } catch (err) {
    console.log(err);
  }
}

async function searchPublishersLogic(limit, offset, searchText, res) {
  try {
    const publishers = await Publishers.findAll({
      where: {
        [Op.or]: [{ Name: { [Op.iLike]: `%${searchText}%` } }],
      },
      limit: limit,
      offset: offset,
      attributes: ["Name", "id"],
    });

    if (publishers.length === 0) {
      return res.send({
        message: "No Publishers found matching the search text.",
      });
    }

    res.send(publishers);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  readPublisherLogic,
  addPublisherLogic,
  editPublisherLogic,
  deletePublisherLogic,
  searchPublishersLogic,
};
