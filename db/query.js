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

module.exports = { joinTables, insertUser };
