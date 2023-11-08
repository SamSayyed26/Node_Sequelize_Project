const {
  readAuthorsLogic,
  addAuthorLogic,
  editAuthorLogic,
  deleteAuthorLogic,
  searchAuthorsLogic,
} = require("../../services/Authors");
const { validate: isUUID } = require("uuid");
const pattern = /^ *$/;

const readAuthors = async (req, res) => {
  const { page } = req.params;
  await readAuthorsLogic(page, res);
};

const addAuthor = async (req, res) => {
  if (
    !req.body.Name ||
    !req.body.Birth_Date ||
    !req.body.Country ||
    !req.body.Biography
  ) {
    res.send({ message: "Fields cannot be empty" });
  } else {
    if (
      pattern.test(req.body.Name) ||
      pattern.test(req.body.Birth_Date) ||
      pattern.test(req.body.Country) ||
      pattern.test(req.body.Biography)
    ) {
      return res
        .status(400)
        .json({ message: "Values cannot contain only spaces" });
    }
    await addAuthorLogic(req.body, res);
  }
};

const editAuthor = async (req, res) => {
  if (
    !req.body.id ||
    !isUUID(req.body.id) ||
    !req.body.Name ||
    !req.body.Birth_Date ||
    !req.body.Country ||
    !req.body.Biography
  ) {
    res.send({ message: "Fields cannot be empty" });
  } else {
    if (
      pattern.test(req.body.Name) ||
      pattern.test(req.body.Birth_Date) ||
      pattern.test(req.body.Country) ||
      pattern.test(req.body.Biography)
    ) {
      return res
        .status(400)
        .json({ message: "Values cannot contain only spaces" });
    }
    await editAuthorLogic(req.body, res);
  }
};

const deleteAuthor = async (req, res) => {
  const AuthorID = req.query.id;
  if (!AuthorID || !isUUID(AuthorID)) {
    res.send({ message: "Incorrect UUID" });
  }

  console.log("Inside the function ");
  await deleteAuthorLogic(AuthorID, res);
};

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
    await searchAuthorsLogic(limit, offset, searchText, res);
  } catch (error) {
    console.error(error);
    res.send({ error: "Failed to fetch authors." });
  }
};

module.exports = {
  readAuthors,
  addAuthor,
  editAuthor,
  deleteAuthor,
  searchAuthors,
};
