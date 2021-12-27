const mysql = require("mysql2/promise")

let db = null

function initDB() {
  return mysql.createConnection({
    host: 'localhost',
    port: 9000,
    user: 'root',
    password: 'Pass1234',
    database: 'mysql'
  })
}


// To execute an SQL query in database
module.exports.queryDB = async function (sqlQueryString) {
  if (db === null)
    db = await initDB()

  return db.query(sqlQueryString)
}
