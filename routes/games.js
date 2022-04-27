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
    title: result.rows[0].game_title,
    highscores: result.rows.map(x =>({
      player: x.highscores_player,
      date: x.highscores_date,
      points: x.highscores_points,
    }))
  };

  res.render("games/details", {
    title: game.title,
    game
  });
});

module.exports = router;
