require("dotenv").config();
const { Client } = require("pg");

const SQL = `

    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT NOT NULL,
        status TEXT DEFAULT 'member'
    );


    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO users (username, password) 
    VALUES
        ('dave smith', 'password');

    
    INSERT INTO messages (user_id, title, message) 
    VALUES 
        (
          (SELECT id FROM users WHERE username = 'dave smith'),
          'Hello world!', 'this is dave here checking.'
         );

`;

async function main() {
  console.log("seeding...");

  // local db

  const client = new Client({
    host: process.env.LOCALHOST_ENV,
    user: process.env.USER_ENV,
    database: process.env.DATABASE_ENV,
    password: process.env.PASS_ENV,
    port: process.env.DB_PORT_ENV,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("done");
}

main();
