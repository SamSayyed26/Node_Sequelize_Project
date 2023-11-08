const express = require("express");
const app = express();
app.use(express.json());

const port = 3000;

const signup = require("./src/routes/signupRoute");
const login = require("./src/routes/loginRoute");
const protected = require("./src/routes/protectedRoute");
const logout = require("./src/routes/logoutRoute");
const count = require("./src/routes/getCountRoute");
const year = require("./src/routes/yearRoute");
const publisherAndGenre = require("./src/routes/publisherAndGenreRoute");
const returnBooks = require("./src/routes/getBooksRoute");
const textSearch = require("./src/routes/textSearchRoute");

const booksCrud = require("./src/routes/booksCrudRoute");
const authorsCrud = require("./src/routes/authorsCrudRoute");
const publishersCrud = require("./src/routes/publishersCrudRoute");
const genresCrud = require("./src/routes/genresCrudRoute");

app.use("/", signup);
app.use("/", login);
app.use("/protected", protected);
app.use("/", logout);

app.use("/", booksCrud);
app.use("/", authorsCrud);
app.use("/", publishersCrud);
app.use("/", genresCrud);

/*
 * Return the number of books of n publishers in sorted order
 * Return the number of books of n Authors in sorted order
 * Return the number of books of n Genres in sorted order
 */

app.use("/count", count);

/**
 * Return books published after xyz year
 * Return books published before xyz year
 * Return the number books of the n publishers that have published in their own genre_speciality
 */

app.use("/", year);

/**
 * Return the number books of the n publishers that have published in their own genre_speciality
 */

app.use("/", publisherAndGenre);

/**
 * Return the books of an author
 * Return the books of a publisher
 * Return the books of a genre
 */
app.use("/", returnBooks);

/**
 * Return the authors that match a specific text
 * Return the books that match a specific text
 * Return the publishers that match a specific text
 */
app.use("/", textSearch);

app.listen(port, () => {
  console.log("server is successfully running!");
});
