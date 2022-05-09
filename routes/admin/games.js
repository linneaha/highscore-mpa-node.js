var express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {
  const db = req.app.locals.db;

  const games = await getGames(db);

  res.render("admin/games/index", {
    title: "Administration",
    games,
  });
});

router.get("/new", async (req, res) => {
  const db = req.app.locals.db;

  const genres = await getGenres(db);

  res.render("admin/games/new", {
    title: "Administration",
    genres,
  });
});

router.post("/new", async (req, res) => {
  const { title, description, imageUrl, genre, releaseYear } = req.body;

  const game = {
    title,
    description,
    imageUrl,
    genre,
    releaseYear,
    urlSlug: generateURLSlug(title),
  };

  const db = req.app.locals.db;

  await addGames(game, db);

  res.redirect("/admin/games");
});

const generateURLSlug = (title) =>
  title.replace("-", "").replace(" ", "-").toLowerCase();

async function addGames(game, db) {
  const sql = `
        INSERT INTO game (
            title,
            description,
            genre_id,
            release_year,
            image_url,
            url_slug
        ) VALUES ($1, $2, $3, $4, $5, $6)
    `;

  await db.query(sql, [
    game.title,
    game.description,
    game.genre,
    game.releaseYear,
    game.imageUrl,
    game.urlSlug,
  ]);
}

async function getGenres(db) {
  const sql = `
    SELECT id,
           name
    FROM genre
    `;
  const result = await db.query(sql);

  return result.rows;
}

async function getGames(db) {
  const sql = `
    SELECT genre.name as genre_name,
           game.id as game_id,
           game.title as game_title,
           game.release_year as game_release_year
    FROM genre
    INNER JOIN game
    ON game.genre_id = genre.id
    ORDER BY game.id ASC
    `;

  const result = await db.query(sql);

  return result.rows;
}

module.exports = router;
