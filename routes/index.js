var express = require("express");
var router = express.Router();

router.get('/', async function (req, res) {
  const db = req.app.locals.db;

  const sql = `
    SELECT game,
          player,
          date,
          points
    FROM highscores
  `;
  const result = await db.query(sql);

  res.render("index", {
    title: "Highscores",
    highscores: result.rows,
  });
});

module.exports = router;
