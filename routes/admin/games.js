var express = require('express');
var router = express.Router();

// GET /admin/games
router.get('/', async (req, res) => {

    const db = req.app.locals.db;

    const games = await getGames(db);

    res.render('admin/games/index', {
        title: 'Administration',
        games
    });
});

// GET /admin/games/new
router.get('/new', async (req, res) => {

    res.render('admin/games/new', {
        title: 'Administration'
    });
});

// POST /admin/games/new
router.post('/new', async (req, res) => {

    const {
        title,
        description,
        genre,
        releaseYear,
        imageUrl
    } = req.body;

    const game = {
        title,
        description,
        genre,
        releaseYear,
        imageUrl,
        urlSlug: generateURLSlug(title)
    };

    const db = req.app.locals.db;

    await saveGames(game, db);

    // Backend skickas en 302 Found till klient, 
    // tillsammans med en Location-header som 
    // kommer vara satt till värdet nedan, alltså
    // "/admin/games"
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
            image_url,
            genre,
            release_year,
            url_slug,
           
        ) VALUES ($1, $2, $3, $4, $5, $6)
    `;

    await db.query(sql, [
        game.title,
        game.description,
        game.imageUrl,
        game.genre,
        game.releaseYear,
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