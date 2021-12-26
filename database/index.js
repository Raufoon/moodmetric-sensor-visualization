const pgp = require("pg-promise")()
const fs = require("fs")

async function init() {
  let db = null

  const address = "localhost:9000"
  const password = "Pass1234"
  const username = "postgres"
  const dbname = "moodmetric-postgres"

  try {
    db = pgp(`postgres://${username}:${password}@${address}`)
    console.log("Successfully connected to database")
  }
  catch (err) {
    console.error("Failed to connect to database")
    process.abort()
  }

  const allSqlQueries = fs.readFileSync("init.sql", { encoding: "utf-8" })

  await db.connect()
  console.log("Successfully connected to database")

  await db.any(allSqlQueries)
  console.log("Successfully created all tables")
}

init()
