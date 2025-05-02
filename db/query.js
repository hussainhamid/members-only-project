const pool = require("./pool");

async function joinTables() {
  const { rows } = await pool.query(
    "SELECT * FROM messages JOIN users ON users.id = messages.user_id"
  );

  return rows;
}

async function insertUser(username, email, password) {
  await pool.query(
    `INSERT INTO users (username, email, password)
      VALUES($1, $2, $3)
    `,
    [username, email, password]
  );
}

async function getEverything(username) {
  return await pool.query(`SELECT * FROM USERS where username = $1`, [
    username,
  ]);
}

module.exports = { joinTables, insertUser, getEverything };
