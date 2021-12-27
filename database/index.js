const mysql = require('mysql2')

async function init() {
  console.log("Connecting to mysql database at localhost:9000")
  await new Promise((resolve) => setTimeout(resolve, 10000))

  let db = null

  try {
    db = mysql.createConnection({
      host: 'localhost',
      port: 9000,
      user: 'root',
      password: 'Pass1234',
      database: 'mysql'
    });

  }
  catch (err) {
    throw err;
  }

  db.connect(
    function onConnect(err) {
      if (err)
        throw err;

      console.log("Successfully connected to database")

      const allSqlQueries = [
        `CREATE TABLE SKIN_RESISTENCE(
          ID VARCHAR(20),
          TIME_OF_CREATION TIMESTAMP UNIQUE,
          VALUE INT,
          PRIMARY KEY (ID, TIME_OF_CREATION)
        );`,

        `CREATE TABLE MOOD(
          ID VARCHAR(20),
          TIME_OF_CREATION TIMESTAMP UNIQUE,
          VALUE VARCHAR(10),
          PRIMARY KEY (ID, TIME_OF_CREATION)
        );`
      ]

      let finished = 0

      allSqlQueries.forEach(statement => {
        db.query(statement, function onFinish(err) {
          if (err)
            throw err

          console.log(`Executed: ${statement}`)

          finished++
          if (finished == allSqlQueries.length) {
            console.log("The database is ready to use")
            process.exit()
          }
        })
      })
    }
  )
}

init()
