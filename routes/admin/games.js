var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {

    const db = req.app.locals.db;

    const games = await getGames(db);

    res.render('admin/games/index', {
        title: 'Administration',
        games
    });
});

router.get('/new', async (req, res) => {

    res.render('admin/games/new', {
        title: 'Administration'
    });
});

router.post('/new', async (req, res) => {

    const {
        title,
        description,
        imageUrl,
        genre,
        releaseYear,
    } = req.body;

    const game = {
        title,
        description,
        imageUrl,
        genre,
        releaseYear,
        urlSlug: generateURLSlug(title)
    };

    const db = req.app.locals.db;

    await saveGames(game, db);

    res.redirect('/admin/games');
});

const generateURLSlug = (title) =>
    title.replace('-', '')
        .replace(' ', '-')
        .toLowerCase();

async function saveGames(game, db) {

    const sql = `
        INSERT INTO game (
            title,
            description,
            genre,
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
        game.urlSlug
    ]);

}

async function getGames(db) {

    const sql = `
        SELECT id,
               title,
               description,
               genre,
               release_year,
               image_url,
               url_slug
          FROM game
    `;

    const result = await db.query(sql);

    return result.rows;
}

module.exports = router;