const express = require("express");
const app = express();
app.use(express.json());
const session = require("express-session");

const port = 3000;

const signup = require("./routes/signupRoute");
const login = require("./routes/loginRoute");
const protectedData = require("./routes/protectedRoute");
const logout = require("./routes/logoutRoute");
const booksCrud = require("./routes/booksCrudRoute");
const count = require("./routes/getCountRoute");
const year = require("./routes/yearRoute");
const publisherAndGenre = require("./routes/publisherAndGenreRoute");
const returnBooks = require("./routes/getBooksRoute");
const textSearch = require("./routes/textSearchRoute");

const secretKey = process.env.JWT_SECRET_KEY;

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", signup);
app.use("/", login);
app.use("/protected", protectedData);
app.use("/", logout);

app.use("/", booksCrud);

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

// app.use("/", publisherAndGenre);

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
