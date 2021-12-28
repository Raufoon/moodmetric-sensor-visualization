import { queryDB } from "../../utils/dbhelper";

export default async function (req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const userId = req.query.userId
  const startTimestamp = req.query.startTimestamp

  const statement = `
    (
      SELECT 
        UNIX_TIMESTAMP(SKIN_RESISTENCE.TIME_OF_CREATION) as T, SKIN_RESISTENCE.VALUE as R, MOOD.VALUE as MK 
      FROM 
        SKIN_RESISTENCE LEFT JOIN MOOD ON SKIN_RESISTENCE.TIME_OF_CREATION = MOOD.TIME_OF_CREATION AND SKIN_RESISTENCE.ID = MOOD.ID
      WHERE
        SKIN_RESISTENCE.ID = '${userId}' AND SKIN_RESISTENCE.TIME_OF_CREATION <= FROM_UNIXTIME(${startTimestamp})
      LIMIT 100
    )

    UNION ALL

    (
      SELECT 
        UNIX_TIMESTAMP(MOOD.TIME_OF_CREATION) as T, SKIN_RESISTENCE.VALUE as R, MOOD.VALUE as MK 
      FROM 
        SKIN_RESISTENCE RIGHT JOIN MOOD ON SKIN_RESISTENCE.TIME_OF_CREATION = MOOD.TIME_OF_CREATION AND SKIN_RESISTENCE.ID = MOOD.ID
      WHERE
        MOOD.ID = '${userId}' AND MOOD.TIME_OF_CREATION <= FROM_UNIXTIME(${startTimestamp})
      LIMIT 100
    );
  `

  console.log(statement)

  try {
    const data = await queryDB(statement)
    res.json({ success: true, data: data[0] })
  }
  catch (err) {
    res.json({ success: false, data: err.message })
  }

  res.end()
}
