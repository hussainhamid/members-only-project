const pool = require("./pool");

async function joinTables() {
  return await pool.query(
    "SELECT * FROM messages JOIN users ON users.id = messages.user_id"
  );
}

async function insertUser(username, email, password) {
  await pool.query(
    `INSERT INTO users (username, email, password)
      VALUES($1, $2, $3)
    `,
    [username, email, password]
  );
}

async function insertMessage(user_id, title, message) {
  await pool.query(
    `INSERT INTO messages (user_id, title, message) 
      VALUES (
      $1,
      $2,
      $3
      )
    `,
    [user_id, title, message]
  );
}

async function getEverything(username) {
  return await pool.query(`SELECT * FROM USERS where username = $1`, [
    username,
  ]);
}

module.exports = { joinTables, insertUser, getEverything, insertMessage };
