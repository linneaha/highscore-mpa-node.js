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
  `;

  const result = await db.query(sql);

  let scores = result.rows;

  const highscoresObj = {};

  for (const item of scores) {
    const { title, points } = item;
    const currentValue = highscoresObj[title];
    if (!currentValue || currentValue.points < points) {
      highscoresObj[title] = item;
    }
  }

  const highscores = Object.values(highscoresObj);

  res.render("index", {
    title: "Highscores",
    highscores,
  });
});

module.exports = router;
