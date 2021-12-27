export default function (req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const userId = req.query.userId
  const startTimestamp = req.query.startTimestamp
  const endTimestamp = req.query.endTimestamp

  const rQuery = `
    SELECT 
      SKIN_RESISTENCE.VALUE AS R, SKIN_RESISTENCE.TIME_OF_CREATION AS TR,
    FROM 
      SKIN_RESISTENCE FULL OUTER JOIN MOOD ON SKIN_RESISTENCE.TIME_OF_CREATION = MOOD.TIME_OF_CREATION
    WHERE
      SKIN_RESISTENCE.ID = ${userId} or MOOD.ID = ${userId};
  `

  console.log(query)

  res.json({
    success: true,
    data: []
  })

  res.end()
}
