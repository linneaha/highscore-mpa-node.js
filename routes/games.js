var express = require("express");
var router = express.Router();

router.get("/:urlSlug", async function (req, res) {
  const urlSlug = req.params.urlSlug;

  const db = req.app.locals.db;

  const sql = `
    SELECT *
    FROM game
    LEFT JOIN score
    ON score.game_id = game.id
    INNER JOIN genre
    ON genre.id = game.genre_id
    WHERE game.url_slug = $1
    ORDER BY score.date ASC
    FETCH FIRST 10 ROWS ONLY
  `;

  const result = await db.query(sql, [urlSlug]);

  const game = {
    title: result.rows[0].title,
    genre: result.rows[0].name,
    description: result.rows[0].description,
    release_year: result.rows[0].release_year,
    image_url: result.rows[0].image_url,
    highscores: result.rows.map((score) => ({
      player: score.player,
      date: score.date,
      points: score.points
    })),
  };

  res.render("games/details", {
    title: game.title,
    game
  });

});

module.exports = router;
