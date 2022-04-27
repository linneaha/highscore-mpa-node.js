var express = require("express");
var router = express.Router();

router.get("/:urlSlug", async function (req, res) {

  const urlSlug = req.params.urlSlug;

  const db = req.app.locals.db;

  const sql = `
  SELECT *
  FROM game
  INNER JOIN game_highscores
  ON game_highscores.game_id = game.id
  INNER JOIN highscores
  ON highscores.id = game_highscores.highscores_id
  WHERE game.url_slug = $1;
  `;

  const result = await db.query(sql, [urlSlug]);

  const game = {
    title: result.rows[0].title,
    genre: result.rows[0].genre,
    description: result.rows[0].description,
    release_year: result.rows[0].release_year,
    image_url: result.rows[0].image_url,
    highscores: result.rows.map(x => ({
      player: x.player,
      date: x.date,
      points: x.points
  }))
  };

  res.render("games/details", {
    title: game.title,
    game
  });
});

module.exports = router;
