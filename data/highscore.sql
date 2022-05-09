-- DDL

CREATE DATABASE highscore

CREATE TABLE game (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(500) NOT NULL,
    genre_id INTEGER
    FOREIGN KEY (genre_id)
        REFERENCES genre(id),
    release_year DATE NOT NULL,
    image_url VARCHAR(250) NOT NULL,
    url_slug VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE(url_slug)
) 

CREATE TABLE genre (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE(name)
)

CREATE TABLE score (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    game_id INTEGER 
    FOREIGN KEY (game_id)
        REFERENCES game(id),
    player VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    points INTEGER NOT NULL,
    PRIMARY KEY (id)
) 
