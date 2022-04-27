var express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {
  
  const searchTerm = req.query.q

  const db = req.app.locals.db;

  const sql = `
    SELECT title,
            genre,
            release_year,
            image_url,
            url_slug
    FROM game
    WHERE title ILIKE '%' || $1 || '%'
    `;
  const result = await db.query(sql, [searchTerm]);

  res.render("search", {
    title: "Sökresultat",
    games: result.rows,
  });
});

module.exports = router;
