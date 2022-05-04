var express = require('express');
var router = express.Router();

router.get('/new', async (req, res) => {

    res.render('admin/score/new', {
        title: 'Administration'
    });
});

router.post('/new', async (req, res) => {

    const {
        game,
        player,
        date,
        points
    } = req.body;

    const score = {
        game,
        player,
        date,
        points
    };

    const db = req.app.locals.db;

    await saveHighscore(score, db);

    res.redirect('/admin/games');
});


async function saveHighscore(score, db) {

    const sql = `
        INSERT INTO score (
            game,
            player,
            date,
            points
        ) VALUES ($1, $2, $3, $4)
    `;

    await db.query(sql, [
        score.game,
        score.player,
        score.date,
        score.points
    ]);

}


module.exports = router;