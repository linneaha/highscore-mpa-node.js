var express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {
  const db = req.app.locals.db;

  const sql = `
    SELECT game.title,
           game.url_slug,
           player,
           date,
           points
    FROM score
    INNER JOIN game
    ON game.id = score.game_id
    ORDER BY
    points DESC
  `;

  const result = await db.query(sql);

  let highscores = result.rows;

  highscores.filter((tag, index, array) => array.findIndex(t => t.color == tag.color && t.label == tag.label) == index);

  res.render("index", {
    title: "Highscores",
    highscores,
  });
});

module.exports = router;
