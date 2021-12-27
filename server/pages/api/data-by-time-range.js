import { queryDB } from "../../utils/dbhelper";

export default async function (req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const userId = req.query.userId
  const startTimestamp = req.query.startTimestamp
  const endTimestamp = req.query.endTimestamp

  const statement = `
    SELECT 
      SKIN_RESISTENCE.ID as ID, SKIN_RESISTENCE.TIME_OF_CREATION as T, SKIN_RESISTENCE.VALUE as R, MOOD.VALUE as MK 
    FROM 
      SKIN_RESISTENCE LEFT JOIN MOOD 
        ON 
          SKIN_RESISTENCE.TIME_OF_CREATION = MOOD.TIME_OF_CREATION
          AND SKIN_RESISTENCE.ID = MOOD.ID
    WHERE
      SKIN_RESISTENCE.ID = '${userId}' 
      AND SKIN_RESISTENCE.TIME_OF_CREATION >= FROM_UNIXTIME(${startTimestamp}) 
      AND SKIN_RESISTENCE.TIME_OF_CREATION <= FROM_UNIXTIME(${endTimestamp});
  `
  try {
    const data = await queryDB(statement)
    res.json({
      success: true,
      data
    })
  }
  catch (err) {
    res.json({
      success: false,
      data: err.message
    })
  }

  res.end()
}
