# Create and use database if it not exists
CREATE DATABASE IF NOT EXISTS songdb DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
USE songdb;

# Set names to utf-8
SET NAMES utf8;

# Create the authors table
CREATE TABLE songdb.authors
(
    id INT(11) PRIMARY KEY NOT NULL,
    name VARCHAR(63) NOT NULL,
    country VARCHAR(3) NOT NULL
) DEFAULT CHARSET=utf8;

# Create the songs table
CREATE TABLE songdb.songs
(
    id INT(11) PRIMARY KEY NOT NULL,
    author_id INT(11) NOT NULL,
    title VARCHAR(127) NOT NULL,
    youtube_id VARCHAR(24) NOT NULL,
    release_date DATE NOT NULL,
    length INT(11) NOT NULL,
    CONSTRAINT songs_fk0 FOREIGN KEY (author_id) REFERENCES songdb.authors (id)
) DEFAULT CHARSET=utf8;
CREATE INDEX songs_fk0 ON songdb.songs (author_id);

# Create ratings table
CREATE TABLE songdb.ratings
(
  id INT(11) PRIMARY KEY NOT NULL,
  song_id INT(11) NOT NULL,
  rating INT(11) NOT NULL,
  CONSTRAINT ratings_fk0 FOREIGN KEY (song_id) REFERENCES songdb.songs(id)
) DEFAULT CHARSET=utf8;
CREATE INDEX ratings_fk0 ON songdb.ratings(song_id);


# Insert Authors
INSERT INTO songdb.authors (id, name, country) VALUES (1, 'Neşet Ertaş', 'TUR');
INSERT INTO songdb.authors (id, name, country) VALUES (2, 'Cem Karaca', 'TUR');
INSERT INTO songdb.authors (id, name, country) VALUES (3, 'Nujabes', 'JPN');
INSERT INTO songdb.authors (id, name, country) VALUES (4, 'DJ Krush', 'JPN');
INSERT INTO songdb.authors (id, name, country) VALUES (5, 'The Seatbelts', 'JPN');
INSERT INTO songdb.authors (id, name, country) VALUES (6, 'Ella Fitzgerald', 'USA');

# Insert Songs
INSERT INTO songdb.songs (id, author_id, title, youtube_id, length, release_date) VALUES (1, 3, 'Feather', 'jfFTT3iz740', 175, '2005-11-11');
INSERT INTO songdb.songs (id, author_id, title, youtube_id, length, release_date) VALUES (2, 3, 'Aruarian Dance', 'TYRDgd3Tb44', 245, '2004-06-23');
INSERT INTO songdb.songs (id, author_id, title, youtube_id, length, release_date) VALUES (3, 4, 'Keeping The Motion', 'fV2jE7fGYUY', 397, '1994-06-12');
INSERT INTO songdb.songs (id, author_id, title, youtube_id, length, release_date) VALUES (4, 4, 'Mu Getsu', 'qaYy-ldpIXc', 380, '1996-08-08');
INSERT INTO songdb.songs (id, author_id, title, youtube_id, length, release_date) VALUES (5, 5, 'Spokey Dokey', 'fcSuJi1b0OU', 346, '1998-03-21');
INSERT INTO songdb.songs (id, author_id, title, youtube_id, length, release_date) VALUES (6, 5, 'Waltz for Zizi', 'Qbip5oZVL94', 211, '1998-03-21');
INSERT INTO songdb.songs (id, author_id, title, youtube_id, length, release_date) VALUES (7, 2, 'Dadaloğlu', 'IGIH3DHfqp4', 282, '1970-11-01');
INSERT INTO songdb.songs (id, author_id, title, youtube_id, length, release_date) VALUES (8, 2, 'Terketmedi Sevdan Beni', 'Uxezxfa0G0Y', 272, '1977-01-01');
INSERT INTO songdb.songs (id, author_id, title, youtube_id, length, release_date) VALUES (9, 1, 'Bir Ayrılık Bir Yoksuzluk Bir Ölüm', 'YXtBlJB2Udk', 353, '1997-01-01');
INSERT INTO songdb.songs (id, author_id, title, youtube_id, length, release_date) VALUES (10, 6, 'Dream a Little Dream of Me', 'XRpLb4PXVyQ', 192, '1993-03-30');
INSERT INTO songdb.songs (id, author_id, title, youtube_id, length, release_date) VALUES (11, 6, 'My Funny Valentine', 'KqjKOalcI10', 231, '1953-01-01');
INSERT INTO songdb.songs (id, author_id, title, youtube_id, length, release_date) VALUES (12, 4, 'Candle Chant', 'So0pr5J8QYw', 386, '2001-08-07');
