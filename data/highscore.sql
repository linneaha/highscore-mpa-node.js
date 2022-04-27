-- DDL

CREATE DATABASE highscore

CREATE TABLE game (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(500) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    release_year SMALLINT NOT NULL,
    image_url VARCHAR(250) NOT NULL,
    url_slug VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE(url_slug)
) 

CREATE TABLE highscores (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    game VARCHAR(50) NOT NULL,
    player VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    points INTEGER NOT NULL,
    PRIMARY KEY (id)
) 

CREATE TABLE game_highscores (
    game_id INTEGER,
    highscores_id INTEGER,
    PRIMARY KEY (game_id, highscores_id),
    FOREIGN KEY (game_id)
        REFERENCES game(id)
        ON DELETE CASCADE,
    FOREIGN KEY (highscores_id)
        REFERENCES highscores(id)
        ON DELETE CASCADE    
)


-- DML

INSERT INTO game (
    title,
	description,
	genre,
    release_year,
    image_url,
    url_slug
) VALUES (
    'Tetris',
    'Lorem ipsum',
	'Puzzle',
    1980,
    'https://img.etimg.com/thumb/msid-64905441,width-640,resizemode-4,imgsize-194840/tetris-1984.jpg',
    'tetris'
)

INSERT INTO highscores (
    game,
	player,
	date,
    points
) VALUES (
    'Tetris',
    'Superman',
	'2022-01-01',
    199999999
)

INSERT INTO game_highscores (game_id, highscores_id)
VALUES (1,1)

SELECT *
FROM game
INNER JOIN game_highscores
ON game_highscores.game_id = game.id
INNER JOIN highscores
ON highscores.id = game_highscores.highscores_id
WHERE game.url_slug = 'tetris';

