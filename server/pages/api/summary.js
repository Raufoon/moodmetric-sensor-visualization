import { queryDB } from "../../utils/dbhelper";

export default async function (req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const userId = req.query.userId

  try {
    const minMaxAvgData = await queryDB(`
      SELECT MIN(VALUE) AS MIN_R, MAX(VALUE) AS MAX_R, AVG(VALUE) AS AVG_R
      FROM SKIN_RESISTENCE
      WHERE ID='${userId}'
    `)

    const { MIN_R: minR, MAX_R: maxR, AVG_R: avgR } = minMaxAvgData[0][0]

    const minRTimeData = await queryDB(`
      SELECT TIME_OF_CREATION AS T 
      FROM SKIN_RESISTENCE 
      WHERE ID='${userId}' AND VALUE='${minR}'
    `)

    const { T: minRt } = minRTimeData[0][0]

    const maxRTimeData = await queryDB(`
      SELECT TIME_OF_CREATION AS T 
      FROM SKIN_RESISTENCE 
      WHERE ID='${userId}' AND VALUE='${maxR}'
    `)

    const { T: maxRt } = minRTimeData[0][0]

    res.json({ success: true, data: { minR, maxR, avgR, minRt, maxRt } })
  }
  catch (err) {
    res.json({ success: false, data: err.message })
  }

  res.end()
} 
