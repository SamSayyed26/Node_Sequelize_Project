const {
  readBooksLogic,
  addBookLogic,
  editBookLogic,
  deleteBookLogic,
  booksOfAuthorLogic,
  booksOfPublisherLogic,
  booksOfGenreLogic,
  getPublishersLogic,
  getAuthorsLogic,
  getGenresLogic,
  searchBooksLogic,
  getBooksAfterYearLogic,
  getBooksBeforeYearLogic,
  publisherAndGenreLogic,
} = require("../../services/Books");
const { validate: isUUID } = require("uuid");
const pattern = /^ *$/;

const readBooks = async (req, res) => {
  const { page } = req.params;
  await readBooksLogic(page, res);
};

const addBook = async (req, res) => {
  if (
    !req.body.Title ||
    !req.body.Author ||
    !req.body.Publisher ||
    !req.body.Genre ||
    !req.body.Publication_Year ||
    !req.body.ISBN
  ) {
    res.send({ message: "Fields cannot be empty" });
  } else {
    if (
      pattern.test(req.body.Title) ||
      pattern.test(req.body.Author) ||
      pattern.test(req.body.Publisher) ||
      pattern.test(req.body.Genre) ||
      pattern.test(req.body.Publication_Year) ||
      pattern.test(req.body.ISBN)
    ) {
      return res
        .status(400)
        .json({ message: "Values cannot contain only spaces" });
    }
    await addBookLogic(req.body, res);
  }
};

const editBook = async (req, res) => {
  if (
    !req.body.Title ||
    !isUUID(req.body.Author) ||
    !req.body.Author ||
    !isUUID(req.body.Publisher) ||
    !req.body.Publisher ||
    !isUUID(req.body.Genre) ||
    !req.body.Genre ||
    !req.body.Publication_Year ||
    !req.body.ISBN
  ) {
    res.send({ message: "Fields cannot be empty or incorrect UUID syntax" });
  }
  else {
    if (
      pattern.test(req.body.Title) ||
      pattern.test(req.body.Author) ||
      pattern.test(req.body.Publisher) ||
      pattern.test(req.body.Genre) ||
      pattern.test(req.body.Publication_Year) ||
      pattern.test(req.body.ISBN)
    ) {
      return res
        .status(400)
        .json({ message: "Values cannot contain only spaces" });
    }
    await editBookLogic(req.body, res);
  }

};

const deleteBook = async (req, res) => {
  const bookID = req.query.id;
  if (!bookID || !isUUID(bookID)) {
    res.send({ message: "Incorrect UUID" });
  }

  await deleteBookLogic(bookID, res);
};

const booksOfAuthor = async (req, res) => {
  let authorID = req.query.id;

  if (!authorID || !isUUID(authorID)) {
    return res.send({
      error: "Author ID is required",
    });
  }

  await booksOfAuthorLogic(authorID, res);
};

const booksOfPublisher = async (req, res) => {
  let publisherID = req.query.id;

  if (!publisherID || !isUUID(publisherID)) {
    return res.send({
      error: "Publisher name is required",
    });
  }
  await booksOfPublisherLogic(publisherID, res);
};

const booksOfGenre = async (req, res) => {
  let genreID = req.query.id;

  if (!genreID || !isUUID(genreCount)) {
    return res.send({
      error: "Genre name is required",
    });
  }
  await booksOfGenreLogic(genreID, res);
};

const publisherCount = async (req, res) => {
  let publishersToQuery = req.body;

  if (!Array.isArray(publishersToQuery)) {
    publishersToQuery = [publishersToQuery];
  }

  try {
    const results = await Promise.all(
      publishersToQuery.map((element) => getPublishersLogic(element.Publisher))
    );

    const allPublishers = results.flat();

    res.send({ message: allPublishers });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
};

const authorCount = async (req, res) => {
  let authorsToQuery = req.body;

  if (!Array.isArray(authorsToQuery)) {
    authorsToQuery = [authorsToQuery];
  }

  try {
    const results = await Promise.all(
      authorsToQuery.map((element) => getAuthorsLogic(element.Author))
    );

    const allAuthors = results.flat();

    res.send({ message: allAuthors });
  } catch (error) {
    res.status(500).json({ error: `An error occurred. ${error}` });
  }
};

const genreCount = async (req, res) => {
  let genresToQuery = req.body;

  if (!Array.isArray(genresToQuery)) {
    genresToQuery = [genresToQuery];
  }

  try {
    const results = await Promise.all(
      genresToQuery.map((element) => getGenresLogic(element.Genre))
    );

    const allGenres = results.flat();

    res.send({ message: allGenres });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
};

const protected = (req, res) => {
  res.send({ message: "You have access to this protected route." });
};

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
    await searchBooksLogic(limit, offset, searchText, res);
  } catch (error) {
    console.error(error);
    res.send({ error: "Failed to fetch books." });
  }
};

const getBooksAfterYear = async (req, res) => {
  const { year } = req.params;
  const { pageNo } = req.params;

  const itemsPerPage = 50;
  const offset = (pageNo - 1) * itemsPerPage;

  await getBooksAfterYearLogic(year, itemsPerPage, offset, res);
};

const getBooksBeforeYear = async (req, res) => {
  const { year } = req.params;
  const { pageNo } = req.params;

  const itemsPerPage = 50;
  const offset = (pageNo - 1) * itemsPerPage;

  await getBooksBeforeYearLogic(year, itemsPerPage, offset, res);
};

const publisherAndGenre = async (req, res) => {
  let publishers = req.body;

  if (!Array.isArray(publishers)) {
    publishers = [publishers];
  }
  try {
    const results = await publisherAndGenreLogic(publishers);

    res.send({ message: results });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch book count by publishers and genres" });
  }
};

module.exports = {
  readBooks,
  addBook,
  editBook,
  deleteBook,
  booksOfAuthor,
  booksOfPublisher,
  booksOfGenre,
  publisherCount,
  authorCount,
  genreCount,
  protected,
  searchBooks,
  getBooksAfterYear,
  getBooksBeforeYear,
  publisherAndGenre,
};
