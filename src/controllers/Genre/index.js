const {
  readGenreLogic,
  addGenreLogic,
  editGenreLogic,
  deleteGenreLogic,
} = require("../../services/Genre");
const { validate: isUUID } = require("uuid");
const pattern = /^ *$/;

const readGenre = async (req, res) => {
  const { page } = req.params;
  await readGenreLogic(page, res);
};

const addGenre = async (req, res) => {
  if (!req.body.Name || pattern.test(req.body.Name)) {
    res.send({ message: "Fields cannot be empty" });
  }

  await addGenreLogic(req.body, res);
};

const editGenre = async (req, res) => {
  if (
    !req.body.id ||
    !isUUID(req.body.id) ||
    !req.body.Name ||
    pattern.test(req.body.Name)
  ) {
    res.send({ message: "Fields cannot be empty" });
  }

  await editGenreLogic(req.body, res);
};

const deleteGenre = async (req, res) => {
  const GenreID = req.query.id;
  if (!GenreID || !isUUID(GenreID)) {
    res.send({ message: "Incorrect UUID" });
  }

  // console.log("Inside the function ");
  await deleteGenreLogic(GenreID, res);
};

module.exports = {
  readGenre,
  addGenre,
  editGenre,
  deleteGenre,
};
