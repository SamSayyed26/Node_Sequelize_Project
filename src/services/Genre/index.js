const { compareSync } = require("bcrypt");
const { Genres } = require("../../models");
const { Op } = require("sequelize");

async function readGenreLogic(page, res) {
  try {
    const itemsPerPage = 50;

    const offset = (page - 1) * itemsPerPage;

    if (page >= 1) {
      const findGenres = await Genres.findAll({
        offset,
        limit: itemsPerPage,
      });

      if (findGenres.length > 0) {
        res.json(findGenres);
      } else {
        res.send({ message: "No Genres found on this page." });
      }
    } else {
      res.send({ message: "Invalid page number" });
    }
  } catch (err) {
    console.log(err);
  }
}

async function addGenreLogic(values, res) {
  try {
    const genreData = {
      id: Genres.id,
      Name: values.Name,
    };

    await Genres.create(genreData, { returning: [] });
    res.send({ message: "Genre Inserted" });
  } catch (err) {
    console.log(err);
  }
}

async function editGenreLogic(values, res) {
  try {
    const findID = await Genres.findOne({
      where: { id: values.id },
    });
    if (!findID) {
      res.send({ message: `Genre Not Found` });
    }

    const genreData = {
      Name: values.Name,
    };

    await Genres.update(genreData, {
      where: { id: values.id },
    });
    res.send({ message: "Genre Updated" });
  } catch (err) {
    console.log(err);
  }
}

async function deleteGenreLogic(ID, res) {
  try {
    const findGenre = await Genres.findOne({
      where: { id: ID },
    });
    if (!findGenre) {
      res.send({ message: `Genre with ID = ${ID} doesnot exist` });
    }
    await findGenre.destroy();
    res.send({ message: "Genre deleted" });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  readGenreLogic,
  addGenreLogic,
  editGenreLogic,
  deleteGenreLogic,
};
