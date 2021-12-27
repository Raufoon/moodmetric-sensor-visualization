const mysql = require("mysql2/promise")

let db = null

try {
  mysql.createConnection({
    host: 'localhost',
    port: 9000,
    user: 'root',
    password: 'Pass1234',
    database: 'mysql'
  })
    .then(database => db = database)
}
catch (err) {
  throw err;
}

// To execute an SQL query in database
module.exports.queryDB = function (sqlQueryString) {
  return db.execute(sqlQueryString)
}
