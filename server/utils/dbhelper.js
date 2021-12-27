const pgp = require("pg-promise")()

let db = null

const DB_URL = "localhost:9000"
const DB_PASSWORD = "Pass1234"
const DB_USERNAME = "postgres"

try {
  db = pgp(`postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_URL}`)
  db.connect()

  console.log(`Success! Connected to postgres at ${DB_URL}`)
} catch (err) {
  console.error("Failed to connect db!", err)
  process.exit(1)
}

// To execute an SQL query in database
module.exports.queryDB = function (sqlQueryString) {
  return db.any(sqlQueryString)
}
