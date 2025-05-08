const pool = require("./pool");

async function joinTables() {
  return await pool.query(
    "SELECT *, messages.id AS message_id FROM messages JOIN users ON users.id = messages.user_id"
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

async function insertAsAdmin(username, email, password, status) {
  await pool.query(
    `INSERT INTO users (username, email, password, status)
      VALUES($1, $2, $3, $4)
    `,
    [username, email, password, status]
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

async function deleteMessage(id) {
  await pool.query(`DELETE FROM messages WHERE id = $1`, [id]);
}

async function getEverything(username) {
  return await pool.query(`SELECT * FROM USERS where username = $1`, [
    username,
  ]);
}

async function getAllUsers() {
  const { rows } = await pool.query("SELECT username FROM users");

  return rows.map((row) => row.username);
}

module.exports = {
  joinTables,
  insertUser,
  insertAsAdmin,
  deleteMessage,
  getEverything,
  insertMessage,
  getAllUsers,
};
