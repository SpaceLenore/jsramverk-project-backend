CREATE TABLE IF NOT EXISTS users (
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL PRIMARY KEY,
    password VARCHAR(64) NOT NULL,
    funds FLOAT DEFAULT 100
);

CREATE TABLE IF NOT EXISTS stonks (
    id INTEGER PRIMARY KEY NOT NULL DEFAULT rowid,
    name VARCHAR(128) NOT NULL,
    description TEXT,
    shares INTEGER
);

CREATE TABLE IF NOT EXISTS wallets (
    owner VARCHAR(255) NOT NULL UNIQUE,
    stonk INTEGER,
    amount INTEGER,
    FOREIGN KEY (owner) REFERENCES users(email),
    FOREIGN KEY (stonk) REFERENCES stonks(id)
);

INSERT INTO stonks (name, description, shares) VALUES
("TechCo", "Tech company that likes to sell your data.", 100),
("dbwebb", "Små dbwebbisar hoppar runt bland löven och investerar", 100),
("EvilCo", "EvilCo sells chemical weapons and other questionable goods but hey, they make a lot of money.", 100);
