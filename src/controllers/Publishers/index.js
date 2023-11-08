const {
  readPublisherLogic,
  addPublisherLogic,
  editPublisherLogic,
  deletePublisherLogic,
  searchPublishersLogic,
} = require("../../services/Publishers");
const { validate: isUUID } = require("uuid");
const pattern = /^ *$/;

const readPublisher = async (req, res) => {
  const { page } = req.params;
  await readPublisherLogic(page, res);
};

const addPublisher = async (req, res) => {
  if (
    !req.body.Name ||
    !req.body.Genre_Speciality ||
    !req.body.Founded_Date ||
    !req.body.City ||
    !req.body.Country
  ) {
    res.send({ message: "Fields cannot be empty" });
  } else {
    if (
      pattern.test(req.body.Name) ||
      pattern.test(req.body.Genre_Speciality) ||
      pattern.test(req.body.Founded_Date) ||
      pattern.test(req.body.City) ||
      pattern.test(req.body.Country)
    ) {
      return res
        .status(400)
        .json({ message: "Values cannot contain only spaces" });
    }
    await addPublisherLogic(req.body, res);
  }
};

const editPublisher = async (req, res) => {
  if (
    !req.body.id ||
    !isUUID(req.body.id) ||
    !req.body.Name ||
    !req.body.Genre_Speciality ||
    !req.body.Founded_Date ||
    !req.body.City ||
    !req.body.Country
  ) {
    res.send({ message: "Fields cannot be empty" });
  } else {
    if (
      pattern.test(req.body.Name) ||
      pattern.test(req.body.Genre_Speciality) ||
      pattern.test(req.body.Founded_Date) ||
      pattern.test(req.body.City) ||
      pattern.test(req.body.Country)
    ) {
      return res
        .status(400)
        .json({ message: "Values cannot contain only spaces" });
    }
    await editPublisherLogic(req.body, res);
  }
};

const deletePublisher = async (req, res) => {
  const PublisherID = req.query.id;
  if (!PublisherID || !isUUID(PublisherID)) {
    res.send({ message: "Incorrect UUID" });
  }

  // console.log("Inside the function ");
  await deletePublisherLogic(PublisherID, res);
};

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
    await searchPublishersLogic(limit, offset, searchText, res);
  } catch (error) {
    console.error(error);
    res.send({ error: "Failed to fetch Publishers." });
  }
};

module.exports = {
  readPublisher,
  addPublisher,
  editPublisher,
  deletePublisher,
  searchPublishers,
};
