CREATE TABLE IF NOT EXISTS users (
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL PRIMARY KEY,
    password VARCHAR(64) NOT NULL,
    funds FLOAT DEFAULT 100,
    techco INT DEFAULT 0,
    dbwebb INT DEFAULT 0,
    evilco INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS stonks (
    id INTEGER PRIMARY KEY NOT NULL DEFAULT rowid,
    name VARCHAR(128) NOT NULL,
    description TEXT,
    shares INTEGER
);

INSERT INTO stonks (name, description, shares) VALUES
("techco", "Tech company that likes to sell your data.", 100),
("dbwebb", "Små dbwebbisar hoppar runt bland löven och investerar", 100),
("evilco", "EvilCo sells chemical weapons and other questionable goods but hey, they make a lot of money.", 100);
